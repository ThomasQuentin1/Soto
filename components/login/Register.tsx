import {
    // Avatar,
    Button,
    // CircularProgress,
    // createStyles,
    Divider,
    // IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText,
    Step,
    StepLabel,
    Stepper,
    // TextField,
    Typography
} from "@material-ui/core";
import React from "react";
// import {RegisterResponse} from "../../interfaces/requests";
// import {sha256} from "js-sha256";
import dragList from "./draggableList";
import Step1 from "./stepper/Step1";
// import {requestLogin} from "./Login";

// import Login from "./Login";

// const useStyles = makeStyles(createStyles({
//         buttonProgress: {
//             position: 'absolute'
//         },
//         textField: {
//             marginTop: "10px",
//             marginBottom: "10px"
//         }
//     }),
// );

interface Props {
    setDisplayRegister: (b: boolean) => void;
}

// const requestRegister = async (email: string, username: string, password: string, cPassword: string) : Promise<[boolean, string]> => {
//     if (password != cPassword)
//     {
//         // PROBLEME
//         return [false, "Passwords are not the same"];
//     }
//     //
//     // const headers = new Headers();
//     // headers.append("Content-Type", "application/json");
//     //
//     // const raw = JSON.stringify({
//     //     username: username,
//     //     email: email,
//     //     password: password
//     // });
//     // try {
//     //     const response = (await (
//     //         await fetch("http://localhost:5000/register", {
//     //             method: "POST",
//     //             body: raw,
//     //             headers
//     //         })
//     //     ).json()) as RegisterResponse;
//     //     return [response.success, response.message];
//     // } catch (error) {
//     //     return [false, "Connection error"]
//     // }
//     console.log(email + " " + username)
//     return [false, "not implemented yet"]
// };

function getSteps() {
    return ['Informations personnelles', 'Préférences et obligations', 'Sélectionner votre drive'];
}

// @ts-ignore
function getNutritionalPreferences() {
    return [
        "Impact sur la santé",
        "Impact environnemental",
        "Prix",
        "Valeur nutritionnelle",
        "Proximité du produit"
    ];
}

const Register = (props: Props) => {
    // const [loading, setLoading] = useState(false);
    // const classes = useStyles();
    // const timer = React.useRef<any>();
    // const formValid = (username != "" && password != "" && cPassword != "" && email != "")
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return {Step1};
            case 1:
                return {dragList};
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown step';
        }
    }

    const handleNext = () => {
        console.log("next")
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep + 1);
    };

    const handleFinish = () => {
        console.log("Finished")
        // requestRegister(email, username, password, cPassword)
    }

    // const handleButtonClick = () => {
    //     if (!loading) {
    //         setLoading(true);
    //         timer.current = setTimeout(() => {
    //             setLoading(false);
    //         }, 2000);
    //     }
    // };

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
                    Inscivez-vous à un compte
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
            {/*{activeStep === 0 ?*/}
            {/*    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", marginRight: "10%", marginLeft: "10%"}}>*/}
            {/*        <TextField*/}
            {/*            required*/}
            {/*            className={classes.textField}*/}
            {/*            id="emailRegister"*/}
            {/*            label="E-mail"*/}
            {/*            autoFocus*/}
            {/*            value={email}*/}
            {/*            onChange={(sender: any) => setEmail(sender.target.value)}*/}
            {/*        />*/}
            {/*        <TextField*/}
            {/*            required*/}
            {/*            className={classes.textField}*/}
            {/*            id="nameRegister"*/}
            {/*            label="Nom complet"*/}
            {/*            value={username}*/}
            {/*            onChange={(sender: any) => setUsername(sender.target.value)}*/}
            {/*        />*/}
            {/*        <TextField*/}
            {/*            required*/}
            {/*            className={classes.textField}*/}
            {/*            id="standard-password-input"*/}
            {/*            type="password"*/}
            {/*            label="Mot de passe"*/}
            {/*            value={password}*/}
            {/*            onChange={(sender: any) => setPassword(sender.target.value)}*/}
            {/*        />*/}
            {/*        <TextField*/}
            {/*            required*/}
            {/*            className={classes.textField}*/}
            {/*            id="standard-confirm-password-input"*/}
            {/*            type="password"*/}
            {/*            label="Confirmer le mot de passe"*/}
            {/*            value={cPassword}*/}
            {/*            onChange={(sender: any) => setCPassword(sender.target.value)}*/}
            {/*        />*/}
            {/*    </div> :*/}
            {/*    activeStep === 1 ?*/}
            {/*        <div>*/}
            {/*            Preférences / Obligations etc*/}
            {/*            <div>*/}
            {/*                Criteres de selection*/}
            {/*                {dragList()}*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                Vos obligations*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        :*/}
            {/*        <div>*/}
            {/*            Sélection de drive*/}
            {/*        </div>}*/}
            <div style={{display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px"}}>
                <Button disabled={activeStep === 0} onClick={() => handleBack()}>
                    Back
                </Button>
                {activeStep === steps.length - 1 ?
                    <Button variant="contained" color="primary" onClick={() => handleFinish()}>
                        Finish
                    </Button> :
                    <Button variant="contained" color="primary" onClick={() => handleNext()}>
                        Next
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
                    Vous avez déja un compte ? Connectez vous
                </Button>
            </div>
        </div>
    );
}

export default Register;