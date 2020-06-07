import Login from './Login'
import Register from "./Register";
import {useState} from "react";
import {Card} from "@material-ui/core";

const LoginController = () => {
    const [displayRegister, setDisplayRegister] = useState(false);

    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: "170px"}}>
            <Card>
                {!displayRegister && (
                    <Login setDisplayRegister={setDisplayRegister} />
                )}
                {displayRegister && (
                    <Register setDisplayRegister={setDisplayRegister} />
                )}
            </Card>
        </div>
    );
}

export default LoginController;