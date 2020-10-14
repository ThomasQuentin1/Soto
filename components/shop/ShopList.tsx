import React from 'react';
import Grid from "@material-ui/core/Grid";
import { Product } from 'interfaces/Product'
import ShopItem from 'components/shop/ShopItem';


export interface ShopListProps {
    basket : Product[];
    setBasket : any;
}

const ShopList = ({basket, setBasket} : ShopListProps) => {
    return (
        <Grid justify={"center"} container>
            {basket && basket.length != 0 && basket.map((item, index) => {
                return (
                    <ShopItem key={index} index={index} product={item} basket={basket} setBasket={setBasket}></ShopItem>
                ); 
            })}
        </Grid>
    );
}

export default ShopList