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
import Router from "next/router";
// import {useMutation} from "@apollo/client";
// import {gql} from "@apollo/client/core";
import {loginError, loginSuccess} from "../../public/notifications/notificationsFunctions";
import Cookies from "js-cookie"
import {useRegisterMutation, useSetCriterionsMutation, useSetObligationsMutation} from "../../typing";
import { CheckBoxData } from "components/shop/ObligationCheckboxList";
import {CriteriaData} from "../shop/DragList";

// import {CriteriaInput} from "interfaces/Settings"

interface Props {
    setDisplayRegister: (b: boolean) => void;
}

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
    const [obligations, setObligations] = React.useState<CheckBoxData[]>([]);
    const [criteria, setCriteria] = React.useState<CriteriaData[]>([]);
    const steps = getSteps();
    let lng : string | null = 'fr';
    if (typeof window !== 'undefined') {
        lng = localStorage.getItem('lng');
    }
    const [register] = useRegisterMutation({ variables: {email: email, password: sha256(password)}, errorPolicy: 'all'})
    const [obligationsMutation] = useSetObligationsMutation({variables: {
            obligations: obligations.filter(item => item.checked).map(function (item) {
                return {id: item.id}
            })}})
    const [criteriaMutation] = useSetCriterionsMutation({variables: {
            criterias: criteria.map(function(item, index) {
                return {id: item.id, position: index + 1}
            })}})
    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <Step1 setEmail={setEmail} setUsername={setUsername} setPassword={setPassword} setCPassword={setCPassword}/>;
            case 1:
                return <Step2 setCriteria={setCriteria} setObligations={setObligations}/>;
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
        if (password !== cPassword)
            return;
        register().then(r => {
            if (r.errors) {
                loginError(r.errors[0].message)
            } else {
                Cookies.set("token", r.data.register, {expires: 7})
                criteria.map(function(item) {console.log({id: item.id, position: item.position})})
                obligations.filter(item => item.checked).map(function (item) {console.log({id: item.id})})
                criteriaMutation().then(r2 => {
                    obligationsMutation().then(r3 => {
                        if (!r2) {
                            loginError("Criteria saving failed")
                        } else if (!r3) {
                            loginError("Obligations saving failed")
                        } else {
                            loginSuccess("Logged in as " + username)
                            Router.push("/")
                        }
                    })
                })
            }
        });

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
                    {lng == 'fr' ? 'Retour' : 'Back'}
                </Button>
                {activeStep === steps.length - 1 ?
                    <div>
                        <Button variant="contained" color="secondary" onClick={() => handleFinish()}>
                            {lng == 'fr' ? 'Finir' : 'Finish'}
                        </Button>
                    </div> :
                    <Button variant="contained" color="secondary" onClick={() => handleNext()}>
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
                    color="secondary"
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