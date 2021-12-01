import React from "react";
import {Typography, Grid, Box} from "@mui/material";
import {Product} from "typing";

interface SummaryCartItemProps {
    product: Product;
}

const SummaryCartItem = ({product}: SummaryCartItemProps) => {
    return (
        <Grid container direction={"row"}>
            <Grid item xs={12}>
                <Typography component="div" style={{flexDirection: "row"}}><Box
                    fontWeight="fontWeightBold">{product.name}</Box><Box style={{paddingLeft: "15px"}}> - Quantité
                    : {product.itemQuantity}</Box></Typography>
            </Grid>
        </Grid>
    );
}

export default SummaryCartItem;