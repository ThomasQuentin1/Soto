import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import '../i18n'
import ToggleColorMode from "../components/settings/ToggleColorMode";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import {Button, TextField, Typography} from "@material-ui/core";
import DeleteAccount from "../components/profile/DeleteAccount";
import {sha256} from "js-sha256";
import {loginError, loginSuccess} from "../public/notifications/notificationsFunctions";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import {
    useAccountQuery,
    useChangeEmailMutation,
    useChangePasswordMutation,
    useSetCriterionsMutation,
    useSetObligationsMutation
} from "../typing";
import ParametersSelect from "../components/shop/ParametersSelect";
import {CheckBoxData} from "../components/shop/ObligationCheckboxList";
import {CriteriaData} from "../components/shop/DragList";

const ProfilePage = () => {
    const [ t, i18n ] = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [changeEmail] = useChangeEmailMutation({ variables: {email: email}, errorPolicy: 'all'})
    const [changePassword] = useChangePasswordMutation({ variables: {password: sha256(password)}, errorPolicy: 'all'})
    const {data, loading} = useAccountQuery()

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

    const loadCriteriaValues = () => {
        let list: CriteriaData[] = []
        data.account.criterions.forEach(function(item) {
            list.push({id: item.id, position: item.position, name: item.name.fr, activated: item.activated})
        })
        setCriteria(list)
    }

    const loadObligationValues = () => {
        let list: CheckBoxData[] = []
        data.account.obligations.forEach(function(item) {
            list.push({id: item.id, label: item.name.fr, checked: item.activated})
        })
        setObligations(list)
    }

    const [criteria, setCriteria] = React.useState<CriteriaData[]>([]);
    const [obligations, setObligations] = React.useState<CheckBoxData[]>([]);
    const [obligationsMutation] = useSetObligationsMutation({variables: {
            obligations: obligations.filter(item => item.checked).map(function (item) {
                return {id: item.id}
            })}})
    const [criteriaMutation] = useSetCriterionsMutation({variables: {
            criterias: criteria.map(function(item, index) {
                return {id: item.id, position: index + 1}
            })}})


    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang)
        localStorage.setItem('lng', lang)
    }

    if (!loading && criteria.length == 0) {
        loadCriteriaValues()
        loadObligationValues()
    }

    const langs = ['fr', 'en']
    const [theme, setTheme] = useDarkMode();
    const tmpTheme: string = theme.toString();

    i18n;
    return (
        <>
            <DarkModeParent theme={tmpTheme}>
                <Header isConnected={true}/>
                <div>
                    <div style={{position:"absolute", display: "flex", top:"100px", right:"10px"}}>
                        {langs.map((lang, index) => {
                            return (
                                <img
                                    key={index}
                                    src={`/images/common/flag_${lang}.png`}
                                    className={"flagLogo"}
                                    alt={"roundSotoLogo"}
                                    onClick={() => {
                                        changeLang(lang)}
                                    }
                                />
                            )
                        })}
                        <ToggleColorMode theme={theme} toggleTheme={setTheme}/>
                    </div>
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
                                            loginError(r.errors[0].message)
                                        else {
                                            loginSuccess("Email changed to " + email)
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
                                            loginError(r.errors[0].message)
                                        else {
                                            loginSuccess("Password changed")
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
                                <ParametersSelect shop={true}/>
                                <Button
                                onClick={() => {
                                    criteriaMutation().then(r2 => {
                                        obligationsMutation().then(r3 => {
                                            if (!r2) {
                                                loginError("Criteria saving failed")
                                            } else if (!r3) {
                                                loginError("Obligations saving failed")
                                            } else {
                                                loginSuccess("Criteria and obligations save successfully")
                                            }
                                        })
                                    })
                                }}>
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
};

export default ProfilePage;