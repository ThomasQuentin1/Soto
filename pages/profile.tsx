import React from "react";
import { useDarkMode } from "../components/settings/useDarkMode";
import { Button } from "@material-ui/core";
import ToggleColorMode from "../components/settings/ToggleColorMode";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";

const ProfilePage = () => {
  const [theme, setTheme] = useDarkMode();
  const tmpTheme: string = theme.toString();

  return (
    <DarkModeParent theme={tmpTheme}>
      <img
        src={`/images/${tmpTheme}/soto_round_logo_${tmpTheme}.png`}
        className={"roundLogo"}
      />
      <Button variant="contained" color="secondary">
        {"Button Theme example"}
      </Button>
      <ToggleColorMode theme={theme} toggleTheme={setTheme}></ToggleColorMode>
    </DarkModeParent>
  );
};

export default ProfilePage;
