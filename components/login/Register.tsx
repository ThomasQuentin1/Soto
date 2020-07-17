import {
    Button,
    Divider,
    Step,
    StepLabel,
    Stepper,
    Typography
} from "@material-ui/core";
import React, {useState} from "react";
import {sha256} from "js-sha256";
import Step1 from "./stepper/Step1";
import Step2 from "./stepper/Step2";
import {requestLogin} from "./Login";
import Router from "next/router";

interface Props {
    setDisplayRegister: (b: boolean) => void;
}

const requestRegister = async (email: string, username: string, password: string, cPassword: string) : Promise<[boolean, string]> => {
    if (password != cPassword)
    {
        // PROBLEME
        return [false, "Passwords are not the same"];
    }
    //
    // const headers = new Headers();
    // headers.append("Content-Type", "application/json");
    //
    // const raw = JSON.stringify({
    //     username: username,
    //     email: email,
    //     password: password
    // });
    // try {
    //     const response = (await (
    //         await fetch("http://localhost:5000/register", {
    //             method: "POST",
    //             body: raw,
    //             headers
    //         })
    //     ).json()) as RegisterResponse;
    //     return [response.success, response.message];
    // } catch (error) {
    //     return [false, "Connection error"]
    // }
    console.log(email + " " + username)
    return [true, "not implemented yet"]
};

function getSteps() {
    return [
        'Informations personnelles',
        'Préférences et obligations',
        // 'Sélectionner votre drive'
    ];
}

const Register = (props: Props) => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    let lng : string | null = 'fr';
    if (typeof window !== 'undefined') {
        lng = localStorage.getItem('lng');
    }

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <Step1 setEmail={setEmail} setUsername={setUsername} setPassword={setPassword} setCPassword={setCPassword}/>;
            case 1:
                return <Step2/>;
            // case 2:
            //     return 'This is the bit I really care about!';
            default:
                return 'Unknown step';
        }
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleFinish = () => {
        requestRegister(email, username, sha256(password), sha256(cPassword)).then(function(value) {
            if (value[0]) {
                requestLogin(email, sha256(password)).then(function(value) {
                    if (value[0]) {
                        console.log(value[1])
                        Router.push("/index")
                    }
                    else
                        console.log(value[1])
                })
            }
        })
    }

    return (
        <div style={{ width: "auto", margin: "20px"}}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
            >
                <Typography variant="h6" gutterBottom style={{marginBottom: "20px", color: "grey", display: "flex", justifyContent: "center"}}>
                    {lng == 'fr' ? 'Inscivez-vous à un compte' : 'Sign in'}
                </Typography>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: { optional?: React.ReactNode } = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
            {getStepContent(activeStep)}
            <div style={{display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px"}}>
                <Button disabled={activeStep === 0} onClick={() => handleBack()}>
                {lng == 'fr' ? 'Retour' : 'Back'}
                </Button>
                {activeStep === steps.length - 1 ?
                    <Button variant="contained" color="primary" onClick={() => handleFinish()}>
                         {lng == 'fr' ? 'Finir' : 'Finish'}
                    </Button> :
                    <Button variant="contained" color="primary" onClick={() => handleNext()}>
                         {lng == 'fr' ? 'Suivant' : 'Next'}
                    </Button>}
            </div>
            <Divider variant={"middle"} style={{marginTop: "20px"}}/>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                <Button
                    color="primary"
                    style={{ marginTop: "20px", fontSize: "12px"}}
                    onClick={() => props.setDisplayRegister(false)}
                >
                     {lng == 'fr' ? 'Vous avez déja un compte ? Connectez vous' : 'You already have an account ? Sign in'}
                </Button>
            </div>
        </div>
    );
}

export default Register;