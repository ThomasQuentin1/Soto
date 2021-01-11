import Login from './Login'
import Register from "./Register";
import React, {useState} from "react";
import {Card, NoSsr} from "@material-ui/core";
// import DeleteAccount from "../profile/DeleteAccount";
// import {Card} from "@material-ui/core";

const LoginController = () => {
    const [displayRegister, setDisplayRegister] = useState(false);

    return (
        <div id="parent-login-form" style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
            <NoSsr>
                <Card color="secondary">
                    {!displayRegister && (
                        <Login setDisplayRegister={setDisplayRegister} />
                    )}
                    {displayRegister && (
                        <Register setDisplayRegister={setDisplayRegister} />
                    )}
                </Card>
            </NoSsr>
        </div>
    );
}

export default LoginController;