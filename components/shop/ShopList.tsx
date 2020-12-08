import React from 'react';
import Grid from "@material-ui/core/Grid";
import ShopItem from 'components/shop/ShopItem';
import ShopListProps from 'interfaces/ShopList';

const ShopList = ({basket, setBasket} : ShopListProps) => {
    return (
        <Grid justify={"center"} container style={{alignItems: 'flex-start'}}>
            {basket && basket.length != 0 && basket.map((item, index) => {
                return (
                    <ShopItem key={index} index={index} countableProduct={item} basket={basket} setBasket={setBasket}/>
                ); 
            })}
        </Grid>
    );
}

export default ShopList