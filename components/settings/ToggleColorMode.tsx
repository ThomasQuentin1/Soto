import ToggleColorModeProps from "./ToggleColorModeInterface";
import Switch from "@material-ui/core/Switch";

const ToggleColorMode = ({ theme, toggleTheme }: ToggleColorModeProps) => {
  const isLight = theme === "light";
  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      <Switch
        checked={!isLight}
        onChange={toggleTheme}
        name="colorMode"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
      <p>{isLight ? "Light mode is used" : "Dark mode is used"}</p>
    </div>
  );
};

export default ToggleColorMode;
