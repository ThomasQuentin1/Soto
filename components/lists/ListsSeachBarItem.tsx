import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Typography, CardMedia } from '@material-ui/core';
import { Product } from "typing";
import { List } from "pages/lists";

interface ListsSearchBarItemProps {
    product: Product;
    setOpen: any;
    AddToCart: any;
    lists: List[];
    activeList: string;
    setBasket: any;
    cartQueryRefetch?: any;
    setIsBasketUpToDate?: any;
}

const SearchBarItem = ({ product, setOpen, AddToCart, lists, setBasket, activeList }: ListsSearchBarItemProps) => {
    let scoreColor: string = "red";

    if (product.scoreHealth! >= 40) {
        scoreColor = "orange";
    }
    if (product.scoreHealth! >= 75) {
        scoreColor = "green";
    }
    return (
        <Grid container style={{ display: 'flex', flexDirection: 'row', cursor: "pointer" }} className="item_search_bar" onClick={() => {
            if (activeList != "0") {
                let tmpProduct = Object.assign({}, product);
                tmpProduct.itemQuantity = 1;
                AddToCart(tmpProduct, lists, setBasket, activeList);
                setOpen(false);
            }
        }
        }>
            <Grid item xs={4}>
                <CardMedia
                    style={{ width: '100%', height: '100%' }}
                    image={product.photo ?? ""}>
                </CardMedia>
            </Grid>
            <Grid
                item xs={8} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {/** This is the dot that show the score next to the product */}
                <div style={{ position: 'relative' }}>
                    <Typography variant="subtitle2" style={{ right: '10px', position: 'absolute', fontWeight: 'bold', color: scoreColor }}>Score : {product.scoreHealth!}%</Typography>
                </div>

                <Container><Typography variant="h6" style={{ marginTop: '19px' }}>{product.name}</Typography></Container>
                <Container>Marque : {product.brand}</Container>
                <Container>{Number(product.priceUnit).toFixed(2)}€</Container>
            </Grid>
        </Grid>

    );
}

export default SearchBarItem