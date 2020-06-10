import ToggleColorModeProps from "./ToggleColorModeInterface";
import Switch from "@material-ui/core/Switch";
import { useTranslation } from 'react-i18next'

const ToggleColorMode = ({ theme, toggleTheme }: ToggleColorModeProps) => {
  const {t, i18n} = useTranslation();
  const isLight = theme === "light";
  i18n;

  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      <Switch
        checked={!isLight}
        onChange={toggleTheme}
        name="colorMode"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
      <p>{isLight ? t("lightmode.label") : t("darkmode.label")}</p>
    </div>
  );
};

export default ToggleColorMode;
