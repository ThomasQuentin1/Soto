import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from "../../components/settings/useDarkMode";

const Footer = () => {
    const [ t, i18n ] = useTranslation();
    const [theme, setTheme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    i18n;
    setTheme;

    return (
    <div className="footer-div" style={{left: '0px', top: '0px', width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: '10px', paddingBottom: '10px'}}>
        <div></div>
        <img
            style={{left: '20px', marginLeft: "10px", height: '100px', width: '100px', marginRight: '10px'}}
          src={`/images/${tmpTheme}/soto_round_logo_${tmpTheme}.png`}
          className={"roundLogo"}
          />
        <div>
            <ul>
                <li>
                    <a className={"footer-link"} href="profile">{t('aboutUs')}</a>
                </li>
                <li>
                    <a className={"footer-link"} href="profile">{t('privacyPolicy')}</a>
                </li>
                <li>
                    <a className={"footer-link"} href="profile">{t('conditionsOfUse')}</a>
                </li>
            </ul>
        </div>
        <div></div>
    </div>);
};

export default Footer