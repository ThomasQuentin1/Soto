import React from "react";
import Header from "../../components/global/Header";
import DarkModeParent from "../../components/encapsulationComponents/DarkModeParent";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import {useRouter} from "next/router";
import {Paper, Typography} from "@material-ui/core";
import {useDarkMode} from "../../components/settings/useDarkMode";
import {useTranslation} from "react-i18next";
import Footer from "../../components/global/Footer";
import Switch from "@material-ui/core/Switch";


const Accessibility = () => {
    const [t] = useTranslation();
    const [theme, setTheme] = useDarkMode();
    const router = useRouter();

    return (
        <>
            <title>{t("label.accessibility")}</title>
            <DarkModeParent theme={theme}>
                <Header/>
                <div style={{height: "80%"}}>
                    <div className={"flexAlignJustifyCentered"} style={{margin: "20px 0px"}}>
                        <a style={{margin: "0px 10px"}} onClick={() => {
                            router.back()
                        }}>
                            <ArrowBackRoundedIcon style={{fontSize: "3rem"}}/>
                        </a>
                        <Typography variant={"h4"} style={{margin: "0px 10px"}}>{t("label.accessibility")}</Typography>
                    </div>
                    <Paper variant={"outlined"} className='halfWidth centered body'
                           style={{width: "30%", margin: "50px auto", padding: "20px"}}>
                        <div>
                            <div className={"dFlex alignCenter"}>
                                <div>
                                    <Typography style={{fontSize: "1.5rem"}}>{t("label.changeTheme")}</Typography>
                                    <Typography color="textSecondary" className={"cellValue"}>{t("label.themeSelection.helperText")}</Typography>
                                </div>
                                <div style={{marginRight: "0px", marginLeft: "auto"}}>
                                    <Switch
                                        checked={theme === "dark"}
                                        onChange={setTheme}
                                    />
                                </div>
                            </div>
                        </div>
                    </Paper>
                </div>
                <Footer/>
            </DarkModeParent>
        </>
    )
}

export default Accessibility