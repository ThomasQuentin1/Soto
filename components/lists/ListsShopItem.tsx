import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { List } from "pages/lists";
import { Button, Typography, Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { Product } from 'typing';

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

const returnRemoveOrReduceButton = (product: Product, RemoveFromCart: any, lists: List[], setBasket: any, activeList: string) => {
    if (product.itemQuantity === 1) {
        return (
            <Button
                color="secondary"
                onClick={() => RemoveFromCart(product, lists, setBasket, activeList)}
                style={{borderRadius: "24px", fontSize: '23px', height: '25px', width: '25px'}}><DeleteIcon fontSize={"small"}></DeleteIcon>
            </Button>);
    } else {
        return (
            <Button 
                color="secondary"
                onClick={() => RemoveFromCart(product, lists, setBasket, activeList)}
                style={{borderRadius: "24px", fontSize: '23px', height: '25px', width: '25px'}}>-
            </Button>);
    }
}

interface ListsShopItemProps {
    key: number;
    product : Product;
    AddToCart: any;
    RemoveFromCart: any;
    lists : List[];
    setBasket: any;
    cartQueryRefetch?: any;
    activeList: string;
    setIsBasketUpToDate?: any;
}

const ListsShopItem = ({product, AddToCart, lists, setBasket, RemoveFromCart, activeList} : ListsShopItemProps) => {

    let scoreColorAlpha : string = color.red_alpha; // red
    let scoreColor : string = color.red;

    const [isToggled, SetIsToggled] = useState<boolean>(false);

    if (Number(product.scoreHealth) >= 40) {
        scoreColorAlpha = color.orange_alpha; // orange
        scoreColor = color.orange;
    }
    if (Number(product.scoreHealth) >= 75) {
        scoreColorAlpha = color.green_alpha; // green
        scoreColor = color.green;
    }
    const removeOrReduceButton = returnRemoveOrReduceButton(product, RemoveFromCart, lists, setBasket, activeList);
    return (
        <>
        {product && !isToggled &&
            <Grid
            item style={{textAlign: 'center', margin: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderColor:scoreColorAlpha}} className="item_shop">
                {/** This is the bar that show the score of the product */}
                <div style={{backgroundColor:scoreColorAlpha, height:'20px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', position:'relative'}}>
                    <Typography style={{position:'absolute', left: '8px', color:'black', fontWeight:'bold'}}>{product.scoreHealth}%</Typography>
                    <div style={{height: '20px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', backgroundColor: scoreColor, width:`${product.scoreHealth}%`}}/>
                </div>
                <Container style={{marginBottom: '5px', marginTop: '10px'}}>{product.name}</Container>
                <Container>{Number(product.priceUnit).toFixed(2)}€</Container>
                <Box maxWidth="xs" style={{display: 'flex', flexDirection:'row', justifyContent: 'space-evenly', alignItems:'center'}}>
                    {/** The good buttun is being choosed if function of the quantity of this product */}
                    {removeOrReduceButton}
                    <p>{product.itemQuantity}</p>
                    <Button color="secondary"
                        onClick={() => AddToCart(product, lists, setBasket, activeList)}
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
        {product && isToggled &&
            <Grid
            item style={{textAlign: 'center', margin: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderColor:scoreColorAlpha}} className="item_shop">
                <div style={{backgroundColor:scoreColorAlpha, height:'20px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', position:'relative'}}>
                    <Typography style={{position:'absolute', left: '8px', color:'black', fontWeight:'bold'}}>{product.scoreHealth}%</Typography>
                    <div style={{height: '20px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', backgroundColor: scoreColor, width:`${product.scoreHealth}%`}}/>
                </div>
                <Container style={{marginBottom: '5px', marginTop: '10px'}}>{product.name}</Container>
                <Container>{Number(product.priceUnit).toFixed(2)}€</Container>
                <Box maxWidth="xs" style={{display: 'flex', flexDirection:'row', justifyContent: 'space-evenly', alignItems:'center'}}>
                    {/** The good buttun is being choosed if function of the quantity of this product */}
                    {removeOrReduceButton}
                    <p>{product.itemQuantity}</p>
                    <Button color="secondary"
                        onClick={() => AddToCart(product, lists, setBasket, activeList)}
                        style={{borderRadius: '24px', fontSize: '23px', height: '25px', width: '25px'}}>+
                    </Button>
                </Box>
                <Typography style={{marginBottom:'10px', marginLeft: '10px', marginRight: '10px'}} align="left">Score : {product.scoreHealth}</Typography>
                <Typography style={{marginBottom:'10px', marginLeft: '10px', marginRight: '10px'}} align="left">Marque : {product.brand}</Typography>
                <Container style={{marginLeft: '10px', paddingLeft: '0px', marginRight: '10px'}} maxWidth="xs">
                <Typography align="left">Ingrédients : {product.ingredients}</Typography>
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

export default ListsShopItem