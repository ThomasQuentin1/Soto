import React from 'react';
import Grid from "@material-ui/core/Grid";
import ShopItem from 'components/shop/ShopItem';
import ShopListProps from 'interfaces/ShopList';

const ShopList = ({basket, cartQueryRefetch, setIsBasketUpToDate } : ShopListProps) => {
    if (basket && basket.length != 0) {
        basket[0].name = "test";
    }
    return (
        <Grid justify={"center"} container style={{alignItems: 'flex-start'}}>
            {basket && basket.length != 0 && basket.map((item, index) => {
                return (
                    <ShopItem key={index} product={item} cartQueryRefetch={cartQueryRefetch} setIsBasketUpToDate={setIsBasketUpToDate}/>
                ); 
            })}
        </Grid>
    );
}

export default ShopList