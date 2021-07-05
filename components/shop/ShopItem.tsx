import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ShopItemProps from 'interfaces/ShopItem';
import {Button, Typography, Tooltip} from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import {useRemoveFromCartMutation, Product, useAddToCartMutation} from 'typing';
import {color} from "../../styles/globalStyle";

// const color = {
//     dark_red: "#ff0000",
//     red: "#ff6821",
//     orange: "#ffb300",
//     green: "#bbff29",
//     dark_green: "#00ff00",
//     dark_red_alpha: "#ff000088",
//     red_alpha: "#ff682188",
//     orange_alpha: "#ffb30088",
//     green_alpha: "#bbff2988",
//     dark_green_alpha: "#00ff0088",
// };

// const reduceQuantity = (quantity: number, basket: Product[], setBasket: any, index: number) => {
//     let newBasket: Product[] = [];
//     basket.map((item) => newBasket.push(item));
//     newBasket[index].itemQuantity = quantity - 1;
//     setBasket(newBasket);
// }

// const increaseQuantity = (quantity: number, basket: Product[], setBasket: any, index: number) => {
//     let newBasket: Product[] = [];
//     basket.map((item) => newBasket.push(item));
//     newBasket[index].itemQuantity = quantity + 1;
//     setBasket(newBasket);
// }

// const removeFromBasket = (basket: Product[], setBasket: any, index: number) => {
//     let newBasket: Product[] = [];
//     basket.map((item, indexOldBasket) => {
//         if (indexOldBasket !== index)
//             newBasket.push(item)
//     });
//     setBasket(newBasket);
// }

const firstLetterCap = (str: string) => {
    return str.charAt(0).toUpperCase() + str.substr(1, str.length)
}


const returnRemoveOrReduceButton = (product: Product, RemoveFromCart: any, basket: Product[], setBasket: any) => {
    if (product.itemQuantity === 1) {
        return (
            <Button
                color="secondary"
                onClick={() => RemoveFromCart(product, basket, setBasket)}
                style={{borderRadius: "24px", fontSize: '23px', height: '25px', width: '25px'}}><DeleteIcon fontSize={"small"}></DeleteIcon>
            </Button>);
    } else {
        return (
            <Button 
                color="secondary" 
                onClick={() => RemoveFromCart(product, basket, setBasket)}
                style={{borderRadius: "24px", fontSize: '23px', height: '25px', width: '25px'}}>-
            </Button>);
    }
}

const ShopItem = ({product, AddToCart, basket, setBasket, RemoveFromCart} : ShopItemProps) => {

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
    const removeOrReduceButton = returnRemoveOrReduceButton(product, RemoveFromCart, basket, setBasket);
    return (
        <>
            {product && !isToggled &&
            <Grid
                xs={6} sm={4} md={3} lg={3} xl={2}
                item style={{
                textAlign: 'center',
                margin: '50px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderColor: scoreColorAlpha
            }} className="item_shop">
                {/** This is the bar that show the score of the product */}
                <div style={{
                    backgroundColor: scoreColorAlpha,
                    height: '20px',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    position: 'relative'
                }}>
                    <Typography style={{
                        position: 'absolute',
                        left: '8px',
                        color: 'black',
                        fontWeight: 'bold'
                    }}>{product.scoreHealth}%</Typography>
                    <div style={{
                        height: '20px',
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                        backgroundColor: scoreColor,
                        width: `${product.scoreHealth}%`
                    }}/>
                </div>
                <Container style={{marginBottom: '5px', marginTop: '10px'}}>{product.name}</Container>
                <Container>{Number(product.priceUnit).toFixed(2)}€</Container>
                <Box maxWidth="xs" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>
                    {/** The good buttun is being choosed if function of the quantity of this product */}
                    {removeOrReduceButton}
                    <p>{product.itemQuantity}</p>
                    <Button color="secondary"
                        onClick={() => AddToCart(product, basket, setBasket)}
                        style={{borderRadius: '24px', fontSize: '23px', height: '25px', width: '25px'}}>+
                    </Button>
                </Box>
                <Box style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Tooltip TransitionComponent={Zoom} title={"Voir plus d'informations"}>
                        <ArrowRightAltIcon onClick={() => SetIsToggled(!isToggled)} style={{
                            color: 'grey',
                            marginLeft: '10px',
                            marginTop: '10px'
                        }}/>
                    </Tooltip>
                </Box>
            </Grid>
            }
            {product && isToggled &&
            <Grid
                xs={6} sm={4} md={3} lg={3} xl={2}
                item style={{
                textAlign: 'center',
                margin: '50px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderColor: scoreColorAlpha
            }} className="item_shop">
                <div style={{
                    backgroundColor: scoreColorAlpha,
                    height: '20px',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    position: 'relative'
                }}>
                    <Typography style={{
                        position: 'absolute',
                        left: '8px',
                        color: 'black',
                        fontWeight: 'bold'
                    }}>{product.scoreHealth}%</Typography>
                    <div style={{
                        height: '20px',
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                        backgroundColor: scoreColor,
                        width: `${product.scoreHealth}%`
                    }}/>
                </div>
                <Container style={{marginBottom: '5px', marginTop: '10px'}}>{product.name}</Container>
                <Container>{Number(product.priceUnit).toFixed(2)}€</Container>
                <Box maxWidth="xs" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>
                    {/** The good buttun is being choosed if function of the quantity of this product */}
                    {removeOrReduceButton}
                    <p>{product.itemQuantity}</p>
                    <Button color="secondary"
                        onClick={() => AddToCart(product, basket, setBasket)}
                        style={{borderRadius: '24px', fontSize: '23px', height: '25px', width: '25px'}}>+
                    </Button>
                </Box>
                <Typography style={{marginBottom: '10px', marginLeft: '10px', marginRight: '10px'}} align="left">Score
                    : {product.scoreHealth}
                </Typography>
                <Typography style={{marginBottom: '10px', marginLeft: '10px', marginRight: '10px'}} align="left">Marque
                    : {product.brand!.split(',')[0]}
                </Typography>
                <Container style={{marginLeft: '10px', padding: '0px', marginRight: '10px'}} maxWidth="xs">
                    <div className="flexDirRow">
                        <Typography align="left" style={{whiteSpace: "nowrap", alignSelf: "baseline"}}>
                            Ingrédients :
                        </Typography>
                        <div className="flexDirCol" style={{marginLeft: "10px"}}>
                            {product.ingredients?.map((ingredient, index) => {
                                return (
                                    <Typography align="left" key={product.id + index} style={{alignSelf: "start"}}>
                                        {firstLetterCap(ingredient!.split('-').join(' '))}
                                    </Typography>
                                )
                            })}
                        </div>
                    </div>
                </Container>
                <Box style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Tooltip TransitionComponent={Zoom} title={"Voir plus d'informations"}>
                        <ArrowRightAltIcon onClick={() => SetIsToggled(!isToggled)} style={{
                            color: 'grey',
                            marginLeft: '10px',
                            marginTop: '10px'
                        }}/>
                    </Tooltip>
                </Box>
            </Grid>
            }
        </>
    );
}

export default ShopItem