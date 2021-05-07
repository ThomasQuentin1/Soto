import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from "../../components/settings/useDarkMode";
import Router from "next/router";

interface FooterProps {
    changeStyle?: boolean;
}

const Footer = ({changeStyle}: FooterProps) => {
    const [ t, i18n ] = useTranslation();
    const [theme, setTheme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    i18n;
    setTheme;

    return (
    <div className={"footer"} style={{position: changeStyle ? 'relative' : 'absolute', bottom: '0px', width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: '20px', paddingBottom: '10px'}}>
        <div></div>
        <img
            style={{left: '20px', marginLeft: "10px", height: '100px', width: '100px', marginRight: '10px'}}
          src={`/images/${tmpTheme}/soto_round_logo_${tmpTheme}.png`}
          className={"roundLogo"}
          />
        <div>
            <ul>
                <li>
                    <Typography onClick={() => Router.push("/profile")}>{t('aboutUs')}</Typography>
                </li>
                <li>
                    <Typography onClick={() => Router.push("/profile")}>{t('contactUs')}</Typography>
                </li>
                <li>
                    <Typography onClick={() => Router.push("/profile")}>{t('privacyPolicy')}</Typography>
                </li>
                <li>
                    <Typography onClick={() => Router.push("/profile")}>{t('conditionsOfUse')}</Typography>
                </li>
            </ul>
        </div>
        <div></div>
    </div>);
};

export default Footer