import React from "react";
// import NoSsr from "@material-ui/core/NoSsr";
// import {
//   ThemeProvider as ThemeProviderMui,
//   Theme,
// } from "@material-ui/core/styles";
import { ThemeProvider as ThemeProviderMainStyle } from "styled-components";
import { useDarkMode } from "../settings/useDarkMode";
import muiDarkTheme from "../../themes/mui/mainDarkTheme";
import muiLightTheme from "../../themes/mui/mainLightTheme";
import GlobalStyles from "../../styles/globalStyle";
import lightTheme from "../../themes/site/lightTheme";
import darkTheme from "../../themes/site/darkTheme";
import {Theme, ThemeProvider as ThemeProviderMui} from "@mui/material";

interface DarkModeParentInterface {
  theme?: string;
  children?: any;

  isInSetting?: boolean;
}

export const getColorMode = () => {
  const [theme] = useDarkMode();

  if (theme === "dark") {
    return muiDarkTheme;
  } else {
    return muiLightTheme;
  }
};

const DarkModeParent = (props: DarkModeParentInterface) => {
  const [theme] = useDarkMode();
  let realTheme = props.theme ? props.theme : theme;
  let muiThemeMode: any = null;
  let siteThemeMode: any = null;

  muiThemeMode = realTheme === "light" ? muiLightTheme : muiDarkTheme;
  siteThemeMode = realTheme === "light" ? lightTheme : darkTheme;

  return (
    // <NoSsr>
      <ThemeProviderMainStyle theme={siteThemeMode}>
        <GlobalStyles />
        <ThemeProviderMui<Theme> theme={muiThemeMode}>
          {props.children}
        </ThemeProviderMui>
      </ThemeProviderMainStyle>
    // </NoSsr>
  );
};

export default DarkModeParent;
