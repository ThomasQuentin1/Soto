import Login from './Login'
import Register from "./Register";
import React, {useState} from "react";
import {NoSsr, Paper} from "@material-ui/core";
import {TFunction} from "i18next";

interface Props {
    t: TFunction
}

const LoginController = (props: Props) => {
    const [displayRegister, setDisplayRegister] = useState(false);

    return (
        <div id="parent-login-form" style={{display: "flex", justifyContent: "center", marginTop: "100px"}}>
            <NoSsr>
                <Paper color={'primary'} elevation={3}>
                    {!displayRegister && (
                        <Login setDisplayRegister={setDisplayRegister} t={props.t} />
                    )}
                    {displayRegister && (
                        <Register setDisplayRegister={setDisplayRegister} t={props.t} />
                    )}
                </Paper>
            </NoSsr>
        </div>
    );
}

export default LoginController;