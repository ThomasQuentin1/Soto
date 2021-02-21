import React from "react";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Button } from '@material-ui/core';
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
    <Container style={{display: 'flex', flexDirection:'row', width: '100%', alignItems: 'center', justifyContent:'center', alignContent: 'center', marginTop:'20px'}} maxWidth='xl' className='price_banner'>
        <p style={{fontSize:'20px', marginRight:'20px'}}>Mon panier</p>
        <ShoppingBasketIcon fontSize='large' style={{marginRight: 'auto'}} className='icons'/>

        {/* <Button color='secondary' style={{fontSize:'17px', zIndex:1}}>Mes listes sauvegardées</Button> */}

        <p style={{marginLeft: 'auto', fontSize:'20px'}}>Prix total : {totalPrice.toFixed(2)}€</p>
        <Button color='secondary' style={{marginLeft: '20px', fontSize:'17px'}}>{t('shop.payButton.label')}</Button>
    </Container>)
};

export default PriceBanner;
