import React, { useState, useEffect } from "react";
import '../i18n'
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import SearchWrapper from "components/shop/SearchWrapper";
import ShopList from "components/shop/ShopList";
import { Grid, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next"
import Header from 'components/global/Header';
import HistoryShortCut from 'components/history/HistoryShortCut';
import Footer from 'components/global/Footer';
import { Product, useAddToCartMutation, useOldCartsQuery, Cart } from 'typing';
import { List } from 'pages/lists';
// import {Grid} from "@mui/material";

const AddToBasketFromHistory = (oldCart: Cart/*, basket: Product[]*/, addToCartMutation: any) => { //TODO with new basket system

    oldCart.products.map((item) => {
        for (let i = 0; i < item.itemQuantity!; i++) {
            addToCartMutation(item.id);
            console.log("Adding from history")
        }
    });
}

const RemoveFromBasketAndSessionStorage = (product: Product, basket: Product[], setBasket: any) => {
    let newBasket: Product[] = [];

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
    let newBasket: Product[] = [];
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

const AddFromFavList = (listToAdd: List, basket: Product[], setBasket: any) => {
    let newBasket: Product[] = [];
    basket.map((item) => {
        let quantity = 0;
        // if there is the same id in the listToAdd, just add its quantity to cbefore adding to basket
        listToAdd.products.map((itemToAdd) => {
            if (item.id == itemToAdd.id) {
                if (itemToAdd.itemQuantity != undefined)
                    quantity = itemToAdd.itemQuantity;
            }
        })
        let newItem = Object.assign({}, item);
        if (newItem.itemQuantity != undefined)
            newItem.itemQuantity += quantity;
        newBasket.push(newItem);
    });
    listToAdd.products.map((item) => {
        let alreadyFoundInBasket = false;
        basket.map((basketItem) => {
            if (item.id === basketItem.id)
                alreadyFoundInBasket = true;
        });
        if (!alreadyFoundInBasket)
            newBasket.push(item);
    });

    setBasket(newBasket);
    sessionStorage.setItem('currentCart', JSON.stringify(newBasket));
}

const ShopPage = () => {
    // @ts-ignore
    const [t, i18n] = useTranslation();
    const [theme, SetTheme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('lng') == null)
            localStorage.setItem('lng', 'fr');
        useEffect(() => {
            i18n.changeLanguage(localStorage.getItem('lng') as string).then()
        }, []);
    }

    const [loadHistory, setLoadHistory] = useState(false);
    const [basket, setBasket] = useState<Product[]>([]);
    const [isAnyItem, setIsAnyItem] = useState<boolean>(false);
    if (basket.length != 0 && !isAnyItem) {
        setIsAnyItem(true);
    }

    let oldCart: undefined | Cart = undefined;

    useEffect(() => {
        if (window != null) {
            let tmpBasket: Product[] = [];

            if (sessionStorage.getItem('cart')) {
                let jsonString: any = sessionStorage.getItem('cart');
                oldCart = JSON.parse(jsonString);
                console.log(oldCart)
                setLoadHistory(true);
                sessionStorage.removeItem('cart');
            }
            if (sessionStorage.getItem('currentCart')) {
                let jsonString: any = sessionStorage.getItem('currentCart');
                let currentCart: any = JSON.parse(jsonString);
                tmpBasket = currentCart;
                console.log(currentCart);
                setBasket(currentCart);
            }
            if (localStorage.getItem('listfavToAdd')) {
                let jsonString: any = localStorage.getItem('listfavToAdd');
                let favlist: List = JSON.parse(jsonString);
                localStorage.removeItem('listfavToAdd');
                if (basket.length === 0)
                    AddFromFavList(favlist, tmpBasket, setBasket);
                else
                    AddFromFavList(favlist, basket, setBasket);
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
    }, []);

    const [addToCartMutation, { }] = useAddToCartMutation({
        variables: {
            productId: "1"
        },
    });

    if (loadHistory && oldCart != undefined) {
        AddToBasketFromHistory(oldCart!/*, basket*/, addToCartMutation);
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
            <Header  {...{ theme, SetTheme }} />
            <Grid container justifyContent="center" style={{ marginTop: '10px' }}>
                <Grid item xs={4}>
                    <SearchWrapper AddToCart={AddToBasketAndSessionStorage} basket={basket} setBasket={setBasket} />
                </Grid>
            </Grid>
            <Grid item xs={12} style={{ overflowY: "auto", maxHeight: "60vh" }}>
                <ShopList AddToCart={AddToBasketAndSessionStorage} basket={basket} setBasket={setBasket} RemoveFromCart={RemoveFromBasketAndSessionStorage} />
            </Grid>
            {
                cartHistory &&
                <HistoryShortCut cartHistory={cartHistory!} basket={basket} setBasket={setBasket} />
            }
            <Grid container justifyContent='flex-end' style={{ position: 'fixed', top: '90px', left: '0px', width: 'auto' }}>
                <Grid item style={{ position: 'relative', justifyContent: 'flex-end' }}>
                    <Button style={{ marginLeft: '20px' }} variant={"outlined"} color='secondary' href='/discounts'>
                        <Typography
                            variant='caption'>Discounts
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
            <Footer />
        </DarkModeParent >
    );
}

export default ShopPage;