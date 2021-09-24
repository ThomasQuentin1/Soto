import React, {useEffect} from "react";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import {useTranslation} from "react-i18next";
import '../i18n'
import {Button, Typography} from "@material-ui/core";
import {notifySuccess} from "../public/notifications/notificationsFunctions";

const LoginPage = () => {
    const [t, i18n] = useTranslation();
    const [theme, SetTheme] = useDarkMode();
    const usedTheme: string = theme.toString();
    let lng: string = 'fr';
    if (typeof window !== 'undefined') {
        lng = localStorage.getItem('lng') as string;
        if (lng == null) {
            localStorage.setItem('lng', window.navigator.language.split('-')[0]);
        }
        useEffect(() => {
            i18n.changeLanguage(lng)
        }, []);
    }


    return (
        <div>
            <DarkModeParent theme={usedTheme}>
                <Header  {...{theme, SetTheme}} />
                <div className="flexAlignJustifyCentered" style={{height: "80vh", flexDirection: "column"}}>
                    <Typography variant={"h6"} style={{borderBottom: "1px solid", marginBottom: "25px"}}>{t("email.label")} :</Typography>
                    <div className={"dFlex"}>
                        <Typography variant={"body1"}>soto_2022@labeip.epitech.eu</Typography>
                        <Button color="secondary" style={{marginLeft: "25px"}}
                                onClick={() => {
                                    navigator.clipboard.writeText("soto_2022@labeip.epitech.eu").then(() => {
                                        notifySuccess(t("notification.copyEmail"))
                                    }
                                )}}>
                            {t("label.copyEmail")}
                        </Button>
                    </div>
                </div>
                <Footer/>
            </DarkModeParent>
        </div>
    );
}

export default LoginPage;
