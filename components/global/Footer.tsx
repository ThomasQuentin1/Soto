import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from "../settings/useDarkMode";
import Router from "next/router";

const Footer = () => {
    const [ t ] = useTranslation();
    const [theme] = useDarkMode();
    const tmpTheme: string = theme.toString();

    return (
        <div className={"footer"} style={{
            position: "fixed",
            bottom: '0px', width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', height: "100px"}}>
            <img
                style={{left: '20px', marginLeft: "10px", height: '90px', width: '90px', marginRight: '10px', alignSelf: "center",
                }}
                src={`/images/${tmpTheme}/soto_round_logo_${tmpTheme}.png`}
                className={"roundLogo"}
            />
            <div className="flexSpaceBetween" style={{width: "50%"}}>
                <Typography style={{cursor: "pointer"}} onClick={() => Router.push("/profile")}>{t('aboutUs')}</Typography>
                <Typography style={{cursor: "pointer"}} onClick={() => Router.push("/profile")}>{t('contactUs')}</Typography>
                <Typography style={{cursor: "pointer"}} onClick={() => Router.push("/profile")}>{t('privacyPolicy')}</Typography>
                <Typography style={{cursor: "pointer"}} onClick={() => Router.push("/profile")}>{t('conditionsOfUse')}</Typography>
            </div>
        </div>);
};

export default Footer