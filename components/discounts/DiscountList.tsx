import React from 'react';
import Grid from "@material-ui/core/Grid";
import { Product } from "typing";
import DiscountItem from './DiscountItem';

interface DiscountListProps {
    discountsArray: Product[];
    Add: any;
    Remove: any;

}

const DiscountList = ({ discountsArray, Add, Remove }: DiscountListProps) => {

    console.log(discountsArray);
    return (
        <Grid justify={"center"} container style={{ alignItems: 'flex-start' }}>
            {discountsArray && discountsArray.length != 0 && discountsArray.map((item, index) => {
                return (
                    <DiscountItem product={item} Add={Add} Remove={Remove} basket={discountsArray} key={index} />
                );
            })}
        </Grid>
    );
}

export default DiscountList;