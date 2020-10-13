import React from "react";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";

const LoginPage = () => {
    const [theme] = useDarkMode();
    const tmpTheme: string = theme.toString();

    return (
        <div>
            <DarkModeParent theme={tmpTheme}>
                <p>Page de contact</p>
            </DarkModeParent>
        </div>
    );
}

export default LoginPage;
