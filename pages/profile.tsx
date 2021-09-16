import React, {useEffect} from "react";
import {useTranslation} from 'react-i18next';
import '../i18n'
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import {useDarkMode} from "../components/settings/useDarkMode";
import {Paper, Typography} from "@material-ui/core";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import {useAccountQuery} from "../typing";
// import {useRouter} from "next/router";
import Router from "next/router"
import CellComponent from "../components/profile/CellComponent";
import {lngFullName} from "../public/values";

const ProfilePage = () => {
    const [t, i18n] = useTranslation();
    const {error, data, loading, refetch} = useAccountQuery()

    let lng: string = 'fr';
    if (typeof window !== 'undefined') {
        lng = localStorage.getItem('lng') as string;
        if (lng == null) {
            localStorage.setItem('lng', 'fr');
        }
        useEffect(() => {
            i18n.changeLanguage(lng)
        }, []);
    }
    const [theme] = useDarkMode();
    const tmpTheme: string = theme.toString();

    useEffect(() => {
        refetch().then()
    }, [])

    i18n;

    if (!loading) {
        if (error?.message === "error.notloggedin") {
            Router.push("/login")
        } else if (data) {
            return (
                <>
                    <title>{t("title.profile")}</title>
                    <DarkModeParent theme={tmpTheme}>
                        <Header/>
                        <div className='centered' style={{overflowY: "auto", height: "80%"}}>

                            <Paper variant={"outlined"} className='halfWidth centered body profilePaper'
                                   style={{width: "30%"}}>
                                <div>
                                    <Typography variant="h5"
                                                className={"subTitle marginBottom50px padding1020"}>{t('settings.personalInfos')}</Typography>
                                    <CellComponent label={t("email.label").toUpperCase()} value={data.account.email}
                                                   path={"profile/email"}/>
                                    <div className={'cellDivider'}/>
                                    <CellComponent label={t("password.label").toUpperCase()} value={"••••••••"}
                                                   path={"profile/password"}/>
                                </div>
                            </Paper>

                            <Paper variant={"outlined"} className='halfWidth centered body profilePaper'
                                   style={{width: "30%"}}>
                                <div>
                                    <Typography variant="h5"
                                                className={"subTitle marginBottom50px padding1020"}>{t('settings.personalization')}</Typography>
                                    <CellComponent label={t("language").toUpperCase()}
                                                   value={t(lngFullName.find((item) => {
                                                       return item.shortName === localStorage.getItem('lng')
                                                   })?.key!)} path={"profile/language"} iconName={"language"}/>
                                    <div className={'cellDivider'}/>
                                    <CellComponent label={t("label.accessibility").toUpperCase()}
                                                   value={tmpTheme === "light" ? t("label.lightTheme") : t("label.darkTheme")}
                                                   path={"profile/accessibility"} iconName={"accessibility"}/>
                                    <div className={'cellDivider'}/>
                                    <CellComponent label={t("label.criteriaAndObligations").toUpperCase()}
                                                   value={t("description.criteriaAndObligations")}
                                                   path={"profile/criteriaAndObligations"} iconName={"cart"}/>
                                    <div className={'cellDivider'}/>
                                    <CellComponent label={t("label.driveSelection").toUpperCase()}
                                                   value={data.account.currentShop ? data.account.currentShop.name : t("description.driveSelection")}
                                                   path={"driveSelect"} iconName={"store"}/>
                                </div>
                            </Paper>
                        </div>
                        <Footer/>
                    </DarkModeParent>
                </>
            );
        }
    }
    return (
        <>
            <DarkModeParent theme={tmpTheme}>
                <Header/>
                <Footer/>
            </DarkModeParent>
        </>
    )
};

export default ProfilePage;