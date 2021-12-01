import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Cart, Product } from 'typing'
import { useTranslation } from "react-i18next";
import { CardMedia } from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";
import { selectColor } from "../../styles/globalStyle";
import { TFunction } from "i18next";

export const months = [
    'label.january.short',
    'label.february.short',
    'label.march.short',
    'label.april.short',
    'label.may.short',
    'label.june.short',
    'label.july.short',
    'label.august.short',
    'label.september.short',
    'label.october.short',
    'label.november.short',
    'label.december.short'];

interface HistoryItemProps {
    cart: Cart;
    t: TFunction
}

const GetTotalOfProducts = (products: Product[]) => {
    let total: number = 0;
    products.map((item: Product) => {
        total += item.itemQuantity!;
    });
    return total;
}

function getHoursAndMinutes(date: Date) {
    const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    return hours + ":" + minutes
}

const AddToBasketAndSessionStorage = (cartToAdd: Cart) => {

    let jsonString: any = sessionStorage.getItem('currentCart');
    let cart = JSON.parse(jsonString) ?? [];

    let newCart: Product[] = [];

    cartToAdd.products.forEach((itemToAdd) => {
        let didNotFind = true;

        cart.forEach((itemInCart) => {
            if (itemInCart.id === itemToAdd.id) {
                didNotFind = false;
                let newItem = Object.assign({}, itemInCart);
                newItem.itemQuantity = itemInCart.itemQuantity + itemToAdd.itemQuantity;
                newCart.push(newItem);
            }
        })

        if (didNotFind)
            newCart.push(itemToAdd);
    })

    cart.forEach((itemOldCart) => {
        let isFound = false;
        newCart.forEach((itemNewCart) => {
            if (itemNewCart.id === itemOldCart.id) {
                isFound = true;
                return;
            }
        })

        if (isFound === false)
            newCart.push(itemOldCart);
    })

    sessionStorage.setItem('currentCart', JSON.stringify(newCart));
};

const HistoryItem = (props: HistoryItemProps) => {
    const [t] = useTranslation()
    const [isDetailsToggled, setIsDetailsToggled] = useState(false);
    const totalOfProducts = GetTotalOfProducts(props.cart.products);

    function formatDate(date: Date) {
        return (t("label.boughtOn") + date.getDate() + ' ' + t(months[date.getMonth()]) + " " + date.getFullYear()
            + " " + t("label.at") + " " + getHoursAndMinutes(date));
    }

    const formatedDate = formatDate(new Date(props.cart.dateCreated));
    if (!props.cart)
        return <p>Invalid cart</p>;
    return (
        <Grid item xs={12} md={9}>
            <Grid container style={{ padding: '10px 20px' }} className="history_item">
                <Grid item xs={12} style={{ marginBottom: '5px' }} className="flexSpaceBetween">
                    <Typography variant="h6">{formatedDate} - {props.cart.shop.name}</Typography>
                    <Typography variant="h6">{t("label.history.paid")} {props.cart.price}€</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{t("label.history.orderedProducts")} {totalOfProducts}</Typography>
                </Grid>
                {isDetailsToggled &&
                    <Grid item xs={12}>
                        <Grid container direction='row' justifyContent='space-evenly' wrap='wrap' style={{ paddingTop: '20px' }}
                            spacing={2}>
                            {props.cart.products.map((item, index) => {
                                return (
                                    <Grid item key={index} xs={12} sm={12} md={12} lg={6} xl={4}
                                        className={"flexSpaceEvenly"}>
                                        <div style={{ width: "25%", height: "100%" }}>
                                            <CardMedia
                                                style={{ width: '100%', height: '100%' }}
                                                image={item.photo ?? "error"}>
                                            </CardMedia>
                                        </div>
                                        <div>
                                            <Typography>{item.name}</Typography>
                                            <Typography>{t("label.quantity")} {item.itemQuantity}</Typography>
                                            <Typography>{t("label.price")} {Number(item.priceUnit).toFixed(2)} €</Typography>
                                            <div className="dFlex">
                                                <Typography>{t("label.score.final")} {item.scoreHealth}</Typography>
                                                <FiberManualRecord htmlColor={selectColor(Number(item.scoreHealth), false)} />
                                            </div>
                                        </div>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>}
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Grid container justifyContent='space-between'>
                            <Button onClick={() => setIsDetailsToggled(!isDetailsToggled)}>
                                {!isDetailsToggled &&
                                    <>
                                        {t("label.showMore")}
                                        <ExpandMoreIcon />
                                    </>
                                }
                                {isDetailsToggled &&
                                    <>
                                        {t("label.showLess")}
                                        <ExpandLessIcon />
                                    </>
                                }
                            </Button>
                            <Button color='secondary' onClick={() => {
                                AddToBasketAndSessionStorage(props.cart);
                            }} href='/shop'>{t("label.addToCart")}</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default HistoryItem;