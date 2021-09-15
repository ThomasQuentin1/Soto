import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {Product, Cart, useAddToCartMutation} from 'typing';
import {months} from "./HistoryItem";
import {useTranslation} from "react-i18next";

interface HistoryShortCutItemProps {
    cart: Cart;
    basket?: Product[];
    setBasket?: any;
    cartQueryRefetch: any;
}

const GetTotalOfProducts = (products: Product[]) => {
    let total: number = 0;
    products.map((item: Product) => {
        total += item.itemQuantity!;
    });
    return total;
}

const AddOldCartToCurrentCart = (oldCart: Cart/*, basket: Product[], setBasket: any*/, addToCartMutation: any, cartQueryRefetch: any) => {
    oldCart.products.map((item) => {
        for (let i = 0; i < item.itemQuantity!; i++) {
            addToCartMutation({variables: {productId: item.id}});
        }
    });
    cartQueryRefetch();
}

const HistoryShortCutItem = ({cart, cartQueryRefetch}: HistoryShortCutItemProps) => {
    const [t] = useTranslation()
    const [isDetailsToggled, setIsDetailsToggled] = useState(false);
    const date = new Date(cart.dateLastEdit);
    const formatedDate = date.getDate() + ' ' + t(months[date.getMonth()]) + " " + date.getFullYear();
    const totalOfProducts = GetTotalOfProducts(cart.products);

    //create mutation with default parameter
    const [addToCartMutation] = useAddToCartMutation({
        variables: {
            productId: '1'
        },
    });

    if (!cart)
        return <p>Invalid cart</p>;
    return (
        <Grid item className="history_short_cut_item">
            <Grid container style={{paddingLeft: '10px'}}>
                <Grid item xs={12} style={{marginBottom: '5px'}}>
                    <Typography>{formatedDate}</Typography>
                    <Typography>{t("label.products_number")} {totalOfProducts}</Typography>

                </Grid>
                {/* When details are displayed */}
                {isDetailsToggled &&
                <Grid item xs={12}>
                    {cart.products.map((item) => {
                        return (
                            <Typography>{item.name} | {item.itemQuantity}x</Typography>
                        )
                    })}
                </Grid>
                }
                {/* When details are not displayed */}
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Grid container justify='space-between'>
                            <Button onClick={() => setIsDetailsToggled(!isDetailsToggled)}>
                                {!isDetailsToggled &&
                                <>
                                    {t("label.showMore")}
                                    <ExpandMoreIcon/>
                                </>
                                }
                                {isDetailsToggled &&
                                <>
                                    {t("label.showLess")}
                                    <ExpandLessIcon/>
                                </>
                                }
                            </Button>
                            <Button color='secondary'
                                    onClick={() => AddOldCartToCurrentCart(cart, addToCartMutation, cartQueryRefetch)}>
                                {t("label.addToCart")}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default HistoryShortCutItem;