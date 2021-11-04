import React from 'react';
import Grid from "@material-ui/core/Grid";
import { Product } from "typing";
import DiscountItem from './DiscountItem';

interface DiscountListProps {
    discountsArray: Product[];
    basket: Product[];
    Add: any;
    Remove: any;
    setBasket: any;
}

const DiscountList = ({ discountsArray, Add, Remove, basket, setBasket }: DiscountListProps) => {

    console.log(discountsArray);
    return (
        <Grid justify={"center"} container style={{ alignItems: 'flex-start' }}>
            {discountsArray && discountsArray.length != 0 && discountsArray.map((item, index) => {
                return (
                    <DiscountItem product={item} Add={Add} Remove={Remove} basket={basket} setBasket={setBasket} key={index} />
                );
            })}
        </Grid>
    );
}

export default DiscountList;