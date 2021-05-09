import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Cart, Product } from 'typing'

// const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
// const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

interface HistoryItemProps {
    cart: Cart;
}

// const GetFormatedDate = (dateLastEdit: Date) => {
//     let formatedDate = days[dateLastEdit.getDay()] + ' ' + dateLastEdit.getDate() + ' ' + months[dateLastEdit.getMonth()];
//     return formatedDate;
// }
// to change
const GetTotalOfProducts = (products: Product[]) => {
    let total : number = 0;
    products.map((item: Product) => {
        total += item.itemQuantity!;
    });
    return total;
}

const HistoryItem = ({cart} : HistoryItemProps) => {
    const [isDetailsToggled, setIsDetailsToggled] = useState(false);
    // const formatedDate = GetFormatedDate(cart.dateLastEdit);
    const formatedDate = cart.dateCreated;
    const totalOfProducts = GetTotalOfProducts(cart.products);

    if (!cart)
        return <p>Invalid cart</p>;
    return (
        <Grid item className="history_item" xs={6}>
            <Grid container style={{paddingLeft:'50px'}}>
                <Grid item xs={4} style={{marginBottom:'5px'}}>
                    <Typography>{formatedDate} - {cart.shop.name} {cart.shop.city}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Grid container justify='flex-start'>
                        <Typography>Vous avez payé : {cart.price}€</Typography>
                    </Grid>
                </Grid>
                {isDetailsToggled && 
                <Grid item xs={12} style={{marginBottom:'20px'}}>
                    <Grid item xs={12}>
                        <Grid container direction='row' justify='space-evenly' wrap='wrap' style={{paddingTop:'20px'}}>
                            {cart.products.map((item, index) => {
                                return (
                                    <Grid item key={index}>
                                        <Typography>{item.name}</Typography>
                                        <Typography>Quantité : {item.itemQuantity}</Typography>
                                        <Typography>prix : {item.priceUnit}€</Typography>
                                        <Typography>score total : {item.scoreHealth}</Typography>
                                    </Grid>
                                )})}
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container justify='space-between'>
                            <Typography onClick={() => setIsDetailsToggled(!isDetailsToggled)}>Moins<ExpandLessIcon style={{position: 'absolute'}}/></Typography>
                            <Button color='secondary' onClick={() => {
                                sessionStorage.setItem('cart', JSON.stringify(cart));
                            }}
                            href='/shop'>Ajouter au panier</Button>
                        </Grid>
                    </Grid>
                </Grid>}
                {!isDetailsToggled &&
                <Grid item xs={12}>
                    <Grid item>
                            <Typography>Total de produits commandés : {totalOfProducts}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container justify='space-between'>
                            <Typography onClick={() => setIsDetailsToggled(!isDetailsToggled)}>Plus<ExpandMoreIcon style={{position: 'absolute'}}/></Typography>
                            <Button color='secondary' onClick={() => {
                                sessionStorage.setItem('cart', JSON.stringify(cart));
                            }} href='/shop'>Ajouter au panier</Button>
                        </Grid>
                    </Grid>
                </Grid>}
            </Grid>
            <Grid>
            </Grid>
        </Grid>
    );
}

export default HistoryItem;