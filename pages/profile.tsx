import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import '../i18n'
import ToggleColorMode from "../components/settings/ToggleColorMode";
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
import { useRouter } from "next/router";
import CellComponent from "../components/profile/CellComponent";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         '& > *': {
//             margin: theme.spacing(1),
//             width: theme.spacing(160),
//             height: theme.spacing(16),
//         },
//     },
// }));

const ProfilePage = () => {
    const [ t, i18n ] = useTranslation();
    const [validate, setValidate] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [changeEmail] = useChangeEmailMutation({ variables: {email: email}, errorPolicy: 'all'})
    const [changePassword] = useChangePasswordMutation({ variables: {password: sha256(password)}, errorPolicy: 'all'})
    const {data, loading} = useAccountQuery()

    const router = useRouter()
    console.log(router.pathname)
    // const classes = useStyles();

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

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang)
        localStorage.setItem('lng', lang)
    }

    const langs = ['fr', 'en']
    const [theme, setTheme] = useDarkMode();
    const tmpTheme: string = theme.toString();

    i18n;
    if (!loading) {
        console.log(data)
        return (
            <>
                <title>{t("title.profile")}</title>
                <DarkModeParent theme={tmpTheme}>
                    <Header isConnected={true}/>
                    <div className='centered'>
                        {/*<div style={{position:"absolute", display: "flex", top:"100px", right:"10px"}}>*/}
                        {/*    {langs.map((lang, index) => {*/}
                        {/*        return (*/}
                        {/*            <img*/}
                        {/*                key={index}*/}
                        {/*                src={`/images/common/flag_${lang}.png`}*/}
                        {/*                className={"flagLogo"}*/}
                        {/*                alt={"roundSotoLogo"}*/}
                        {/*                onClick={() => {*/}
                        {/*                    changeLang(lang)}*/}
                        {/*                }*/}
                        {/*            />*/}
                        {/*        )*/}
                        {/*    })}*/}
                        {/*    <ToggleColorMode theme={theme} toggleTheme={setTheme}/>*/}
                        {/*</div>*/}
                        <Paper variant={"outlined"} className='halfWidth centered body' style={{width: "30%"}}>
                            <div>
                                <Typography variant="h5" className={"subTitle marginBottom50px padding1020"}>{t('settings.personalInfos')}</Typography>
                                <CellComponent label={"E-MAIL ADDRESS"} value={data.account.email} path={"test"}/>
                                <div className={'cellDivider'}/>
                                <CellComponent label={"PASSWORD"} value={"••••••••"} path={"test"}/>
                            </div>
                        </Paper>

                        <Paper variant={"outlined"} className='halfWidth centered body' style={{width: "30%"}}>
                            <div>
                                <Typography variant="h5" className={"subTitle marginBottom50px padding1020"}>{t('settings.personalization')}</Typography>

                            </div>
                        </Paper>

                        <div style={{margin: "200px 20px 0px"}}>
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
                    <div style={{position:"absolute", bottom:'0px', left:'0px', width:'100%'}}>
                        <Footer/>
                    </div>
                </DarkModeParent>
            </>
        );
    } else {
        return (
            <>
                <p>Loading</p>
            </>
        )
    }

};

export default ProfilePage;