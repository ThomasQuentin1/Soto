import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import { useDarkMode } from "../../components/settings/useDarkMode";
export interface HeaderProps {
    isConnected? : boolean;
}

const Header = ({isConnected} : HeaderProps) => {
    const [ t, i18n ] = useTranslation();
    const [theme, setTheme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    i18n;
    setTheme;

    return (
    <div className='header-div' style={{zIndex: 1000,left: '0px', top: '0px', width:'100%', height: '80px', position:'sticky', display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '10px'}}>
        <a href={"login"}><img
            style={{left: '20px', marginLeft: "10px", height: '60px', width: '60px', marginRight: '10px'}}
          src={`/images/${tmpTheme}/soto_round_logo_${tmpTheme}.png`}
          className={"roundLogo"}
          /></a>
        <h2>{t('baseline')}</h2>
        {isConnected &&
        <div style={{marginLeft:'auto', display:"flex"}}>
            <p style={{marginRight: "10px"}}>Justin D. Beauchemin</p>
            <a href="profile" className={"profile-icon"}>
                <FontAwesomeIcon style={{height: '60px', width: '60px'}} icon={faUser}></FontAwesomeIcon>
            </a>
        </div>
        }
        {!isConnected &&             
            <a href="profile" className={"profile-icon"} style={{marginLeft:"auto"}}>
                <FontAwesomeIcon style={{height: '60px', width: '60px'}} icon={faUser}></FontAwesomeIcon>
            </a>}
    </div>);
};

export default Header