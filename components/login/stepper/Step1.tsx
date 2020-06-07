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

const Step1 = () => {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginRight: "10%",
        marginLeft: "10%"
    }}>
        <TextField
            required
            className={classes.textField}
            id="emailRegister"
            label="E-mail"
            autoFocus
            value={email}
            onChange={(sender: any) => setEmail(sender.target.value)}
        />
        <TextField
            required
            className={classes.textField}
            id="nameRegister"
            label="Nom complet"
            value={username}
            onChange={(sender: any) => setUsername(sender.target.value)}
        />
        <TextField
            required
            className={classes.textField}
            id="standard-password-input"
            type="password"
            label="Mot de passe"
            value={password}
            onChange={(sender: any) => setPassword(sender.target.value)}
        />
        <TextField
            required
            className={classes.textField}
            id="standard-confirm-password-input"
            type="password"
            label="Confirmer le mot de passe"
            value={cPassword}
            onChange={(sender: any) => setCPassword(sender.target.value)}
        />
    </div>
    )
}

export default Step1;