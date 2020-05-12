import React from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from 'react-i18next';
import '../i18n'
import RightPanel from "components/encapsulationComponents/RightPanel";
import ToggleLanguage from "components/settings/ToggleLanguage";
import ToggleColorMode from "../components/settings/ToggleColorMode";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";

const ProfilePage = () => {
const [theme, setTheme] = useDarkMode();
  const tmpTheme: string = theme.toString();
  const [ t, i18n ] = useTranslation();

  i18n;
  return (
    <DarkModeParent theme={tmpTheme}>
      <div style={{display:"flex", flexDirection:"row", height:"100%", width:"100%", alignItems:"center"}}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", flexGrow:8}}>
          <Button variant="contained" color="secondary">
          {t("buttonExample.label")}
          </Button>
        </div>
        <img
        src={`/images/${tmpTheme}/soto_round_logo_${tmpTheme}.png`}
        className={"roundLogo"}
      />
      <Button variant="contained" color="secondary">
        {"Button Theme example"}
      </Button>
        <div style={{marginLeft:"30px", marginRight:"30px", fontSize:"1eh"}}>
            <p>{t('soto.description')}</p>
        </div>
        <RightPanel>
          <ToggleLanguage t={t}></ToggleLanguage>
          <ToggleColorMode theme={theme} toggleTheme={setTheme}></ToggleColorMode>
        </RightPanel>
      </div>
    </DarkModeParent>
      
  );
};

export default ProfilePage;