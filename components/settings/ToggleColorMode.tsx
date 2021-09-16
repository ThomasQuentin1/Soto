import ToggleColorModeProps from "./ToggleColorModeInterface";
import Switch from "@material-ui/core/Switch";
// import { useTranslation } from 'react-i18next'
import React from "react";

const ToggleColorMode = ({ theme, toggleTheme }: ToggleColorModeProps) => {
    // const {t, i18n} = useTranslation();
    const isLight = theme === "light";
    // i18n;

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <img
                src={`/images/${theme}/sun.png`}
                style={{ width: "25px", height: "25px" }}
                // className={"flagLogo"}
                alt={"lightMode"}
            // onClick={() => {
            //     changeLang(lang)}
            // }
            />
            <Switch
                checked={!isLight}
                onChange={toggleTheme}
                name="colorMode"
                inputProps={{ "aria-label": "secondary checkbox" }}
            />
            <img
                src={`/images/${theme}/moon.png`}
                style={{ width: "25px", height: "25px" }}
                // className={"flagLogo"}
                alt={"darkMode"}
            // onClick={() => {
            //     changeLang(lang)}
            // }
            />
        </div>
    );
};

export default ToggleColorMode;
