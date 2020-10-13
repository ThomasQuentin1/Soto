import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    firstColor: string,
    secondaryColor: string;
    thirdColor: string;
    text: string,
    toggleBorder: string,
    gradient: string,
    border : {
      color: string;
    },
  }
}