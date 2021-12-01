import React, { useState } from 'react';
import { Box, Grid, Container, Button, Typography, Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Product } from 'typing';
import { color } from "../../styles/globalStyle";

const firstLetterCap = (str: string) => {
    return str.charAt(0).toUpperCase() + str.substr(1, str.length)
}

interface DiscountItemProps {
    product: Product;
    Add: any;
    basket: Product[];
    setBasket: any;
    Remove: any;
}

const DiscountItem = ({ product, Add, basket, setBasket }: DiscountItemProps) => {

    let scoreColorAlpha: string = color.red_alpha; // red
    let scoreColor: string = color.red;

    const [isToggled, SetIsToggled] = useState<boolean>(false);

    if (Number(product.scoreHealth) >= 40) {
        scoreColorAlpha = color.orange_alpha; // orange
        scoreColor = color.orange;
    }
    if (Number(product.scoreHealth) >= 75) {
        scoreColorAlpha = color.green_alpha; // green
        scoreColor = color.green;
    }

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
                        }} />
                    </div>
                    <Container style={{ marginBottom: '5px', marginTop: '10px' }}>{product.name}</Container>
                    <Container>{Number(product.pricePromotion).toFixed(2)}€</Container>
                    <Box maxWidth="xs" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center'
                    }}>
                        <Button color="secondary"
                            onClick={() => Add(product, basket, setBasket)}
                            style={{ borderRadius: '24px', fontSize: '23px', height: '25px', width: '25px' }}>+
                        </Button>
                    </Box>
                    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Tooltip TransitionComponent={Zoom} title={"Voir plus d'informations"}>
                            <ArrowRightAltIcon onClick={() => SetIsToggled(!isToggled)} style={{
                                color: 'grey',
                                marginLeft: '10px',
                                marginTop: '10px'
                            }} />
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
                        }} />
                    </div>
                    <Container style={{ marginBottom: '5px', marginTop: '10px' }}>{product.name}</Container>
                    <Container>{Number(product.priceUnit).toFixed(2)}€</Container>
                    <Box maxWidth="xs" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center'
                    }}>
                        <Button color="secondary"
                            onClick={() => Add(product, basket, setBasket)}
                            style={{ borderRadius: '24px', fontSize: '45px', height: '25px', width: '25px' }}>+
                        </Button>
                    </Box>
                    <Typography style={{ marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }} align="left">Score
                        : {product.scoreHealth}
                    </Typography>
                    <Typography style={{ marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }} align="left">Marque
                        : {product.brand!.split(',')[0]}
                    </Typography>
                    <Container style={{ marginLeft: '10px', padding: '0px', marginRight: '10px' }} maxWidth="xs">
                        <div className="flexDirRow">
                            <Typography align="left" style={{ whiteSpace: "nowrap", alignSelf: "baseline" }}>
                                Ingrédients :
                            </Typography>
                            <div className="flexDirCol" style={{ marginLeft: "10px" }}>
                                {product.ingredients?.map((ingredient, index) => {
                                    return (
                                        <Typography align="left" key={product.id + index} style={{ alignSelf: "start" }}>
                                            {firstLetterCap(ingredient!.split('-').join(' '))}
                                        </Typography>
                                    )
                                })}
                            </div>
                        </div>
                    </Container>
                    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Tooltip TransitionComponent={Zoom} title={"Voir plus d'informations"}>
                            <ArrowRightAltIcon onClick={() => SetIsToggled(!isToggled)} style={{
                                color: 'grey',
                                marginLeft: '10px',
                                marginTop: '10px'
                            }} />
                        </Tooltip>
                    </Box>
                </Grid>
            }
        </>
    );
}

export default DiscountItem;