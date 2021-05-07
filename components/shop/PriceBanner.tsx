import React from "react";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Button, Typography} from '@material-ui/core';
import { useTranslation } from "react-i18next"
import Container from '@material-ui/core/Container';
import PriceBannerProps from 'interfaces/PriceBanner';
import CountableProduct from 'interfaces/CountableProduct';

const calculateTotalPrice = (basket: CountableProduct[]) => {
    let totalPrice : number = 0;

    if (basket) {
        basket.map((item) => {
            totalPrice += Number(item.product.priceUnit) * item.quantity;
        });
    }
    return totalPrice;
}
const PriceBanner = ({basket} : PriceBannerProps) => {
    const totalPrice = calculateTotalPrice(basket);
    const [t] = useTranslation();
    
    return (
    <Container style={{display: 'flex', flexDirection:'row', width: '100%', alignItems: 'center', justifyContent:'center', alignContent: 'center', marginTop:'20px', padding: '10px'}} maxWidth={false} className='price_banner'>
        <Typography
            variant="h6"
            color="secondary"
            style={{marginRight:'20px !important'}}
        >Mon panier</Typography>
        <ShoppingBasketIcon fontSize='large' color="secondary" style={{marginRight: 'auto'}} className='icons'/>
        <Typography
            variant="h6"
            color="secondary"
            style={{marginLeft:'auto'}}
        >Prix total : {totalPrice.toFixed(2)}€</Typography>
        <Button color='secondary' variant="outlined" style={{marginLeft: '20px', fontSize:'17px'}}>{t('shop.payButton.label')}</Button>
    </Container>)
};

export default PriceBanner;
