import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {Cart, Product} from 'typing'
import {useTranslation} from "react-i18next";
import {CardMedia} from "@material-ui/core";
import {FiberManualRecord} from "@material-ui/icons";
import {selectColor} from "../../styles/globalStyle";

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

const HistoryItem = ({cart}: HistoryItemProps) => {
    const [t] = useTranslation()
    const [isDetailsToggled, setIsDetailsToggled] = useState(false);
    const totalOfProducts = GetTotalOfProducts(cart.products);

    function formatDate(date: Date) {
        return (t("label.boughtOn") + date.getDate() + ' ' + t(months[date.getMonth()]) + " " + date.getFullYear()
            + " " + t("label.at") + " " + getHoursAndMinutes(date));
    }

    const formatedDate = formatDate(new Date(cart.dateCreated));
    if (!cart)
        return <p>Invalid cart</p>;
    return (
        <Grid item xs={12} md={9}>
            <Grid container style={{padding: '10px 20px'}} className="history_item">
                <Grid item xs={12} style={{marginBottom: '5px'}} className="flexSpaceBetween">
                    <Typography variant="h6">{formatedDate} - {cart.shop.name}</Typography>
                    <Typography variant="h6">Vous avez payé : {cart.price}€</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Total de produits commandés : {totalOfProducts}</Typography>
                </Grid>
                {isDetailsToggled &&
                <Grid item xs={12}>
                    <Grid container direction='row' justify='space-evenly' wrap='wrap' style={{paddingTop: '20px'}}
                          spacing={2}>
                        {cart.products.map((item, index) => {
                            return (
                                <Grid item key={index} xs={12} sm={12} md={12} lg={6} xl={4}
                                      className={"flexSpaceEvenly"}>
                                    <div style={{width: "25%", height: "100%"}}>
                                        <CardMedia
                                            style={{width: '100%', height: '100%'}}
                                            image={item.photo ?? "error"}>
                                        </CardMedia>
                                    </div>
                                    <div>
                                        <Typography>{item.name}</Typography>
                                        <Typography>Quantité : {item.itemQuantity}</Typography>
                                        <Typography>Prix : {Number(item.priceUnit).toFixed(2)} €</Typography>
                                        <div className="dFlex">
                                            <Typography>Score total : {item.scoreHealth}</Typography>
                                            <FiberManualRecord htmlColor={selectColor(Number(item.scoreHealth), false)}/>
                                        </div>
                                    </div>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>}
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Grid container justify='space-between'>
                            <Button onClick={() => setIsDetailsToggled(!isDetailsToggled)}>
                                {!isDetailsToggled &&
                                <>
                                    Plus
                                    <ExpandMoreIcon/>
                                </>
                                }
                                {isDetailsToggled &&
                                <>
                                    Moins
                                    <ExpandLessIcon/>
                                </>
                                }
                            </Button>
                            <Button color='secondary' onClick={() => {
                                sessionStorage.setItem('cart', JSON.stringify(cart));
                            }} href='/shop'>Ajouter au panier</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default HistoryItem;