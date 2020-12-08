import React, { useState } from 'react'
import { useTranslation } from "react-i18next"
import { Input } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import Grid from "@material-ui/core/Grid";
import SearchBarLoadingItem from './SeachBarLoadingItem';
import SearchBarItem from './SeachBarItem';
import CountableProduct from 'interfaces/CountableProduct';
import SearchBarProps from 'interfaces/SeachBar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


const GET_PRODUCTS = gql`
    query LookForProducts ($name: String!) {
        searchProducts(query : $name) {
        name
        brand
        priceUnit
        priceMass
        nutriscore
        scoreHealth
        scoreEnvironment
        quantity
        }
    }
`;
// this data contains only fields that are requested
const GetThreeFirstProducts = (data: any) => {
    let countableProductsToReturn : CountableProduct[] = [];
    let counter = 0;

    data.forEach((element) => {
        counter++;
        // when we got 3 products, just ignore other for the moment
        if (counter > 3)
            return;
        let countableProduct = {product: {}, quantity: 0} as CountableProduct;
        countableProduct.product.name = element.name;
        countableProduct.product.price = Number(element.priceUnit);
        countableProduct.product.brand = element.brand;
        countableProduct.product.score = element.scoreHealth;
        countableProduct.product.quantity = element.quantity;
        countableProduct.quantity = 1;
        countableProductsToReturn.push(countableProduct);
    });
    return countableProductsToReturn;
}

const handleClickAway = (setOpen: any) => {
    setOpen(false);
};

const SearchBar = ({basket, setBasket} : SearchBarProps) => {
    const [t] = useTranslation();
    const [input, setInput] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const { loading, error, data } = useQuery(GET_PRODUCTS, {
        variables : { name : input},
    });
    if (error) {
        console.error('There is an error while making the search request');
    }
    let threeFirstProducts : CountableProduct[] = [];

    // if there is something in the search bar, display loading thing or products
    if (data && input != "") {
        threeFirstProducts = GetThreeFirstProducts(data.searchProducts);
    } else if (input === "" && open) {
        // if input is empty don't proprose items
        setOpen(false);
    }

    return (
        <ClickAwayListener onClickAway={() => handleClickAway(setOpen)}>

        <div style={{position:"relative"}}>
            <Input onChange={(event: any) => {
                setInput(event.target.value);
                setOpen(true);
            }}
            onClick={() => setOpen(true)}
            fullWidth={true} placeholder={t("searchbar.placeholder.label")} color='secondary'/>
                {loading && input != "" && open &&

                    <Grid container style={{position:'absolute'}}>
                        <Grid item xs={12}>
                            <SearchBarLoadingItem/>
                        </Grid>
                        <Grid item xs={12}>
                            <SearchBarLoadingItem/>
                        </Grid>
                        <Grid item xs={12}>
                            <SearchBarLoadingItem/>
                        </Grid>
                    </Grid>
                }
                <Grid container style={{position:'absolute', zIndex:100}}>
                    {!loading && open && threeFirstProducts.length != 0 && threeFirstProducts.map((countableProduct, index) => {
                        return (
                        <Grid item xs={12} key={index}>
                            <SearchBarItem countableProduct={countableProduct} basket={basket} setBasket={setBasket} setOpen={setOpen}/>
                        </Grid>);
                    })}
                </Grid>
        </div>
            </ClickAwayListener>
    );
}

export default SearchBar