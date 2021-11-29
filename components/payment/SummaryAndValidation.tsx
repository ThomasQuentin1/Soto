import React from "react";
import { Cart } from "typing";
import {Grid, ImageList, ImageListItem, TextField} from "@mui/material";
import SummaryCartItem from "components/payment/SummaryCartItem";

interface SummaryAndValidationProps {
    cardValues: any;
    expirationDateValues: any;
    cryptogramValues: any;
    zipCode: string;
    fullAdress: string;
    userName: any;
    cart: Cart;
}

const SummaryAndValidation = ({cart, cardValues, userName, zipCode, fullAdress} : SummaryAndValidationProps) => {
    // const {data, loading} = useAccountQuery();
    
    const hiddenCardValue : string = "**** **** **** " + cardValues.textmask.slice(cardValues.textmask.length - 4, cardValues.textmask.end)
    return (
        <Grid container>
            <Grid item xs={6} style={{paddingLeft:"20px"}}>
                <ImageList cols={2} rowHeight={"auto"} sx={{height: "300px"}}>
                    {cart && cart.products.map((item, index) => {
                        return (
                            <ImageListItem cols={1} key={index}>
                                <SummaryCartItem product={item}/>
                            </ImageListItem>
                        )
                    })}

                </ImageList>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            color="secondary"
                            size="small"
                            label="Numéro de carte"
                            defaultValue={hiddenCardValue}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            color="secondary"
                            size="small"
                            label="Titulaire de la carte"
                            defaultValue={userName}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            color="secondary"
                            size="small"
                            label="Prix total du panier"
                            defaultValue={cart.price + "€"}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            style={{width:"auto"}}
                            color="secondary"
                            size="small"
                            label="Adresse"
                            defaultValue={zipCode + " " + fullAdress}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>
                
            </Grid>
        </Grid>
    );
}

export default SummaryAndValidation;