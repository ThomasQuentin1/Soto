import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import SearchBarItemProps from 'interfaces/SearchBarItem';
import CountableProduct from 'interfaces/CountableProduct';

const getRandomIntInclusive = (min : number, max : number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }

const AddToBasket = (countableProduct: CountableProduct, basket: CountableProduct[], setBasket: any) => {
    let newBasket: CountableProduct[] = [];
    basket.map((item) => newBasket.push(item));
    newBasket.push(countableProduct);
    setBasket(newBasket);
}

const SearchBarItem = ({countableProduct, basket, setBasket, setOpen} : SearchBarItemProps) => {
    let scoreColor : string = "red";

    countableProduct.product.score = getRandomIntInclusive(50, 99); // TODO remove this, it's just for demo
    
    if (countableProduct.product.score >= 40) {
        scoreColor = "orange";
    }
    if (countableProduct.product.score >= 75) {
        scoreColor = "green";
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
                    <Typography variant="subtitle2" style={{right:'10px', position:'absolute', fontWeight:'bold', color:scoreColor}}>Score : {countableProduct.product.score}%</Typography>
                </div>

                <Container><Typography variant="h6" style={{marginTop:'19px'}}>{countableProduct.product.name}</Typography></Container>
                <Container>Marque : {countableProduct.product.brand}</Container>
                <Container>{countableProduct.product.price.toFixed(2)}€</Container>
            </Grid>
        </Grid>

    );
}

export default SearchBarItem