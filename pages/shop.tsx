import React from "react";
import '../i18n'
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import SearchWrapper from "components/shop/SearchWrapper";
import ShopList from "components/shop/ShopList";
import Grid  from "@material-ui/core/Grid";

const ShopPage = () => {
    const [theme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    let lng : string | null = 'fr';
    if (typeof window !== 'undefined') {
      lng = localStorage.getItem('lng');
      if (lng == null) {
        localStorage.setItem('lng', 'fr');
      }
    }
    return (
        <DarkModeParent theme={tmpTheme}>
            {/* <Header></Header> */}
            <Grid container justify="center">
            <div>Hello</div>
              <Grid item xs={4}>
                <SearchWrapper/>
              </Grid>
              <Grid item xs={11}>
                <ShopList/>
              </Grid>
            </Grid>
            {/* <Footer></Footer> */}
        </DarkModeParent>
    );
};

export default ShopPage;