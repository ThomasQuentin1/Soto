import Login from './Login'
import Register from "./Register";
import React, {useState} from "react";
import {NoSsr, Paper} from "@material-ui/core";

const LoginController = () => {
    const [displayRegister, setDisplayRegister] = useState(false);

    return (
        <div id="parent-login-form" style={{display: "flex", justifyContent: "center", marginTop: "100px"}}>
            <NoSsr>
                <Paper color={'primary'} elevation={3}>
                    {!displayRegister && (
                        <Login setDisplayRegister={setDisplayRegister} />
                    )}
                    {displayRegister && (
                        <Register setDisplayRegister={setDisplayRegister} />
                    )}
                </Paper>
            </NoSsr>
        </div>
    );
}

export default LoginController;