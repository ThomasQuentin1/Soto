import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Product, Cart, useAddToCartMutation } from 'typing';

// const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
// const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

interface HistoryShortCutItemProps {
    cart: Cart;
    basket?: Product[];
    setBasket?: any;
    cartQueryRefetch: any;
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

//{name: 'Pain', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'https://www.moneyvox.fr/i/media/05l/005991lb54.jpg', price: 2.47, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}, {name: 'Pâtes', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'https://images-na.ssl-images-amazon.com/images/I/41AsfNVKjAL._AC_SY400_.jpg', price: 1, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 50}, {name: 'Pesto', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'https://i1.wp.com/www.mygusto.co.uk/wp-content/uploads/2020/03/0024839.jpg?fit=700%2C700&ssl=1', price: 11.01  , productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}, {name: 'no name', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'no name', price: 1, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}, {name: 'no name', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'no name', price: 1, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}, {name: 'no name', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'no name', price: 1, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}, {name: 'no name', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'no name', price: 1, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}, {name: 'no name', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'no name', price: 1, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}, {name: 'no name', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'no name', price: 1, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}, {name: 'no name', brand: 'no name', description: 'no name', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'no name', ingredients: 'no name', manual: 'no name', numberOfProduct: 1, picture: 'no name', price: 1, productInformation: 'no name', quantity: 1, quantityType: 'no name', score: 100}

const AddOldCartToCurrentCart = (oldCart: Cart/*, basket: Product[], setBasket: any*/, addToCartMutation: any, cartQueryRefetch: any) => {
    oldCart.products.map((item) => {
          for (let i = 0; i < item.itemQuantity!; i++) {
            addToCartMutation({variables: {productId: item.id}});
          }
    });
    cartQueryRefetch();
}

const HistoryShortCutItem = ({cart, cartQueryRefetch} : HistoryShortCutItemProps) => {
    const [isDetailsToggled, setIsDetailsToggled] = useState(false);
    const formatedDate = cart.dateLastEdit.substring(0, 10);
    // const formatedDate = GetFormatedDate(cart.dateLastEdit);
    const totalOfProducts = GetTotalOfProducts(cart.products);

    //create mutation with default parameter
    const [addToCartMutation, {}] = useAddToCartMutation({
        variables: {
           productId: '1'
        },
      });

    if (!cart)
        return <p>Invalid cart</p>;
    return (
        <Grid item>
            <Grid container style={{paddingLeft:'10px'}}>
                <Grid item xs={12} style={{marginBottom:'5px'}}>
                    <Typography>{formatedDate}</Typography>
                </Grid>
                {/* When details are displayed */}
                {isDetailsToggled && 
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Grid container direction='column' justify='space-evenly' wrap='wrap' style={{paddingTop:'10px'}}>
                            {cart.products.map((item, index) => {
                                return (
                                    <Grid item xs={8} key={index}>
                                        <Typography>{item.name} - qté : {item.itemQuantity}</Typography>
                                    </Grid>
                                )})}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify='space-between'>
                            <Typography onClick={() => setIsDetailsToggled(!isDetailsToggled)}>Moins<ExpandLessIcon style={{position: 'absolute'}}/></Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button color='secondary' onClick={() => AddOldCartToCurrentCart(cart/*, basket, setBasket*/, addToCartMutation, cartQueryRefetch)}>Ajouter au panier</Button>
                    </Grid>
                </Grid>}
                {/* When details are not displayed */}
                {!isDetailsToggled &&
                <Grid item xs={12}>
                    <Grid item>
                        <Typography>Total de produits : {totalOfProducts}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify='space-between'>
                            <Typography onClick={() => setIsDetailsToggled(!isDetailsToggled)}>Plus<ExpandMoreIcon style={{position: 'absolute'}}/></Typography>
                            <Button color='secondary' onClick={() => AddOldCartToCurrentCart(cart/*, basket, setBasket*/, addToCartMutation, cartQueryRefetch)}>Ajouter au panier</Button>
                        </Grid>
                    </Grid>
                </Grid>}
            </Grid>
            <Grid>
            </Grid>
        </Grid>
    );
}

export default HistoryShortCutItem;