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
import Footer from 'components/global/Footer';
import { Product, useCartLazyQuery, useAddToCartMutation, useOldCartsQuery, Cart } from 'typing';

const AddToBasketFromHistory = (oldCart: Cart/*, basket: Product[]*/, cartQueryRefetch: any, addToCartMutation: any) => {

    oldCart.products.map((item) => {
        for (let i = 0; i < item.itemQuantity!; i++) {
            addToCartMutation(item.id);
            console.log("Adding from history")
        }
    });
    cartQueryRefetch();
}

const ShopPage = () => {
    const [theme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    let lng: string | null = 'fr';
    if (typeof window !== 'undefined') {
        lng = localStorage.getItem('lng');
        if (lng == null) {
            localStorage.setItem('lng', 'fr');
        }
    }
    const [t] = useTranslation();

    const [loadHistory, setLoadHistory] = useState(false);

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

    const [cartQuery, { called, loading, data, error, refetch }] = useCartLazyQuery();
    const [basket, setBasket] = useState<Product[]>([]);
    const [isBasketUpToDate, setIsBasketUpToDate] = useState(false);

    if (loading && isBasketUpToDate) {
        setIsBasketUpToDate(false);
    }
    if (called == false) {
        cartQuery();
    }

    if (data && data.cart && !isBasketUpToDate && !loading) {
        setIsBasketUpToDate(true);
        setBasket(data.cart.products)
    } else if (error) {
        console.log(error.message);
    }

    const [isAnyItem, setIsAnyItem] = useState<boolean>(false);
    if (basket.length != 0 && !isAnyItem) {
        setIsAnyItem(true);
    }

    let oldCart: undefined | Cart = undefined;

    useEffect(() => {
        if (window != null && sessionStorage.getItem('cart')) {
            let jsonString: any = sessionStorage.getItem('cart');
            oldCart = JSON.parse(jsonString);
            console.log(oldCart)
            setLoadHistory(true);
            sessionStorage.removeItem('cart');
        }

    }, []);


    const [addToCartMutation, { }] = useAddToCartMutation({
        variables: {
            productId: "1"
        },
    });

    if (loadHistory && oldCart != undefined) {
        AddToBasketFromHistory(oldCart!/*, basket*/, refetch, addToCartMutation);
        setLoadHistory(false);
    }

    const { data: oldCartsData, loading: oldCartsLoading, error: oldCartsError } = useOldCartsQuery({
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

    return (
        <DarkModeParent theme={tmpTheme}>
            <Header />
            <Grid container justify="center" style={{ marginTop: '10px', maxHeight: "80vh" }}>
                <Grid item xs={4}>
                    <SearchWrapper cartQueryRefetch={refetch} setIsBasketUpToDate={setIsBasketUpToDate} />
                </Grid>
                <Grid item xs={12}>
                    <PriceBanner basket={basket} cartQueryRefetch={refetch} setIsBasketUpToDate={setIsBasketUpToDate} />
                </Grid>
                <Grid item xs={12}>
                    <Tooltip TransitionComponent={Zoom} title={t("shop.tooltip.label").toString()}>
                        <HelpOutlineIcon style={{ color: 'grey', marginLeft: '10px', marginTop: '10px' }} />
                    </Tooltip>
                    {/* <Button onClick={() => clearCartMutation()} color="secondary">
                <Typography>Clear cart</Typography>
              </Button> */}
                </Grid>
                <Grid item xs={12} style={{ overflowY: "auto", maxHeight: "60vh" }}>
                    <ShopList basket={basket} cartQueryRefetch={refetch} setIsBasketUpToDate={setIsBasketUpToDate} />
                </Grid>
            </Grid>
            {cartHistory &&
                <HistoryShortCut cartHistory={cartHistory!} basket={basket} setBasket={setBasket}
                    cartQueryRefetch={refetch} />
            }
            <Footer />
        </DarkModeParent>
    );
};

export default ShopPage;