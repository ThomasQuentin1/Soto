import {createStyles, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(createStyles({
        buttonProgress: {
            position: 'absolute'
        },
        textField: {
            marginTop: "10px",
            marginBottom: "10px"
        }
    }),
);

interface Props {
    setEmail: (s: string) => void;
    // setUsername: (s: string) => void;
    setPassword: (s: string) => void;
    setCPassword: (s: string) => void;

    emailError: string;
    passwordError: string
}

const Step1 = (props: Props) => {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    let lng : string | null = 'fr';
    if (typeof window !== 'undefined') {
        lng = localStorage.getItem('lng');
    }
    return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginRight: "10%",
        marginLeft: "10%"
    }}>
        <TextField
            color="secondary"
            required
            className={classes.textField}
            id="emailRegister"
            label="E-mail"
            autoFocus
            value={email}
            onChange={(sender: any) => {
                setEmail(sender.target.value);
                props.setEmail(sender.target.value)
            }}
            error={props.emailError != ""}
            helperText={props.emailError}
        />
        <TextField
            color="secondary"
            required
            className={classes.textField}
            id="standard-password-input"
            type="password"
            label={lng == 'fr' ? 'Mot de passe' : 'Password'}
            value={password}
            onChange={(sender: any) => {
                setPassword(sender.target.value);
                props.setPassword(sender.target.value);
            }}
            error={props.passwordError != ""}
            helperText={props.passwordError}
        />
        <TextField
            color="secondary"
            required
            className={classes.textField}
            id="standard-confirm-password-input"
            type="password"
            label={lng == 'fr' ? "Confirmer le mot de passe" : 'Confirm password'}
            value={cPassword}
            onChange={(sender: any) => {
                setCPassword(sender.target.value);
                props.setCPassword(sender.target.value);
            }}
            error={props.passwordError != ""}
            helperText={props.passwordError}
        />
    </div>
    )
}

export default Step1;