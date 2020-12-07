import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ShopItemProps from 'interfaces/ShopItem';
import { Button, Typography, Tooltip } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import CountableProduct from 'interfaces/CountableProduct';

const reduceQuantity = (quantity: number, basket: CountableProduct[], setBasket: any, index: number) => {
    let newBasket: CountableProduct[] = [];
    basket.map((item) => newBasket.push(item));
    newBasket[index].quantity = quantity - 1;
    setBasket(newBasket);
}

const increaseQuantity = (quantity: number, basket: CountableProduct[], setBasket: any, index: number) => {
    let newBasket: CountableProduct[] = [];
    basket.map((item) => newBasket.push(item));
    newBasket[index].quantity = quantity + 1;
    setBasket(newBasket);
}

const removeFromBasket = (basket: CountableProduct[], setBasket: any, index: number) => {
    let newBasket: CountableProduct[] = [];
    basket.map((item, indexOldBasket) => {
        if (indexOldBasket !== index)
            newBasket.push(item)
    });
    setBasket(newBasket);
}

const returnRemoveOrReduceButton = (countableProduct: CountableProduct, basket: CountableProduct[], setBasket: any, index: number) => {
    if (countableProduct.quantity === 1) {
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
                onClick={() => reduceQuantity(countableProduct.quantity, basket, setBasket, index)}
                style={{borderRadius: "24px", fontSize: '23px', height: '25px', width: '25px'}}>-
            </Button>);
    }
}

const ShopItem = ({countableProduct, basket, setBasket, index} : ShopItemProps) => {
    let scoreColor : string = "red";

    const [isToggled, SetIsToggled] = useState<boolean>(false);

    if (countableProduct.product.score <= 75) {
        scoreColor = "green";
    } else if (countableProduct.product.score <= 40) {
        scoreColor = "orange";
    }
    const removeOrReduceButton = returnRemoveOrReduceButton(countableProduct, basket, setBasket, index);
    return (
        <>
        {countableProduct && !isToggled &&
            <Grid
            item style={{textAlign: 'center', margin: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}} className="item_shop">
                {/** This is the dot that show the score next to the product */}
                <div style={{position:'relative'}}>
                    <div style={{borderRadius: '24px', backgroundColor: scoreColor, height: "25px", width: "25px", position: 'absolute', right: '12px', top:'-11px'}}></div>
                    <Container><img width='200px' src={countableProduct.product.picture}></img></Container>
                </div>
                <Container>{countableProduct.product.name}</Container>
                <Container>{countableProduct.product.price.toFixed(2)}€</Container>
                <Box maxWidth="xs" style={{display: 'flex', flexDirection:'row', justifyContent: 'space-evenly', alignItems:'center'}}>
                    {/** The good buttun is being choosed if function of the quantity of this product */}
                    {removeOrReduceButton}
                    <p>{countableProduct.quantity}</p>
                    <Button color="secondary"
                        onClick={() => increaseQuantity(countableProduct.quantity, basket, setBasket, index)}
                        style={{borderRadius: '24px', fontSize: '23px', height: '25px', width: '25px'}}>+
                    </Button>
                </Box>
                <Box style={{display:'flex', justifyContent: 'flex-end'}}>
                    <Tooltip TransitionComponent={Zoom} title={"Voir plus d'informations"}>
                        <ArrowRightAltIcon onClick={() => SetIsToggled(!isToggled)} style={{color:'grey', marginLeft:'10px', marginTop:'10px'}}></ArrowRightAltIcon>
                    </Tooltip>
                </Box>
            </Grid>
        }
        {countableProduct && isToggled &&
            <Grid
            item style={{textAlign: 'center', margin: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft:'40px', paddingRight:'40px'}} className="item_shop">
                <Container>{countableProduct.product.name}</Container>
                <Container>{countableProduct.product.price.toFixed(2)}€</Container>
                <Box maxWidth="xs" style={{display: 'flex', flexDirection:'row', justifyContent: 'space-evenly', alignItems:'center'}}>
                    {/** The good buttun is being choosed if function of the quantity of this product */}
                    {removeOrReduceButton}
                    <p>{countableProduct.quantity}</p>
                    <Button color="secondary"
                        onClick={() => increaseQuantity(countableProduct.quantity, basket, setBasket, index)}
                        style={{borderRadius: '24px', fontSize: '23px', height: '25px', width: '25px'}}>+
                    </Button>
                </Box>
                <Typography style={{marginBottom:'10px'}} align="left">Score par rapport à vos critères : {countableProduct.product.score}</Typography>
                <Typography style={{marginBottom:'10px'}} align="left">Marque : {countableProduct.product.brand}</Typography>
                <Container style={{marginLeft: '0px', paddingLeft: '0px'}} maxWidth="xs">
                    <Typography align="left">Ingrédients : {countableProduct.product.ingredients}</Typography>
                </Container>
                <Box style={{display:'flex', justifyContent: 'flex-end'}}>
                    <Tooltip TransitionComponent={Zoom} title={"Voir plus d'informations"}>
                        <ArrowRightAltIcon onClick={() => SetIsToggled(!isToggled)} style={{color:'grey', marginLeft:'10px', marginTop:'10px'}}></ArrowRightAltIcon>
                    </Tooltip>
                </Box>
            </Grid>
        }
        </>
    );
}

export default ShopItem