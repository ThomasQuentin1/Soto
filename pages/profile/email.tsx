import React, { useState } from "react";
import Header from "../../components/global/Header";
import DarkModeParent from "../../components/encapsulationComponents/DarkModeParent";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useRouter } from "next/router";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useDarkMode } from "../../components/settings/useDarkMode";
import { useTranslation } from "react-i18next";
import '../../i18n'
import { notifyError, notifySuccess } from "../../public/notifications/notificationsFunctions";
import { useChangeEmailMutation } from "../../typing";
import Footer from "../../components/global/Footer";


const Email = () => {
    const [t, i18n] = useTranslation();
    const [email, setEmail] = useState("");
    const [changeEmail] = useChangeEmailMutation({ variables: { email: email }, errorPolicy: 'all' })
    const router = useRouter();

    const [isEmailValid, setEmailValidation] = useState(true)


    const [theme, SetTheme] = useDarkMode();

    function checkEmail() {
        return new Promise<boolean>((resolve) => {
            const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            resolve(regexp.test(email))
            setEmailValidation(regexp.test(email))
        })
    }

    i18n;
    return (
        <>
            <title>{t("label.email")}</title>
            <DarkModeParent theme={theme}>
                <Header {...{ theme, SetTheme }} />
                <div style={{ height: "80%" }}>
                    <div className={"flexAlignJustifyCentered"} style={{ margin: "20px 0px" }}>
                        <a style={{ margin: "0px 10px" }} onClick={() => {
                            router.back()
                        }}>
                            <ArrowBackRoundedIcon style={{ fontSize: "3rem" }} />
                        </a>
                        <Typography variant={"h4"} style={{ margin: "0px 10px" }}>{t("label.email")}</Typography>
                    </div>
                    <Paper variant={"outlined"} className='halfWidth centered body'
                        style={{ width: "30%", margin: "50px auto", padding: "20px" }}>
                        <div style={{ margin: "10px 0px" }}>
                            <Typography variant={"h5"}>
                                {t("label.changeEmail")}
                            </Typography>
                        </div>
                        <div>
                            <div
                                style={{ width: "80%" }}>
                                <TextField
                                    color="primary"
                                    label={t("email.label")}
                                    value={email}
                                    style={{ width: "100%" }}
                                    onChange={(sender: any) => setEmail(sender.target.value)}
                                    type="email"
                                    error={!isEmailValid}
                                />
                            </div>
                            <div className={"dFlex"}
                                style={{ width: "80%", justifyContent: "flex-end", marginTop: "20px" }}>
                                <Button color="primary" onClick={() => {
                                    router.back()
                                }}>
                                    {t("label.general.cancel")}
                                </Button>
                                <Button variant="contained" color="primary" disabled={email === ""} onClick={() => {
                                    checkEmail().then(isValid => {
                                        if (isValid) {
                                            changeEmail().then(r => {
                                                if (r.errors)
                                                    notifyError(r.errors[0].message)
                                                else {
                                                    notifySuccess("Email changed to " + email)
                                                    router.back()
                                                }
                                            })
                                        }
                                    })
                                }}>
                                    {t("label.general.validate")}
                                </Button>
                            </div>

                        </div>
                    </Paper>
                </div>
                <Footer />
            </DarkModeParent>
        </>
    )
}

export default Email