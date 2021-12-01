import { Button } from "@mui/material";
import { i18n } from '../../i18n';

interface ToggleLanguageInterface {
    t:any;
}

const ToggleLanguage = ({t} : ToggleLanguageInterface) => {
    return (
    <div>
        <Button variant="contained" color="secondary" onClick={() => {
            let lng = localStorage.getItem('lng');
            if (lng == 'en') {
                i18n.changeLanguage('fr')
                localStorage.setItem('lng', 'fr');
            } else {
                i18n.changeLanguage('en')
                localStorage.setItem('lng', 'en');
            }
      }}>{t("changeLanguageButton.label")}</Button>
    </div>);
}

export default ToggleLanguage;