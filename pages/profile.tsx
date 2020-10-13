import React, {useEffect} from "react";
// import { Button } from "@material-ui/core";
import { useTranslation } from 'react-i18next';
import '../i18n'
// import RightPanel from "components/encapsulationComponents/RightPanel";
// import ToggleLanguage from "components/settings/ToggleLanguage";
import ToggleColorMode from "../components/settings/ToggleColorMode";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import {TextField, Typography} from "@material-ui/core";
import DeleteAccount from "../components/profile/DeleteAccount";
// import {i18n} from "../i18n";


const ProfilePage = () => {
    const [ t, i18n ] = useTranslation();

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
    return (
        <>
            <DarkModeParent theme={tmpTheme}>
                <div>
                    <div style={{position:"absolute", display: "flex", top:"0", right:"10px"}}>
                        {langs.map(lang => {
                            return (
                                <img
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
                            {/*<p>Email: Not implemented</p>*/}
                            <TextField
                                color="secondary"
                                className={"textField"}
                                id="standard-basic"
                                label="E-mail"
                                // disabled={true}
                                value={"Not implemented"}
                                // onChange={(sender: any) => setUsername(sender.target.value)}
                            />

                            {/*<p>{t('password.label')}: Not implemented</p>*/}
                            <TextField
                                color="secondary"
                                className={"textField"}
                                id="standard-password-input"
                                label={t('password.label')}
                                type="password"
                                // disabled={true}
                                value={"Not implemented"}
                                // onChange={(sender: any) => setUsername(sender.target.value)}
                            />
                            <DeleteAccount/>
                        </div>
                        {/*<div id="example-features">*/}
                        {/*        <div>*/}
                        {/*            <Button variant="contained" color="secondary" onClick={notify2}>*/}
                        {/*                {t("buttonExample.label")}*/}
                        {/*            </Button>*/}
                        {/*            <Button variant="contained" color="secondary" onClick={notify2}>*/}
                        {/*                React Toastify*/}
                        {/*            </Button>*/}
                        {/*        </div>*/}
                        {/*        <img*/}
                        {/*            src={`/images/${tmpTheme}/soto_round_logo_${tmpTheme}.png`}*/}
                        {/*            className={"roundLogo"}*/}
                        {/*            alt={"roundSotoLogo"}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*    <div style={{marginLeft:"30px", marginRight:"30px", fontSize:"1eh"}}>*/}
                        {/*        <p>{t('soto.description')}</p>*/}
                        {/*    </div>*/}
                        {/*    <RightPanel>*/}
                        {/*        /!*<ToggleLanguage t={t}></ToggleLanguage>*!/*/}
                        {/*        <ToggleColorMode theme={theme} toggleTheme={setTheme}></ToggleColorMode>*/}
                        {/*    </RightPanel>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </DarkModeParent>
        </>
    );
};

export default ProfilePage;