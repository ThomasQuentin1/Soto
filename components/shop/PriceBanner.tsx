import React, { useState } from "react";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Button, Typography, Container, Menu, MenuItem, Grid, TextField } from '@material-ui/core';
import { useTranslation } from "react-i18next"
import PriceBannerProps from 'interfaces/PriceBanner';
import { Product, useConfirmCartMutation, useAddToCartMutation } from 'typing';
import { notifySuccess, notifyError } from "../../public/notifications/notificationsFunctions";
import CheckIcon from '@material-ui/icons/Check';

const calculateTotalPrice = (basket: Product[]) => {
    let totalPrice : number = 0;
      
    if (basket) {
        basket.map((product) => {
            totalPrice += Number(product.priceUnit) * product.itemQuantity!;
        });
    }
    return totalPrice;
}

export interface FavoredListObject {
    name: string;
    products: Product[];
}

const PriceBanner = ({basket, cartQueryRefetch, setIsBasketUpToDate} : PriceBannerProps) => {
    const totalPrice = calculateTotalPrice(basket);
    const [t] = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [listName, setListName] = useState("");

    const [anchorElAddList, setAnchorElAddList] = React.useState<null | HTMLElement>(null);

    const [newListFav, setNewListFav] = useState(false);
    newListFav;

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseAddList = () => {
        setAnchorElAddList(null);
    };

    const [addToCartMutation] = useAddToCartMutation({
        variables: {
            productId: "1"
        },
    });
    
    const [confirmCartMutation] = useConfirmCartMutation({
        variables: {
        },
    });

    let listFavObject : FavoredListObject[] | undefined;
    if (window != null && localStorage.getItem("listFav")) {
        const tmpObject = localStorage.getItem("listFav");
        if (tmpObject) {
            listFavObject = JSON.parse(tmpObject!);
        }
    }
    return (
    <Container style={{display: 'flex', flexDirection:'row', width: '100%', alignItems: 'center', justifyContent:'center', alignContent: 'center', marginTop:'20px', padding: '10px'}} maxWidth={false} className='price_banner'>
        <Typography
            variant="h6"
            color="secondary"
            style={{marginRight:'20px !important'}}
        >Mon panier</Typography>
        <ShoppingBasketIcon fontSize='large' color="secondary" style={{marginRight: 'auto'}} className='icons'/>
        <Grid item>
            <Grid container>
                {/** Button Add list to basket and its menu item */}
                <Button color="secondary" variant="outlined" onClick={(e) => {
                        setAnchorEl(e.currentTarget)
                    }}>
                    Listes sauvegardées
                </Button>
                {listFavObject != undefined && listFavObject.length != 0 && 
                    <Menu
                        id="simple-menu"
                        color="secondary"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        >
                        {listFavObject != undefined && listFavObject!.map((element, index) =>
                            <MenuItem key={index} onClick={() => {
                                handleClose()
                                element.products.map((product) => {
                                    console.log(product.id)
                                    for (let i = 0; i < product.itemQuantity!; i++) {
                                        addToCartMutation({variables: {productId: product.id}}).then((r) => {
                                            if (r.errors) {
                                                console.error("Error while adding product " + product.name + " ; " + product.id)
                                                console.error(r.errors[0].message)
                                            }
                                        });
                                    }
                                })
                                setTimeout(() => {
                                    if (cartQueryRefetch)
                                        cartQueryRefetch().then(() => setIsBasketUpToDate(false));
                                }, 2000)
                            }}>{element.name}
                            </MenuItem>
                        )}
                    </Menu>
                }
                {/** Button + and its dropdown input */}
                <Button color="secondary" variant="outlined" onClick={(e) => {
                        setAnchorElAddList(e.currentTarget);
                    }}>
                    +
                </Button>
                <Menu
                        id="add-menu"
                        color="secondary"
                        anchorEl={anchorElAddList}
                        keepMounted
                        open={Boolean(anchorElAddList)}
                        onClose={handleCloseAddList}
                        >
                        <MenuItem>
                            <TextField id="standard-basic" label="Standard" value={listName} onChange={(sender: any) => setListName(sender.target.value)}/>
                            <CheckIcon onClick={() => {
                                const oldListsFav = localStorage.getItem('listFav')
                                
                                setNewListFav(true);
                                if (oldListsFav) {
                                    const listFav : FavoredListObject[] = JSON.parse(oldListsFav!);
                                    let object : FavoredListObject =  {name: listName, products: basket}
                                    listFav.push(object);
                                    localStorage.setItem('listFav', JSON.stringify(listFav));
                                } else {
                                    let objects : FavoredListObject[] =  [{name: listName, products: basket}]
                                    localStorage.setItem('listFav', JSON.stringify(objects));
                                }
                                setListName("");
                                handleCloseAddList();
                            }}></CheckIcon>
                        </MenuItem>
                    </Menu>

            </Grid>
        </Grid>
        <Typography
            variant="h6"
            color="secondary"
            style={{marginLeft:'auto'}}
        >Prix total : {totalPrice.toFixed(2)}€</Typography>
        <Button color='secondary' variant="outlined" 
        onClick={() => {
            confirmCartMutation().then((r) => {
                if (r.errors) {
                    console.log(r.errors[0].message)
                    notifyError("Erreur dans le payement du panier")
                } else {
                    notifySuccess("Panier payé avec succès")
                    console.log("cart confirmed")

                }
            })
        }}
        style={{marginLeft: '20px', fontSize:'17px'}}>{t('shop.payButton.label')}</Button>
    </Container>)
};

export default PriceBanner;
