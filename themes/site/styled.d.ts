import 'styled-components'

// don't forget to add here the type of all properties, or the site will not be able to launch
declare module 'styled-components' {
  export interface DefaultTheme {
    firstColor: string,
    secondary: {
      main: string;
      background: string;
    };
    thirdColor: string;
    body: string,
    header: string,
    footer: string,
    text: string,
    toggleBorder: string,
    hover: string,
    gradient: string,
    disabled: string,
    border: {
      color: string,
    }
    divider: string
  }
}