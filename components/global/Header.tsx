import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import { useDarkMode } from "../settings/useDarkMode";
import { useAccountQuery } from 'typing';
import { Typography, CardMedia } from '@material-ui/core';
import Router from "next/router";

const Header = () => {
    const [ t, i18n ] = useTranslation();
    const [theme, setTheme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    const {data, loading} = useAccountQuery();
    i18n;
    setTheme;

    return (
    <div className='header-div' style={{zIndex: 1000,left: '0px', top: '0px', width:'100%', height: '80px', position:'sticky', display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '10px', color: "secondaryColor"}}>
       <CardMedia onClick={() => Router.push("/login")}
            style={{left: '20px', marginLeft: "10px", height: '60px', width: '60px', marginRight: '10px'}}
            image={`/images/${tmpTheme}/soto_round_logo_${tmpTheme}.png`}
          className={"roundLogo"}
          ></CardMedia>
        <h2>{t('baseline')}</h2>
        <div style={{marginLeft:'auto', display:'flex', justifyContent:'center', flexDirection:'row', alignItems:'center'}}>
            {!loading && data && data.account.currentShop &&
            <div style={{display:'flex', justifyContent:'center'}}> 
                <Typography variant="subtitle1">{data.account.currentShop.name}</Typography>
                <Typography variant="subtitle2" style={{marginLeft:'40px'}}>{data.account.email}</Typography>
            </div>
            }
            <div className={"profile-icon"} onClick={() => Router.push("/profile")}>
                <FontAwesomeIcon style={{height: '60px', width: '60px'}} icon={faUser}></FontAwesomeIcon>
            </div>
        </div>
    </div>);
};

export default Header;