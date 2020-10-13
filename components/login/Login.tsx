import React, {useState} from 'react';
import {Button, CircularProgress, createStyles, Divider, TextField, Typography} from "@material-ui/core";
import {sha256} from "js-sha256";
import {makeStyles} from "@material-ui/styles";
// import Router from "next/router";
import DeleteAccount from "../profile/DeleteAccount";
import {NotificationManager} from 'react-notifications';
import 'i18n';

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
    setDisplayRegister: (b: boolean) => void;
}

export const requestLogin = async (email: string, password: string) : Promise<[boolean, string]> => {
    // const headers = new Headers();
    // headers.append("Content-Type", "application/json");
    //
    // const raw = JSON.stringify({
    //     email: email,
    //     password: password
    // });
    // try {
    //     const response = (await (
    //         await fetch("http://localhost:5000/login", {
    //             method: "POST",
    //             body: raw,
    //             headers,
    //             redirect: "follow"
    //         })
    //     ).json()) as LoginResponse;
    //     if (response.success) {
    //         storeString("userEmail", email);
    //         return [response.success, response.message];
    //     } else {
    //         return [response.success, response.message];
    //     }
    // } catch (error) {
    //     // ERROR
    //     return [false, "Connection error"]
    // }
    console.log(email + " " + password)
    NotificationManager.success("Success", "LOGIN")
    return [true, "not implemented yet"]
};

const Login = (props: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const timer = React.useRef<any>();
    const formValid = (username != "" && password != "")

    const handleButtonClick = () => {
        if (!loading) {
            setLoading(true);
            timer.current = setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };
    let lng : string | null = 'fr';
    if (typeof window !== 'undefined') {
        lng = localStorage.getItem('lng');
    }
    return (
        <div style={{ width: "40vh", margin: "20px"}}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h6" gutterBottom style={{color: "grey", display: "flex", justifyContent: "center"}}>
                    {lng == 'fr' ? "Se connecter à Soto" : "Connect to Soto"}
                </Typography>
                {loading && <CircularProgress size={48} className={classes.buttonProgress}/>}
                <TextField
                    color="secondary"
                    className={classes.textField}
                    id="standard-basic"
                    label="E-mail"
                    autoFocus
                    value={username}
                    onChange={(sender: any) => setUsername(sender.target.value)}
                />
                <TextField
                    color="secondary"
                    className={classes.textField}
                    id="standard-password-input"
                    type="password"
                    label={lng == 'fr' ? "Mot de passe" : "Password"}
                    value={password}
                    onChange={(sender: any) => setPassword(sender.target.value)}
                />
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button
                        color="secondary"
                        disabled={!formValid}
                        style={{ marginTop: "20px", marginBottom: "20px"}}
                        onClick={() =>  {
                            handleButtonClick();
                            requestLogin(username, sha256(password)).then(function(value) {
                                if (value[0]) {
                                    console.log(value[1])
                                    // Router.push("/index")
                                }
                                else
                                    console.log(value[1])
                            })
                        }}
                    >
                        {lng == 'fr' ? 'Se connecter' : 'Connect'}
                    </Button>
                </div>
                <Divider variant={"middle"}/>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button
                        color="secondary"
                        style={{ marginTop: "20px", fontSize: "12px"}}
                        onClick={() => props.setDisplayRegister(true)}
                    >
                        {lng == 'fr' ? 'Inscivez-vous à un compte' : 'Sign in'}
                    </Button>
                </div>
            <DeleteAccount/>
            </div>
        </div>
    );
};

export default Login