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

const color = {
    dark_red: "#ff0000",
    red: "#ff6821",
    orange: "#ffb300",
    green: "#bbff29",
    dark_green: "#00ff00",
    dark_red_alpha: "#ff000088",
    red_alpha: "#ff682188",
    orange_alpha: "#ffb30088",
    green_alpha: "#bbff2988",
    dark_green_alpha: "#00ff0088",
};

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
    let scoreColorAlpha : string = color.red_alpha; // red
    let scoreColor : string = color.red;

    const [isToggled, SetIsToggled] = useState<boolean>(false);

    if (countableProduct.product.score >= 40) {
        scoreColorAlpha = color.orange_alpha; // orange
        scoreColor = color.orange;
    }
    if (countableProduct.product.score >= 75) {
        scoreColorAlpha = color.green_alpha; // green
        scoreColor = color.green;
    }
    const removeOrReduceButton = returnRemoveOrReduceButton(countableProduct, basket, setBasket, index);
    return (
        <>
        {countableProduct && !isToggled &&
            <Grid
            item style={{textAlign: 'center', margin: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderColor:scoreColorAlpha}} className="item_shop">
                {/** This is the dot that show the score next to the product */}
                <div style={{backgroundColor:scoreColorAlpha, height:'20px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', position:'relative'}}>
                    <Typography style={{position:'absolute', left: '8px', color:'black', fontWeight:'bold'}}>{countableProduct.product.score}%</Typography>
                    <div style={{height: '20px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', backgroundColor: scoreColor, width:`${countableProduct.product.score}%`}}/>
                </div>
                <Container style={{marginBottom: '5px', marginTop: '10px'}}>{countableProduct.product.name}</Container>
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
            item style={{textAlign: 'center', margin: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderColor:scoreColorAlpha}} className="item_shop">
                <div style={{backgroundColor:scoreColorAlpha, height:'20px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', position:'relative'}}>
                    <Typography style={{position:'absolute', left: '8px', color:'black', fontWeight:'bold'}}>{countableProduct.product.score}%</Typography>
                    <div style={{height: '20px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', backgroundColor: scoreColor, width:`${countableProduct.product.score}%`}}/>
                </div>
                <Container style={{marginBottom: '5px', marginTop: '10px'}}>{countableProduct.product.name}</Container>
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
                <Typography style={{marginBottom:'10px', marginLeft: '10px', marginRight: '10px'}} align="left">Score par rapport à vos critères : {countableProduct.product.score}</Typography>
                <Typography style={{marginBottom:'10px', marginLeft: '10px', marginRight: '10px'}} align="left">Marque : {countableProduct.product.brand}</Typography>
                <Container style={{marginLeft: '10px', paddingLeft: '0px', marginRight: '10px'}} maxWidth="xs">
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