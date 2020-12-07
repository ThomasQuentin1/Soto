import React, { useState } from "react";
import '../i18n'
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import SearchWrapper from "components/shop/SearchWrapper";
import ShopList from "components/shop/ShopList";
import Grid from "@material-ui/core/Grid";
import CountableProduct from "interfaces/CountableProduct";
import PriceBanner from "components/shop/PriceBanner";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useTranslation } from "react-i18next"
import Header from 'components/global/Header';
import Footer from 'components/global/Footer';

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
  // const [basket, setBasket] = useState<Product[]>([{name: 'Pain', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'https://www.moneyvox.fr/i/media/05l/005991lb54.jpg', price: 2.47, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}, {name: 'Pâtes', brand: 'Barilla', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'Semoule de blé dur, eau. peut contenir des traces de soja.', manual: 'no name', numberOfProduct: 1, picture: 'https://images-na.ssl-images-amazon.com/images/I/41AsfNVKjAL._AC_SY400_.jpg', price: 1, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 50}, {name: 'Pesto', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'https://i1.wp.com/www.mygusto.co.uk/wp-content/uploads/2020/03/0024839.jpg?fit=700%2C700&ssl=1', price: 11.01  , productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}, {name: 'no name', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'no name', price: 1, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}, {name: 'no name', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'no name', price: 1, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}, {name: 'no name', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'no name', price: 1, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}, {name: 'no name', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'no name', price: 1, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}, {name: 'no name', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'no name', price: 1, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}, {name: 'no name', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'no name', price: 1, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}, {name: 'no name', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'no name', price: 1, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}]);
  const [basket, setBasket] = useState<CountableProduct[]>([]);
  
  return (
      <DarkModeParent theme={tmpTheme}>
          <Header></Header>
          <Grid container justify="center" style={{marginTop: '10px'}}>
            <Grid item xs={4}>
              <SearchWrapper basket={basket} setBasket={setBasket}/>
            </Grid>
            <Grid item xs={12}>
              <PriceBanner basket={basket}></PriceBanner>
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
          <Footer></Footer>
      </DarkModeParent>
  );
};

export default ShopPage;