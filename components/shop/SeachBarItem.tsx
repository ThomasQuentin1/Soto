import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import SearchBarItemProps from 'interfaces/SearchBarItem';
import CountableProduct from 'interfaces/CountableProduct';

const AddToBasket = (product: CountableProduct, basket: CountableProduct[], setBasket: any) => {
    let newBasket: CountableProduct[] = [];
    basket.map((item) => newBasket.push(item));
    newBasket.push(product);
    setBasket(newBasket);
}

const SearchBarItem = ({countableProduct, basket, setBasket, setOpen} : SearchBarItemProps) => {
    let scoreColor : string = "red";

    if (countableProduct.product.score <= 75) {
        scoreColor = "green";
    } else if (countableProduct.product.score <= 40) {
        scoreColor = "orange";
    }
    return (
        <Grid container style={{display:'flex', flexDirection:'row'}} className="item_search_bar" onClick={() => {
                    AddToBasket(countableProduct, basket, setBasket);
                    setOpen(false);
                }
            }>
            <Grid item xs={4}>
                <Skeleton variant="rect" width='100%' height='100%'/>
            </Grid>
            <Grid
            item xs={8} style={{textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                {/** This is the dot that show the score next to the product */}
                <div style={{position:'relative'}}>
                    <div style={{borderRadius: '24px', backgroundColor: scoreColor, height: "25px", width: "25px", position: 'absolute', right: '12px', top:'-11px'}}></div>
                    <Container><img width='200px' src={countableProduct.product.picture}></img></Container>
                </div>
                <Container><Typography variant="h6">{countableProduct.product.name}</Typography></Container>
                <Container>Marque : {countableProduct.product.brand}</Container>
                <Container>{countableProduct.product.price.toFixed(2)}€</Container>
            </Grid>
        </Grid>

    );
}

export default SearchBarItem