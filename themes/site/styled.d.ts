import 'styled-components'

// don't forget to add here the type of all properties, or the site will not be able to launch
declare module 'styled-components' {
  export interface DefaultTheme {
    firstColor: string,
    secondaryColor: string;
    thirdColor: string;
    body: string,
    header: string,
    footer: string,
    text: string,
    toggleBorder: string,
    gradient: string,
    border: {
      color: string,
    }
  }
}