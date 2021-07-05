import React, {useState, useEffect} from "react";
import '../i18n'
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import {useDarkMode} from "../components/settings/useDarkMode";
import SearchWrapper from "components/shop/SearchWrapper";
import ShopList from "components/shop/ShopList";
import {Grid, Tooltip, Zoom} from "@material-ui/core";
import PriceBanner from "components/shop/PriceBanner";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {useTranslation} from "react-i18next"
import Header from 'components/global/Header';
import HistoryShortCut from 'components/history/HistoryShortCut';
import Footer from 'components/global/Footer';
import { Product, useAddToCartMutation, useOldCartsQuery ,Cart } from 'typing';

const AddToBasketFromHistory = (oldCart: Cart/*, basket: Product[]*/, addToCartMutation: any) => { //TODO with new basket system

    oldCart.products.map((item) => {
        for (let i = 0; i < item.itemQuantity!; i++) {
            addToCartMutation(item.id);
            console.log("Adding from history")
        }
    });
}

const RemoveFromBasketAndSessionStorage = (product: Product, basket: Product[], setBasket: any) => {
    let newBasket : Product[] = [];

    basket.map((item) => {
        if (item.id === product.id) {
            let tmpItem = Object.assign({}, item);
            if (tmpItem.itemQuantity != null || tmpItem.itemQuantity != undefined) {
                tmpItem.itemQuantity -= 1;
                if (tmpItem.itemQuantity > 0) {
                    newBasket.push(tmpItem);
                }
            }
        } else {
            newBasket.push(item);
        }
    });
    setBasket(newBasket);
    sessionStorage.setItem('currentCart', JSON.stringify(newBasket));
};

const AddToBasketAndSessionStorage = (product: Product, basket: Product[], setBasket: any) => {
    let newBasket : Product[] = [];
    let modifiedItsQuantity = false;

    basket.map((item) => {
        if (product.id === item.id) {
            let tmpItem = Object.assign({}, item);
            if (tmpItem.itemQuantity != null || tmpItem.itemQuantity != undefined) {
                tmpItem.itemQuantity += 1;
                newBasket.push(tmpItem);
                modifiedItsQuantity = true;
            } else {
                console.error("The item has no item.itemQuantity");
            }
        } else {
            newBasket.push(item);
        }
    });
    if (!modifiedItsQuantity)
        newBasket.push(product);
    setBasket(newBasket);
    sessionStorage.setItem('currentCart', JSON.stringify(newBasket));
};

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
    const [loadHistory, setLoadHistory] = useState(false);
    const [basket, setBasket] = useState<Product[]>([]);
    const [isAnyItem, setIsAnyItem] = useState<boolean>(false);
        if (basket.length != 0 && !isAnyItem) {
            setIsAnyItem(true);
    }

    let oldCart : undefined | Cart = undefined;
    
    useEffect(() => {
    if (window != null && window != undefined) {
        if (sessionStorage.getItem('cart')) {
            let jsonString : any = sessionStorage.getItem('cart');
            oldCart = JSON.parse(jsonString);
            console.log(oldCart)
            setLoadHistory(true);
            sessionStorage.removeItem('cart');
        }
        if (sessionStorage.getItem('currentCart')) {
            let jsonString : any = sessionStorage.getItem('currentCart');
            let currentCart : any = JSON.parse(jsonString);
            setBasket(currentCart);
            sessionStorage.removeItem('currentCart');
        }
    }
  }, []);

    useEffect(() => {
        if (window != null && sessionStorage.getItem('cart')) {
            let jsonString: any = sessionStorage.getItem('cart');
            oldCart = JSON.parse(jsonString);
            console.log(oldCart)
            setLoadHistory(true);
            sessionStorage.removeItem('cart');
        }

  if (loadHistory && oldCart != undefined) {
    AddToBasketFromHistory(oldCart!/*, basket*/, addToCartMutation);
    setLoadHistory(false);
  }


    const [addToCartMutation, {}] = useAddToCartMutation({
        variables: {
            productId: "1"
        },
    });

    if (loadHistory && oldCart != undefined) {
        AddToBasketFromHistory(oldCart!/*, basket*/, refetch, addToCartMutation);
        setLoadHistory(false);
    }

    const {data: oldCartsData, loading: oldCartsLoading, error: oldCartsError} = useOldCartsQuery({
        variables: {},
    });


    const [cartHistory, setCartHistory] = useState<Cart[]>();

    if (oldCartsError) {
        console.log(oldCartsError)
    } else if (oldCartsData && !oldCartsLoading && !cartHistory) {
        if (oldCartsData.oldCarts) {
            setCartHistory(oldCartsData.oldCarts)
        }
    }
  }
  
  return (
      <DarkModeParent theme={tmpTheme}>
          <Header/>
          <Grid container justify="center" style={{marginTop: '10px', height: "80vh"}}>
            <Grid item xs={4}>
              <SearchWrapper AddToCart={AddToBasketAndSessionStorage} basket={basket} setBasket={setBasket}/>
            </Grid>
            <Grid item xs={12}>
              <PriceBanner basket={basket}/>
            </Grid>
            <Grid item xs={12}>
              <Tooltip TransitionComponent={Zoom} title={t("shop.tooltip.label").toString()}>
                <HelpOutlineIcon style={{color:'grey', marginLeft:'10px', marginTop:'10px'}}/>
              </Tooltip>
              {/* <Button onClick={() => clearCartMutation()} color="secondary">
                <Typography>Clear cart</Typography>
              </Button> */}
                </Grid>
            </Grid>
            <Grid item xs={12} style={{overflowY: "auto", maxHeight: "60vh"}}>
              <ShopList AddToCart={AddToBasketAndSessionStorage} basket={basket} setBasket={setBasket} RemoveFromCart={RemoveFromBasketAndSessionStorage}/>
            </Grid>
          </Grid>
          {cartHistory && 
            <HistoryShortCut cartHistory={cartHistory!} basket={basket} setBasket={setBasket}/>
          }
          <Footer/>
      </DarkModeParent>
  );
};

export default ShopPage;