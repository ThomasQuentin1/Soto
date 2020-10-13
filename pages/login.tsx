import LoginController from "../components/login/LoginController";
import React from "react";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";

const LoginPage = () => {
    const [theme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    let lng : string | null = 'fr';
    if (typeof window !== 'undefined') {
      lng = localStorage.getItem('lng');
      if (lng == null) {
        localStorage.setItem('lng', 'fr');
      }
    }
    return (
        <div>
            <DarkModeParent theme={tmpTheme}>
                <Header></Header>
                <div>
                    <LoginController/>
                </div>
            </DarkModeParent>
        </div>
    );
}

export default LoginPage;
