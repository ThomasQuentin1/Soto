import {createStyles, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/styles";
import {TFunction} from "i18next";

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
    setPassword: (s: string) => void;
    setCPassword: (s: string) => void;

    emailError: string;
    passwordError: string
    t: TFunction
}

const Step1 = (props: Props) => {
    const classes = useStyles();

    const [email, setEmail] = useState("");
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
                color="secondary"
                required
                className={classes.textField}
                id="emailRegister"
                label={props.t("email.label")}
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
                label={props.t("password.label")}
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
                label={props.t("label.confirmPassword")}
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