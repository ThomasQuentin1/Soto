import React, {useState} from 'react';
import {Button, CircularProgress, createStyles, Divider, TextField, Typography} from "@material-ui/core";
import {sha256} from "js-sha256";
import {makeStyles} from "@material-ui/styles";
import DeleteAccount from "../profile/DeleteAccount";
import 'i18n';
import Router from "next/router";
import {loginError, loginSuccess} from "../../public/notifications/notificationsFunctions";
import Cookies from "js-cookie";
import {useLoginMutation} from "../../typing";

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

const Login = (props: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const timer = React.useRef<any>();
    const formValid = (email != "" && password != "")
    const [login] = useLoginMutation({ variables: {email: email, password: sha256(password)}, errorPolicy: 'all', ignoreResults: false})

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
            </div>
        </div>
    );
};

export default Login