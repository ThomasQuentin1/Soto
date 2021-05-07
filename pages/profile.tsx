import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import '../i18n'
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import {Paper, Typography} from "@material-ui/core";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import {useAccountQuery} from "../typing";
// import {useRouter} from "next/router";
import Router from "next/router"
import CellComponent from "../components/profile/CellComponent";
import {lngFullName} from "../public/values";

const ProfilePage = () => {
    const [ t, i18n ] = useTranslation();
    const {error, data, loading, refetch} = useAccountQuery()

    let lng : string | null = 'fr';
    if (typeof window !== 'undefined') {
        lng = localStorage.getItem('lng');
        if (lng == null) {
            localStorage.setItem('lng', 'fr');
        }
        useEffect(() => {
            i18n.changeLanguage(lng == 'fr' ? 'fr' : 'en')
        }, []);
    }
    const [theme] = useDarkMode();
    const tmpTheme: string = theme.toString();

    useEffect(() => {
        refetch().then()
    }, [])

    i18n;

    if (!loading && data) {
        if (error?.message === "please login") {
            Router.push("/login")
            return <></>
        }
        return (
            <>
                <title>{t("title.profile")}</title>
                <DarkModeParent theme={tmpTheme}>
                    <Header/>
                    <div className='centered' style={{overflowY: "auto"}}>

                        <Paper variant={"outlined"} className='halfWidth centered body' style={{width: "30%"}}>
                            <div>
                                <Typography variant="h5" className={"subTitle marginBottom50px padding1020"}>{t('settings.personalInfos')}</Typography>
                                <CellComponent label={t("email.label").toUpperCase()} value={data.account.email} path={"email"}/>
                                <div className={'cellDivider'}/>
                                <CellComponent label={t("password.label").toUpperCase()} value={"••••••••"} path={"password"}/>
                            </div>
                        </Paper>

                        <Paper variant={"outlined"} className='halfWidth centered body' style={{width: "30%"}}>
                            <div>
                                <Typography variant="h5" className={"subTitle marginBottom50px padding1020"}>{t('settings.personalization')}</Typography>
                                <CellComponent label={t("language").toUpperCase()} value={t(lngFullName.find((item) => {return item.shortName === localStorage.getItem('lng')})?.key!) } path={"language"} iconName={"language"}/>
                                <div className={'cellDivider'}/>
                                <CellComponent label={t("label.accessibility").toUpperCase()} value={tmpTheme === "light" ? t("label.lightTheme") : t("label.darkTheme")} path={"accessibility"} iconName={"accessibility"}/>
                                <div className={'cellDivider'}/>
                                <CellComponent label={t("label.criteriaAndObligations").toUpperCase()} value={t("description.criteriaAndObligations")} path={"criteriaAndObligations"} iconName={"cart"}/>
                            </div>
                        </Paper>
                    </div>
                    <div style={{marginBottom: "0px", marginTop: "auto"}}>
                        <Footer/>
                    </div>
                </DarkModeParent>
            </>
        );
    } else {
        return (
            <>
                <DarkModeParent theme={tmpTheme}>
                    <Header/>
                    <div>
                        <Footer/>
                    </div>
                </DarkModeParent>
            </>
        )
    }

};

export default ProfilePage;