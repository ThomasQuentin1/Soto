import React from 'react';
import ToggleColorMode from '../components/settings/ToggleColorMode';
import { useDarkMode } from "../components/settings/useDarkMode";

const ContainToggleColorMode = () => {
  const [theme, setTheme] = useDarkMode();

    return (<ToggleColorMode theme={theme} toggleTheme={setTheme}></ToggleColorMode>)
}

export default ContainToggleColorMode;