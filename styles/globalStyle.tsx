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
    background: ${({ theme }) => theme.firstColor};
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    //font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-family: Arial, Helvetica, sans-serif;
    transition: all 0.25s linear;
  }
  
  .halfWidth {
    width: 50%
  }
  
  .flexAlignJustifyCentered {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  
  
  .centered {
    display: flex;
    flex-direction: column;
    margin: 10px auto;
  }

  #example-features {
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
  }

  #parent-login-form {
    background: ${({ theme }) => theme.firstColor};
    color : ${({ theme }) => theme.text};
  }

  .right_panel {
    border-left: 1px solid black;
    height: 100%;
    padding-left: 30px;
  }

  .roundLogo {
      width: 100px;
      height: 100px;
      src: 
  }

  .header-div {
    background: ${({ theme }) => theme.header};
    border-bottom : solid 2px ${({ theme }) => theme.border.color};
  }

  .footer {
    background: ${({ theme }) => theme.footer};
    border-top : solid 2px ${({ theme }) => theme.border.color};
    margin-top: 50px;
  }

  .profile-icon {
    color: ${({ theme }) => theme.text};
  }

  a:link {
    text-decoration: none;
  }
  
  a:visited {
    text-decoration: none;
  }
  
  a:hover {
    cursor: pointer;
    //text-decoration: underline;
  }
  
  .footer-link {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
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
  

  .header_bar {
    width: 100%;
    height: 70px;
    background: ${({ theme }) => theme.firstColor};
  }

  .criteria_drag_list {
    //padding: 8px;
    //margin: 8px;
    list-style-type: none;
    color: ${({ theme }) => theme.text};
    font-family: Arial, Helvetica, sans-serif;
  }
  
  .criteria_drag_list_elem {
    padding: 8px;
    margin: 8px;
    border: 1px solid ${({ theme }) => theme.border.color};
    color: ${({ theme }) => theme.text};
    border-radius: 5px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .search_bar {
    color: ${({ theme }) => theme.text};
    font-family: Arial, Helvetica, sans-serif;
  }

  .price_banner {
    background-color: ${({ theme }) => theme.secondaryColor}
  }

  /* SHOP */

  .item_shop {
    border: 1px solid ${({ theme }) => theme.border.color};
    background-color: ${({ theme }) => theme.secondaryColor};
    border-radius: 10px;
  }

  .item_search_bar {
    border: 1px solid ${({ theme }) => theme.border.color};
    background-color: ${({ theme }) => theme.secondaryColor};
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
  }

  .icons {
    color: ${({theme}) => theme.text}
  }
  
  .flexWidthFull {
    display: flex;
    width: 100%;
  }
  
  .padding1020 {
    padding: 10px 20px;
  }
  
  .cell {
    //margin: 10px;
    display: flex;
  }
  
  .cellDivider {
    border-top: 1px solid;
    //width: 99%
  }
  
  .cell :hover {
    cursor: pointer;
    background: ${({ theme }) => theme.hover};
  }
  
  .cellTitle {
    font-size: 1rem;
  }
  
  .cellValue {
    font-size: 0.875rem;
    color: #5f6368;
  }
  
  .MuiPaper-root {
    color: inherit !important;
    background: inherit !important;
  }
  
  .MuiTypography-root {
    align-self: center;
  }

  .marginBottom50px {
    margin-bottom: 50px !important;
  }
  .marginB20px {
    margin-bottom: 20px !important;
  }
  .marginV10H0px {
    margin: 10px 0px !important;
  }
  
  .padRight10 {
    padding-right: 10px;
  }
  .pad5 {
    padding: 5px;
  }
  
  .dFlex {
    display: flex;
  }

  .flexDirCol {
    display: flex;
    flex-direction: column;
  }
  
  .flexDirRow {
    display: flex;
    flex-direction: row;
  }
  
  .alignCenter {
    align-content: center;
    align-items: center;
    align-self: center;
  }
  
  /* END SHOP */

  /* HISTORY */
  
  .history_short_cut_list {
    border: 1px solid ${({ theme }) => theme.border.color};
    border-radius: 10px;
    background-color: ${({ theme }) => theme.secondaryColor};
    opacity : 0.9;
  }

  .history_short_cut_item {
    border-bottom: 1xp solid ${({ theme }) => theme.border.color};
  }

  .history_item {
    border: 1px solid ${({ theme }) => theme.border.color};
    transition: all 1s linear;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.secondaryColor};
    margin-bottom: 10px;
    margin-left: 10px;
    padding-top: 10px;
  }
  
  .grid_short_cut_toggled_position {
    width: 100px;
  }

  .grid_short_cut_not_toggled_position {
    width: 0px;
  }
  
  /* END HISTORY */

  .rightclass {
    left: 100vw;
    width: 0px;
  }

  .leftclass {
    width: 50px;
    left: 200px;
  }
  `;

export default GlobalStyles;