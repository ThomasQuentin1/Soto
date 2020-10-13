import React, {useState} from 'react';
import {Button, CircularProgress, createStyles, Divider, TextField, Typography} from "@material-ui/core";
import {sha256} from "js-sha256";
import {makeStyles} from "@material-ui/styles";
// import Router from "next/router";
import DeleteAccount from "../profile/DeleteAccount";
import 'i18n';
import Router from "next/router";
import {gql} from "@apollo/client/core";
import {useMutation} from "@apollo/client";
import {loginError, loginSuccess} from "../../public/notifications/notificationsFunctions";
import Cookies from "js-cookie";

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

export const LOGIN_USER = gql`mutation Login($email: String!, $password: String!) {login (email: $email, passwordSHA256: $password)}`;

const Login = (props: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const timer = React.useRef<any>();
    const formValid = (email != "" && password != "")
    const [login] = useMutation(LOGIN_USER, { variables: {email: email, password: sha256(password)}, errorPolicy: 'all', ignoreResults: false})

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
                    value={email}
                    onChange={(sender: any) => setEmail(sender.target.value)}
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
                            console.log(sha256(password))
                            login().then(r => {
                                if (r.errors)
                                    loginError(r.errors[0].message)
                                else {
                                    loginSuccess("Logged in")
                                    Cookies.set("token", r.data.login, {expires: 7})
                                    Router.push("/")
                                }
                            });
                            // requestLogin(email, sha256(password)).then(function(value) {
                            //     if (value[0]) {
                            //         loginSuccess();
                            //         console.log(value[1])
                            //         Router.push("/")
                            //     }
                            //     else {
                            //         loginError();
                            //         console.log(value[1])
                            //     }
                            // })
                        }}
                    >
                        {lng == 'fr' ? 'Se connecter' : 'Connect'}
                    </Button>
                    {/*<Button*/}
                    {/*    color="secondary"*/}
                    {/*    disabled={!formValid}*/}
                    {/*    style={{ marginTop: "20px", marginBottom: "20px"}}*/}
                    {/*    onClick={() =>  {*/}
                    {/*        loginError("Login error");*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {lng == 'fr' ? 'Se connecter erreur' : 'Connect will fail'}*/}
                    {/*</Button>*/}
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