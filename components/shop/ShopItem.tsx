import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ShopItemProps from 'interfaces/ShopItem';
import { Button } from '@material-ui/core';
import { Product } from '../../interfaces/Product';
import DeleteIcon from '@material-ui/icons/Delete';

const reduceQuantity = (quantity: number, basket: Product[], setBasket: any, index: number) => {
    let newBasket: Product[] = [];
    basket.map((item) => newBasket.push(item));
    newBasket[index].quantity = quantity - 1;
    setBasket(newBasket);
}
const increaseQuantity = (quantity: number, basket: Product[], setBasket: any, index: number) => {
    let newBasket: Product[] = [];
    basket.map((item) => newBasket.push(item));
    newBasket[index].quantity = quantity + 1;
    setBasket(newBasket);
}

const removeFromBasket = (basket: Product[], setBasket: any, index: number) => {
    let newBasket: Product[] = [];
    basket.map((item, indexOldBasket) => {
        if (indexOldBasket !== index)
            newBasket.push(item)
    });
    setBasket(newBasket);
}

const returnRemoveOrReduceButton = (product: Product, basket: Product[], setBasket: any, index: number) => {
    if (product.quantity === 1) {
        return (
            <Button
                color="secondary"
                onClick={() => removeFromBasket(basket, setBasket, index)}
                style={{borderRadius: "24px", fontSize: '23px', height: '25px', width: '25px'}}><DeleteIcon fontSize={"small"}></DeleteIcon>
            </Button>);
    } else {
        return (
            <Button 
                color="secondary" 
                onClick={() => reduceQuantity(product.quantity, basket, setBasket, index)}
                style={{borderRadius: "24px", fontSize: '23px', height: '25px', width: '25px'}}>-
            </Button>);
    }
}

const ShopItem = ({product, basket, setBasket, index} : ShopItemProps) => {
    let scoreColor : string = "red";
    if (product.score <= 75) {
        scoreColor = "green";
    } else if (product.score <= 40) {
        scoreColor = "orange";
    }
    const removeOrReduceButton = returnRemoveOrReduceButton(product, basket, setBasket, index);
    return (
        <>
        {product && 
            <Grid item style={{textAlign: 'center', margin: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}} className="item_shop">
                {/** This is the dot that show the score next to the product */}
                <div style={{position:'relative'}}>
                    <div style={{borderRadius: '24px', backgroundColor: scoreColor, height: "25px", width: "25px", position: 'absolute', right: '12px', top:'-11px'}}></div>
                    <Container><img width='200px' src={product.picture}></img></Container>
                </div>
                <Container>{product.name}</Container>
                <Container>{product.price.toFixed(2)}€</Container>
                <Box maxWidth="xs" style={{display: 'flex', flexDirection:'row', justifyContent: 'space-evenly', alignItems:'center'}}>
                    {/** The good buttun is being choosed if function of the quantity of this product */}
                    {removeOrReduceButton}
                    <p>{product.quantity}</p>
                    <Button color="secondary"
                        onClick={() => increaseQuantity(product.quantity, basket, setBasket, index)}
                        style={{borderRadius: '24px', fontSize: '23px', height: '25px', width: '25px'}}>+
                    </Button>
                </Box>
            </Grid>
        }
        </>
    );
}

export default ShopItem