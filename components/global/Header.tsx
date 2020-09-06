import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import { useDarkMode } from "../../components/settings/useDarkMode";

const Header = () => {
    const [ t, i18n ] = useTranslation();
    const [theme, setTheme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    i18n;
    setTheme;

    return (
    <div className='header-div' style={{zIndex: 1000,left: '0px', top: '0px', width:'100%', height: '80px', position:'sticky', display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '10px'}}>
        <img
            style={{height: '60px', width: '60px', marginRight: '10px'}}
          src={`/images/${tmpTheme}/soto_round_logo_${tmpTheme}.png`}
          className={"roundLogo"}
          />
        <h2>{t('baseline')}</h2>
        <FontAwesomeIcon style={{marginLeft: 'auto', height: '60px', width: '60px'}} icon={faUser}></FontAwesomeIcon>
    </div>);
};

export default Header