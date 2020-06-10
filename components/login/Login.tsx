import React, {useState} from 'react';
import {Button, CircularProgress, createStyles, Divider, TextField, Typography} from "@material-ui/core";
import {sha256} from "js-sha256";
import {makeStyles} from "@material-ui/styles";
import Router from "next/router";
import DeleteAccount from "../profile/DeleteAccount";

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
                    Se connecter à Soto
                </Typography>
                {loading && <CircularProgress size={48} className={classes.buttonProgress}/>}
                <TextField
                    className={classes.textField}
                    id="standard-basic"
                    label="E-mail"
                    autoFocus
                    value={username}
                    onChange={(sender: any) => setUsername(sender.target.value)}
                />
                <TextField
                    className={classes.textField}
                    id="standard-password-input"
                    type="password"
                    label="Mot de passe"
                    value={password}
                    onChange={(sender: any) => setPassword(sender.target.value)}
                />
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button
                        disabled={!formValid}
                        color="primary"
                        style={{ marginTop: "20px", marginBottom: "20px"}}
                        onClick={() =>  {
                            handleButtonClick();
                            requestLogin(username, sha256(password)).then(function(value) {
                                if (value[0]) {
                                    console.log(value[1])
                                    Router.push("/index")
                                }
                                else
                                    console.log(value[1])
                            })
                        }}
                    >
                        Se connecter
                    </Button>
                </div>
                <Divider variant={"middle"}/>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button
                        color="primary"
                        style={{ marginTop: "20px", fontSize: "12px"}}
                        onClick={() => props.setDisplayRegister(true)}
                    >
                        Inscivez-vous à un compte
                    </Button>
                </div>
            <DeleteAccount/>
            </div>
        </div>
    );
};

export default Login