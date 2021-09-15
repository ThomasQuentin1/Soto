import React from "react";
import Header from "../../components/global/Header";
import DarkModeParent from "../../components/encapsulationComponents/DarkModeParent";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { useRouter } from "next/router";
import { Divider, Paper, Typography } from "@material-ui/core";
import { useDarkMode } from "../../components/settings/useDarkMode";
import { useTranslation } from "react-i18next";
import '../../i18n'
import { lngFullName, lngShortLong } from "../../public/values";
import Footer from "../../components/global/Footer";
import { CheckCircleSharp } from "@material-ui/icons";


const Language = () => {
    const [t, i18n] = useTranslation();
    const router = useRouter();

    let actualLang: string | null = "";
    let actualLocation: string | null = "";

    if (typeof window !== 'undefined') {
        actualLang = localStorage.getItem('lng')
        actualLocation = localStorage.getItem('lngLocation')
    }

    const changeLang = (lang: lngShortLong) => {
        i18n.changeLanguage(lang.shortName).then()
        localStorage.setItem('lng', lang.shortName)
        localStorage.setItem('lngLocation', lang.location)
    }

    const [theme, SetTheme] = useDarkMode();

    if (actualLang === "" && actualLocation === "") {
        return (
            <>
                <DarkModeParent theme={theme}>
                    <Header {...{ theme, SetTheme }} />
                </DarkModeParent>
            </>)
    } else {
        return (
            <>
                <title>{t("label.language")}</title>
                <DarkModeParent theme={theme}>
                    <Header  {...{ theme, SetTheme }} />
                    <div style={{ height: "80%" }}>
                        <div className={"flexAlignJustifyCentered"} style={{ margin: "20px 0px" }}>
                            <a style={{ margin: "0px 10px" }} onClick={() => {
                                router.back()
                            }}>
                                <ArrowBackRoundedIcon style={{ fontSize: "3rem" }} />
                            </a>
                            <Typography variant={"h4"} style={{ margin: "0px 10px" }}>{t("label.language")}</Typography>
                        </div>
                        <Paper variant={"outlined"} className='halfWidth centered body'
                            style={{ width: "30%", margin: "50px auto", padding: "20px" }}>
                            <div style={{ margin: "10px 0px" }}>
                                <Typography variant={"h5"}>
                                    {t("label.usedLanguage")}
                                </Typography>
                            </div>
                            <div>
                                <div className={"flexDirCol"}>
                                    {lngFullName.map((lang, index) => {
                                        return (
                                            <div className={"cell flexDirCol"} id={"global" + index}>
                                                <a className={"pad5 dFlex"} onClick={() => {
                                                    changeLang(lang)
                                                }}>
                                                    <div>
                                                        <Typography className={"cellTitle"}>{t(lang.key)}</Typography>
                                                        <Typography
                                                            className={"cellValue"}>{t(lang.location)}</Typography>
                                                    </div>
                                                    <div
                                                        hidden={actualLang != lang.shortName || actualLocation != lang.location}
                                                        style={{
                                                            alignSelf: "center",
                                                            marginRight: "0px",
                                                            marginLeft: "auto"
                                                        }}>
                                                        <CheckCircleSharp />
                                                    </div>
                                                </a>
                                                <Divider className={"marginV10H0px"}
                                                    hidden={index === lngFullName.length - 1} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </Paper>
                    </div>
                    <Footer />
                </DarkModeParent>
            </>
        )
    }

}

export default Language