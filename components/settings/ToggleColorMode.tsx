import ToggleColorModeProps from "./ToggleColorModeInterface";
import Switch from "@mui/material/Switch";
import React from "react";

const ToggleColorMode = ({ theme, toggleTheme }: ToggleColorModeProps) => {
    const isLight = theme === "light";

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <img
                src={`/images/${theme}/sun.png`}
                style={{ width: "25px", height: "25px" }}
                alt={"lightMode"}
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
                alt={"darkMode"}
            />
        </div>
    );
};

export default ToggleColorMode;
