import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import { useDarkMode } from "../settings/useDarkMode";
import { useAccountQuery } from 'typing';
import {Typography, CardMedia, Menu, MenuItem} from '@material-ui/core';
import Router from "next/router";
import Cookies from "js-cookie";

const Header = () => {
    const [ t ] = useTranslation();
    const [theme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    const {data, loading} = useAccountQuery();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
    <div className='header-div' style={{zIndex: 1000,left: '0px', top: '0px', width:'100%', height: '80px', position:'sticky', display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '10px', color: "secondaryColor"}}>
       <CardMedia onClick={() => Router.push("/login")}
            style={{left: '20px', marginLeft: "10px", height: '60px', width: '60px', marginRight: '10px', cursor: "pointer"}}
            image={`/images/${tmpTheme}/soto_round_logo_${tmpTheme}.png`}
          className={"roundLogo"}
          />
        <h2>{t('baseline')}</h2>
        <div style={{marginLeft:'auto', display:'flex', justifyContent:'center', flexDirection:'row', alignItems:'center'}}>
            {!loading && data && data.account.currentShop &&
            <div style={{display:'flex', justifyContent:'center'}}> 
                <Typography variant="subtitle1">{data.account.currentShop.name}</Typography>
                <Typography variant="subtitle2" style={{marginLeft:'40px'}}>{data.account.email}</Typography>
            </div>
            }
            <div className={"profile-icon"} onClick={handleClick} style={{cursor: "pointer"}}>
                <FontAwesomeIcon style={{height: '60px', width: '60px'}} icon={faUser}/>
            </div>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    handleClose()
                    Router.push("/profile").then(() => {})
                }}>Profile</MenuItem>
                <MenuItem onClick={() => {
                    handleClose()
                    Cookies.remove("token")
                    Router.push("/login").then(() => {})
                }}>Logout</MenuItem>
            </Menu>
        </div>
    </div>);
};

export default Header;