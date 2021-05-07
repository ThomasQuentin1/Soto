import React, {useState} from "react";
import Header from "../../components/global/Header";
import DarkModeParent from "../../components/encapsulationComponents/DarkModeParent";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import {useRouter} from "next/router";
import {Button, Paper, TextField, Typography} from "@material-ui/core";
import {useDarkMode} from "../../components/settings/useDarkMode";
import {useTranslation} from "react-i18next";
import '../../i18n'
import {notifyError, notifySuccess} from "../../public/notifications/notificationsFunctions";
import {useChangePasswordMutation} from "../../typing";
import {sha256} from "js-sha256";
import Footer from "../../components/global/Footer";


const Password = () => {
    const [t, i18n] = useTranslation();
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [changePassword] = useChangePasswordMutation({variables: {password: sha256(password)}, errorPolicy: 'all'})
    const [helperText, setHelperText] = useState("")
    const router = useRouter();


    const [theme] = useDarkMode();

    i18n;
    return (
        <>
            <title>{t("label.password")}</title>
            <DarkModeParent theme={theme}>
                <Header isConnected={true}/>
                <div>
                    <div className={"flexAlignJustifyCentered"} style={{margin: "20px 0px"}}>
                        <a style={{margin: "0px 10px"}} onClick={() => {
                            router.back()
                        }}>
                            <ArrowBackRoundedIcon style={{fontSize: "3rem"}}/>
                        </a>
                        <Typography variant={"h4"} style={{margin: "0px 10px"}}>{t("label.password")}</Typography>
                    </div>
                    <Paper variant={"outlined"} className='halfWidth centered body'
                           style={{width: "30%", margin: "50px auto", padding: "20px"}}>
                        <div style={{margin: "10px 0px"}}>
                            <Typography variant={"h5"}>
                                {t("label.changePassword")}
                            </Typography>
                        </div>
                        <div>
                            <div
                                className={"flexDirCol"}
                                style={{width: "80%"}}>
                                <TextField
                                    color="primary"
                                    label={t('newPassword.label')}
                                    type="password"
                                    value={password}
                                    style={{width: "100%", margin: "10px 0px"}}
                                    onChange={(sender: any) => setPassword(sender.target.value)}
                                    helperText={helperText}
                                    error={helperText != ""}
                                />
                                <TextField
                                    color="primary"
                                    label={t('confirmNewPassword.label')}
                                    type="password"
                                    value={cPassword}
                                    style={{width: "100%", margin: "10px 0px"}}
                                    onChange={(sender: any) => setCPassword(sender.target.value)}
                                    helperText={helperText}
                                    error={helperText != ""}
                                />
                            </div>
                            <div className={"dFlex"}
                                 style={{width: "80%", justifyContent: "flex-end", marginTop: "20px"}}>
                                <Button color="primary" onClick={() => {
                                    router.back()
                                }}>
                                    {t("label.general.cancel")}
                                </Button>
                                <Button variant="contained" color="primary"
                                        disabled={password === "" && cPassword === ""} onClick={() => {
                                    if (password != cPassword) {
                                        setHelperText(t("label.helperText.passwordsDifferent"))
                                        return
                                    }
                                    changePassword().then(r => {
                                        if (r.errors)
                                            notifyError(r.errors[0].message)
                                        else {
                                            notifySuccess("Password changed")
                                            router.back()
                                        }
                                    })
                                }}>
                                    {t("label.general.validate")}
                                </Button>
                            </div>

                        </div>
                    </Paper>
                </div>
                <div style={{position:"absolute", bottom:'0px', left:'0px', width:'100%'}}>
                    <Footer/>
                </div>
            </DarkModeParent>
        </>
    )
}

export default Password