import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  #__next {
    height: 100%;
    width: 100%;
  }

  body {
    align-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }

  #example-features {
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
  }

  #parent-login-form {
    background: ${({ theme }) => theme.body};
    color : ${({ theme }) => theme.text};
  }

  .right_panel {
    border-eft: 1px solid black;
    height: 100%;
    padding-left: 30px;
  }

  .roundLogo {
      width: 100px;
      height: 100px;
      src: 
  }
  
  .flagLogo {
    width: 50px;
    height: 50px;
    margin: 10px;
  }
  
  .textField {
    margin: 10px !important;
  }
  
  .MuiTypography-h5 {
    margin: 10px 0px !important;
  }
  
  `;

export default GlobalStyles;