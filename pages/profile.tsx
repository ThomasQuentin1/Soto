import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import '../i18n'
// import ToggleColorMode from "../components/settings/ToggleColorMode";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import {Button, Paper, TextField, Typography} from "@material-ui/core";
import DeleteAccount from "../components/profile/DeleteAccount";
import {sha256} from "js-sha256";
import {notifyError, notifySuccess} from "../public/notifications/notificationsFunctions";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import {useAccountQuery, useChangeEmailMutation, useChangePasswordMutation} from "../typing";
import ParametersSelect from "../components/shop/ParametersSelect";
import {useRouter} from "next/router";
import Router from "next/router"
import CellComponent from "../components/profile/CellComponent";
import {lngFullName} from "../public/values";

const ProfilePage = () => {
    const [ t, i18n ] = useTranslation();
    const [validate, setValidate] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [changeEmail] = useChangeEmailMutation({ variables: {email: email}, errorPolicy: 'all'})
    const [changePassword] = useChangePasswordMutation({ variables: {password: sha256(password)}, errorPolicy: 'all'})
    const {error, data, loading, refetch} = useAccountQuery()

    const router = useRouter()
    console.log(router.pathname)

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

    if (!loading) {
        if (error?.message === "please login") {
            Router.push("/login")
            return <></>
        }
        return (
            <>
                <title>{t("title.profile")}</title>
                <DarkModeParent theme={tmpTheme}>
                    <Header isConnected={true}/>
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

                        <div style={{margin: "100px 20px 0px", border: "5px solid red"}}>
                            <Typography variant="h5" className={"subTitle"}>{t('settings.personalInfos')}</Typography>
                            <div>
                                <div>
                                    <TextField
                                        color="secondary"
                                        className={"textField"}
                                        label="E-mail"
                                        value={email}
                                        onChange={(sender: any) => setEmail(sender.target.value)}
                                    />
                                    <Button disabled={password !== cPassword || email === ""} onClick={() => {
                                        changeEmail().then(r => {
                                            if (r.errors)
                                                notifyError(r.errors[0].message)
                                            else {
                                                notifySuccess("Email changed to " + email)
                                                setEmail("")
                                            }
                                        })
                                    }}>
                                        Change Email
                                    </Button>
                                </div>

                                <div style={{display: "flex"}}>
                                    <TextField
                                        color="secondary"
                                        className={"textField"}
                                        id="newPassword"
                                        label={t('newPassword.label')}
                                        type="password"
                                        value={password}
                                        onChange={(sender: any) => setPassword(sender.target.value)}
                                    />
                                    <TextField
                                        color="secondary"
                                        className={"textField"}
                                        id="newPasswordConfirmed"
                                        label={t('confirmNewPassword.label')}
                                        type="password"
                                        value={cPassword}
                                        onChange={(sender: any) => setCPassword(sender.target.value)}
                                    />
                                    <Button disabled={password !== cPassword || password === ""} onClick={() => {
                                        changePassword().then(r => {
                                            if (r.errors)
                                                notifyError(r.errors[0].message)
                                            else {
                                                notifySuccess("Password changed")
                                                setPassword("")
                                                setCPassword("")
                                            }
                                        })
                                    }}>
                                        Change Password
                                    </Button>
                                </div>
                                <DeleteAccount/>
                                <div style={{width: "400px", marginTop: "10px"}}>
                                    <ParametersSelect shop={true} account={data.account} validate={validate} setValidate={setValidate}/>
                                    <Button onClick={() => { setValidate(true) }}>
                                        Save changes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div style={{position:"absolute", bottom:'0px', left:'0px', width:'100%'}}>*/}
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
                    <Header isConnected={true}/>
                    <div>
                        <Footer/>
                    </div>
                </DarkModeParent>
            </>
        )
    }

};

export default ProfilePage;