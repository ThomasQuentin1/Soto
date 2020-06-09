import React from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from 'react-i18next';
import '../i18n'
import RightPanel from "components/encapsulationComponents/RightPanel";
import ToggleLanguage from "components/settings/ToggleLanguage";

const ProfilePage = () => {
  const [ t, i18n ] = useTranslation();

  i18n;
  return (
      <div style={{display:"flex", flexDirection:"row", height:"100%", width:"100%", alignItems:"center"}}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", flexGrow:8}}>
          <Button variant="contained" color="secondary">
          {t("buttonExample.label")}
          </Button>
        </div>
        <div style={{marginLeft:"30px", marginRight:"30px", fontSize:"1eh"}}>
            <p>{t('soto.description')}</p>
        </div>
        <RightPanel>
          <ToggleLanguage t={t}></ToggleLanguage>
        </RightPanel>
      </div>
  );
};

export default ProfilePage;