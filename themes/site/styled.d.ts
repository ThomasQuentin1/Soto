import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    body: string,
    header: string,
    text: string,
    toggleBorder: string,
    gradient: string,
    border: {
      color: string,
    }
  }
}