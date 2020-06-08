import ToggleColorModeProps from "./ToggleColorModeInterface";
import Switch from "@material-ui/core/Switch";

const ToggleColorMode = ({ theme, toggleTheme, t }: ToggleColorModeProps) => {
  const isLight = theme === "light";
  return (
      <div style={{display:"flex", flexDirection:"row"}}>
        <Switch
          checked={!isLight}
          onChange={toggleTheme}
          name="colorMode"
          inputProps={{ "role": "switch" }}
        />
        <p>{isLight ? t("lightmode.label") : t("darkmode.label")}</p>
      </div>
  );
};

export default ToggleColorMode;
