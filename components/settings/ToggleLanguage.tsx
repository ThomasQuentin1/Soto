import { Button } from "@material-ui/core";
import { i18n } from '../../i18n';

interface ToggleLanguageInterface {
    t:any;
}

const ToggleLanguage = ({t} : ToggleLanguageInterface) => {
    return (
    <div>
        {console.log(i18n.language)}
        <Button variant="contained" color="secondary" onClick={() => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')}>{t("changeLanguageButton.label")}</Button>
    </div>);
}

export default ToggleLanguage;