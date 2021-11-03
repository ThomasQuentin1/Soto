import {Button, Divider, Step, StepLabel, Stepper, Typography} from "@material-ui/core";
import React, {useState} from "react";
import {sha256} from "js-sha256";
import Step1 from "./stepper/Step1";
import Step2 from "./stepper/Step2";
import {notifyError, notifySuccess} from "../../public/notifications/notificationsFunctions";
import Cookies from "js-cookie"
import {useCriterionsQuery, useRegisterMutation} from "../../typing";
import Router from "next/router";
import Step3 from "./stepper/Step3";
import {TFunction} from "i18next";

interface Props {
    setDisplayRegister: (b: boolean) => void;
    t: TFunction
}

function getSteps(t: TFunction) {
    return [
        t("label.login.step1.title"),
        t("label.login.step2.title"),
        t("label.login.step3.title")
    ];
}

const Register = (props: Props) => {
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps(props.t);

    const {data: criteriaData} = useCriterionsQuery();

    const [register] = useRegisterMutation({variables: {email: email, password: sha256(password)}, errorPolicy: 'all'})

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <Step1 setEmail={setEmail} setPassword={setPassword} t={props.t} setCPassword={setCPassword}
                              emailError={emailError} passwordError={passwordError}/>;
            case 1:
                return <Step2 criteria={criteriaData.criterions}/>;
            case 2:
                return <Step3/>
            default:
                return 'Unknown step';
        }
    }

    function checkEmail() {
        return new Promise<boolean>((resolve) => {
            const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            resolve(regexp.test(email))
        })
    }

    function checkRegisterValues() {
        return new Promise<boolean>((resolve) => {
            checkEmail().then(isEmailValid => {
                if (isEmailValid) {
                    setEmailError("")
                } else {
                    setEmailError(props.t("label.helperText.emailInvalid"))
                    resolve(false)
                }
                if (password === cPassword) {
                    setPasswordError("")
                } else {
                    setPasswordError(props.t("label.helperText.passwordsDifferent"))
                    resolve(false)
                }
                resolve(true)
            })
        })
    }

    const handleNext = () => {
        if (activeStep === 0) {
            checkRegisterValues().then(r => {
                if (r) {
                    register().then(r => {
                        if (r.errors) {
                            notifyError(props.t(r.errors[0].message))
                        } else {
                            Cookies.set("token", r.data.register, {expires: 7})
                            setActiveStep(activeStep + 1);
                            setEmailError("")
                            notifySuccess(props.t("notification.label.registered"))
                        }
                    });
                }
            })
            // setActiveStep(activeStep + 1);
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleFinish = () => {
        if (password !== cPassword)
            return;
        Router.push("/shop").then(() => {
        })
    }

    return (
        <div style={{width: "auto", margin: "20px"}}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
            >
                <Typography variant="h6" gutterBottom
                            style={{marginBottom: "20px", color: "grey", display: "flex", justifyContent: "center"}}>
                    {props.t("label.login.signUp")}
                </Typography>
                <Stepper activeStep={activeStep} color="secondary">
                    {steps.map((label) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: { optional?: React.ReactNode } = {};
                        return (
                            <Step key={label} {...stepProps} color="secondary">
                                <StepLabel {...labelProps} color="secondary">{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
            {getStepContent(activeStep)}
            <div style={{display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px"}}>
                <Button disabled={activeStep === 0} color="secondary" onClick={() => handleBack()}>
                    {props.t("label.general.back")}
                </Button>
                {activeStep === steps.length - 1 ?
                    <div>
                        <Button variant="contained" color="secondary" onClick={() => handleFinish()}>
                            {props.t("label.general.finish")}
                        </Button>
                    </div> :
                    <Button variant="contained" color="secondary" onClick={() => handleNext()}>
                        {props.t("label.general.next")}
                    </Button>}
            </div>
            <Divider variant={"middle"} style={{marginTop: "20px"}}/>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                <Button
                    color="secondary"
                    style={{marginTop: "20px", fontSize: "12px"}}
                    onClick={() => props.setDisplayRegister(false)}
                >
                    {props.t("label.login.registerToLogin")}
                </Button>
            </div>
        </div>
    );
}

export default Register;