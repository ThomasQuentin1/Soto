import React from "react";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Button } from '@material-ui/core';
import { Product } from 'interfaces/Product';
import { useTranslation } from "react-i18next"
import Container from '@material-ui/core/Container';

interface PriceBannerProps {
    basket: Product[];
}

const calculateTotalPrice = (basket: Product[]) => {
    let totalPrice : number = 0;

    basket.map((item) => {
        totalPrice += item.price * item.quantity;
    });
    return totalPrice;
}
const PriceBanner = ({basket} : PriceBannerProps) => {
    const totalPrice = calculateTotalPrice(basket);
    const [t] = useTranslation();
    
    return (
    <Container style={{display: 'flex', flexDirection:'row', width: '100%', alignItems: 'center', justifyContent:'center', alignContent: 'center', marginTop:'20px'}} maxWidth='xl' className='price_banner'>
        <p style={{fontSize:'20px', marginRight:'20px'}}>Mon panier</p>
        <ShoppingBasketIcon fontSize='large' style={{marginRight: 'auto'}} className='icons'/>

        <Button color='secondary' style={{fontSize:'17px'}}>Mes listes sauvegardées</Button>

        <p style={{marginLeft: 'auto', fontSize:'20px'}}>Prix total : {totalPrice.toFixed(2)}€</p>
        <Button color='secondary' style={{marginLeft: '20px', fontSize:'17px'}}>{t('shop.payButton.label')}</Button>
    </Container>)
};

export default PriceBanner;
