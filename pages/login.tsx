import LoginController from "../components/login/LoginController";
import React from "react";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import Header from "components/global/Header";
import Footer from "../components/global/Footer";


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
                <Header/>
                <div style={{height: "80%"}}>
                    <LoginController/>
                </div>
                <Footer/>
            </DarkModeParent>
        </div>
    );
}

export default LoginPage;
