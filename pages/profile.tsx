import React, {useEffect} from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from 'react-i18next';
import '../i18n'
import RightPanel from "components/encapsulationComponents/RightPanel";
import ToggleLanguage from "components/settings/ToggleLanguage";
import ToggleColorMode from "../components/settings/ToggleColorMode";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

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
  const [theme, setTheme] = useDarkMode();
  const tmpTheme: string = theme.toString();


  i18n;
  return (
    <DarkModeParent theme={tmpTheme}>
      <Header></Header>
      <div style={{display:"flex", flexDirection:"row", height:"100%", width:"100%", alignItems:"center"}}>
        <div id="example-features">
          <div>
            <Button variant="contained" color="secondary">
              {t("buttonExample.label")}
            </Button>
          </div>
          <img
          src={`/images/${tmpTheme}/soto_round_logo_${tmpTheme}.png`}
          className={"roundLogo"}
          />
        </div>
        <div style={{marginLeft:"30px", marginRight:"30px", fontSize:"1eh"}}>
          <p>{t('soto.description')}</p>
        </div>
        <RightPanel>
          <ToggleLanguage t={t}></ToggleLanguage>
          <ToggleColorMode theme={theme} toggleTheme={setTheme}></ToggleColorMode>
        </RightPanel>
      </div>
      <Footer></Footer>
    </DarkModeParent>
      
  );
};

export default ProfilePage;