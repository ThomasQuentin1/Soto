import React, { useEffect, useState } from "react";
import '../i18n';
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import SearchWrapper from "components/shop/SearchWrapper";
import ShopList from "components/shop/ShopList";
import Grid from "@material-ui/core/Grid";
import PriceBanner from "components/shop/PriceBanner";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useTranslation } from "react-i18next"
import Header from 'components/global/Header';
import Footer from 'components/global/Footer';
import { Product, useCartLazyQuery } from 'typing';

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
  const [t] = useTranslation();

  // get the current cart of 
  const [cartQuery, {called, data, error}] = useCartLazyQuery();
  const [basket, setBasket] = useState<Product[]>([]);
  const [isBasketUpToDate, setIsBasketUpToDate] = useState(false);
  if (called == false) {
    cartQuery();
  }
  
  if (data && data.cart && !isBasketUpToDate) {
    setIsBasketUpToDate(!isBasketUpToDate);
    console.log(data)
    setBasket(data.cart.products)
    console.log(basket)
  } else if (error) {
    console.log(error.message);
  }

  const [isAnyItem, setIsAnyItem] = useState<boolean>(false);
  if (basket.length != 0 && !isAnyItem) {
    setIsAnyItem(true);
  }
  
  return (
      <DarkModeParent theme={tmpTheme}>
          <Header/>
          <Grid container justify="center" style={{marginTop: '10px'}}>
            <Grid item xs={4}>
              <SearchWrapper basket={basket} setBasket={setBasket}/>
            </Grid>
            <Grid item xs={12}>
              <PriceBanner basket={basket}/>
            </Grid>
            <Grid item xs={12}>
              <Tooltip TransitionComponent={Zoom} title={t("shop.tooltip.label").toString()}>
                <HelpOutlineIcon style={{color:'grey', marginLeft:'10px', marginTop:'10px'}}></HelpOutlineIcon>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <ShopList basket={basket} setBasket={setBasket}/>
            </Grid>
          </Grid>
          <Footer changeStyle={isAnyItem}></Footer>
      </DarkModeParent>
  );
};

export default ShopPage;