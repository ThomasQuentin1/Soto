import LoginController from "../components/login/LoginController";
import React, {useEffect} from "react";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import {useDarkMode} from "../components/settings/useDarkMode";
import Header from "components/global/Header";
import {useTranslation} from "react-i18next";


const LoginPage = () => {
    const [t, i18n] = useTranslation();
    const [theme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('lng') === null) {
            localStorage.setItem('lng', window.navigator.language);
        }
        useEffect(() => {
            i18n.changeLanguage(localStorage.getItem('lng') as string)
        }, []);
    }


    return (
        <div>
            <DarkModeParent theme={tmpTheme}>
                <Header/>
                <div style={{height: "80%"}}>
                    <LoginController t={t}/>
                </div>
                {/*<Footer/>*/}
            </DarkModeParent>
        </div>
    );
}

export default LoginPage;
