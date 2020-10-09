import React from 'react';
import Grid from '@material-ui/core/Grid';
import ShopItem from 'components/shop/ShopItem';
import ShopItemRowProps from 'interfaces/ShopItemsRow';

const ShopItemRow = ({products} : ShopItemRowProps) => {
    return (
        <>
            {products && products.length != 0 && products.map((item, index) => {
                return (
                <Grid key={index} item xs={3}>
                    <ShopItem key={1} product={item}></ShopItem>
                </Grid>
                ); 
            })}
        </>
    );
}

export default ShopItemRow