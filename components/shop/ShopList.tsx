import React from 'react';
import Grid from "@material-ui/core/Grid";
import ShopItem from 'components/shop/ShopItem';
import ShopListProps from 'interfaces/ShopList';

const ShopList = ({AddToCart, basket, setBasket, RemoveFromCart} : ShopListProps) => {

    return (
        <Grid justify={"center"} container style={{alignItems: 'flex-start'}}>
            {basket && basket.length != 0 && basket.map((item, index) => {
                return (
                    <ShopItem key={index} product={item} AddToCart={AddToCart} basket={basket} setBasket={setBasket} RemoveFromCart={RemoveFromCart}/>
                ); 
            })}
        </Grid>
    );
}

export default ShopList