import React, {useEffect} from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from 'react-i18next';
import '../i18n'
import RightPanel from "components/encapsulationComponents/RightPanel";
import ToggleLanguage from "components/settings/ToggleLanguage";
import ToggleColorMode from "../components/settings/ToggleColorMode";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {toast} from "react-toastify";


const ProfilePage = () => {
    const [ t, i18n ] = useTranslation();
    const notify = () => {
        NotificationManager.success('Success message', 'Title');
    };

    const notify2 = () => {
        toast.success('Wow so easy!')
    };

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
    const [theme, setTheme] = useDarkMode();
    const tmpTheme: string = theme.toString();

    i18n;
    return (
        <>
            <DarkModeParent theme={tmpTheme}>
                <div style={{display:"flex", flexDirection:"row", height:"100%", width:"100%", alignItems:"center"}}>
                    <div id="example-features">
                        <div>
                            <Button variant="contained" color="secondary" onClick={notify}>
                                {t("buttonExample.label")}
                            </Button>
                            <Button variant="contained" color="secondary" onClick={notify}>
                                React Notification
                            </Button>
                            <Button variant="contained" color="secondary" onClick={notify2}>
                                React Toastify
                            </Button>
                        </div>
                        <img
                            src={`/images/${tmpTheme}/soto_round_logo_${tmpTheme}.png`}
                            className={"roundLogo"}
                            alt={"roundSotoLogo"}
                        />
                    </div>
                    <div style={{marginLeft:"30px", marginRight:"30px", fontSize:"1eh"}}>
                        <p>{t('soto.description')}</p>
                    </div>
                    <RightPanel>
                        <ToggleLanguage t={t}></ToggleLanguage>
                        <ToggleColorMode theme={theme} toggleTheme={setTheme}></ToggleColorMode>
                    </RightPanel>

                    <NotificationContainer/>
                </div>
            </DarkModeParent>
        </>
    );
};

export default ProfilePage;