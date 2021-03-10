import React, { useState, useEffect } from "react";
import '../i18n'
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import SearchWrapper from "components/shop/SearchWrapper";
import ShopList from "components/shop/ShopList";
import { Grid, Tooltip, Zoom } from "@material-ui/core";
import PriceBanner from "components/shop/PriceBanner";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useTranslation } from "react-i18next"
import Header from 'components/global/Header';
import HistoryShortCut from 'components/history/HistoryShortCut';
import { Cart } from 'interfaces/Cart';
import Footer from 'components/global/Footer';
import { Product, useCartLazyQuery, useAddToCartMutation } from 'typing';
// import { notifySuccess, notifyError } from "public/notifications/notificationsFunctions";

const AddToBasketFromHistory = (oldCart: Cart, basket: Product[]) => {
    let newBasket : Product[] = [];

    basket.map((item) => newBasket.push(item));
    oldCart.products.map((item) => {
      const [addToCartMutation, {}] = useAddToCartMutation({
        variables: {
           productId: item.id
        },
      });
      for (let i = 0; i < item.itemQuantity; i++) {
        addToCartMutation();
      }
    });
}

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

  // const [clearCartMutation, { loading:clearCartLoading, error:errorClearCart, called:clearCartCalled }] = useClearCartMutation({
  //   variables: {
  //   },
  // });
  
  // if (errorClearCart) {
  //   notifyError("Failed to clear cart")
  //   console.error(errorClearCart.message)
  // } else if (!clearCartLoading && clearCartCalled) {
  //   notifySuccess("Cart cleared successfully")
  // }

  const [cartQuery, {called, data, error}] = useCartLazyQuery();
  const [basket, setBasket] = useState<Product[]>([]);
  const [isBasketUpToDate, setIsBasketUpToDate] = useState(false);
  if (called == false) {
    cartQuery();
  }
  
  if (data && data.cart && !isBasketUpToDate) {
    setIsBasketUpToDate(!isBasketUpToDate);
    setBasket(data.cart.products)
    console.log(basket)
  } else if (error) {
    console.log(error.message);
  }

  const [isAnyItem, setIsAnyItem] = useState<boolean>(false);
  if (basket.length != 0 && !isAnyItem) {
    setIsAnyItem(true);
  }

  let oldCart : Cart;
  useEffect(() => {
    if (window != null && window != undefined && sessionStorage.getItem('cart')) {
      let jsonString : any = sessionStorage.getItem('cart');
      oldCart = JSON.parse(jsonString);
      AddToBasketFromHistory(oldCart, basket);
      sessionStorage.removeItem('cart');
    }
  }, []);

  
  const cartHistory : Cart[] = [{shop: {name: 'Auchan', city: 'Strasbourg', long: 1, lat: 1, id:1, server:'null', code:'null'}, price: 55, dateCreated: new Date(), dateLastEdit: new Date(), products: [{name: 'Pain', brand: 'no name', scoreHealth: 20, quantity: 1, price: 1}, {name: 'Soda', brand: 'Coca-cola', scoreHealth: 1, quantity: 2, price: 1}, {name: 'Pâtes', brand: 'Barilla', scoreHealth: 100, quantity: 25, price: 2}, {name: 'Sauce tomate', brand: 'no name', scoreHealth: 50, quantity: 1, price: 1}]}, {shop: {name: 'Auchan', city: 'Strasbourg', long: 1, lat: 1, id:1, server:'null', code:'null'}, price: 55, dateCreated: new Date(), dateLastEdit: new Date(), products: [{name: 'Pain', brand: 'no name', scoreHealth: 20, quantity: 1, price: 1}, {name: 'Soda', brand: 'Coca-cola', scoreHealth: 1, quantity: 2, price: 1}, {name: 'Pâtes', brand: 'Barilla', scoreHealth: 100, quantity: 25, price: 2}, {name: 'Sauce tomate', brand: 'no name', scoreHealth: 50, quantity: 1, price: 1}]}, {shop: {name: 'Auchan', city: 'Strasbourg', long: 1, lat: 1, id:1, server:'null', code:'null'}, price: 55, dateCreated: new Date(), dateLastEdit: new Date(), products: [{name: 'Pain', brand: 'no name', scoreHealth: 20, quantity: 1, price: 1}, {name: 'Soda', brand: 'Coca-cola', scoreHealth: 1, quantity: 2, price: 1}, {name: 'Pâtes', brand: 'Barilla', scoreHealth: 100, quantity: 25, price: 2}, {name: 'Sauce tomate', brand: 'no name', scoreHealth: 50, quantity: 1, price: 1}]}];

  return (
      <DarkModeParent theme={tmpTheme}>
          <Header/>
          <Grid container justify="center" style={{marginTop: '10px'}}>
            <Grid item xs={4}>
              <SearchWrapper cartQuery={cartQuery}/>
            </Grid>
            <Grid item xs={12}>
              <PriceBanner basket={basket}/>
            </Grid>
            <Grid item xs={12}>
              <Tooltip TransitionComponent={Zoom} title={t("shop.tooltip.label").toString()}>
                <HelpOutlineIcon style={{color:'grey', marginLeft:'10px', marginTop:'10px'}}></HelpOutlineIcon>
              </Tooltip>
              {/* <Button onClick={() => clearCartMutation()} color="secondary">
                <Typography>Clear cart</Typography>
              </Button> */}
            </Grid>
            <Grid item xs={12}>
              <ShopList basket={basket} cartQuery={cartQuery}/>
            </Grid>
          </Grid>
          <HistoryShortCut cartHistory={cartHistory} basket={basket} setBasket={setBasket}/>
          {/* <Footer></Footer> */}
          <Footer changeStyle={isAnyItem}></Footer>
      </DarkModeParent>
  );
};

export default ShopPage;