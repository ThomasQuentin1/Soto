import {Button, Divider, Input, InputAdornment, Paper} from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchBarItem from "./SeachBarItem";
import SearchBarLoadingItem from "./SeachBarLoadingItem";
import {useSearchProductLazyQuery, Product} from "../../typing";
import {Clear, Search} from "@material-ui/icons";

// this data contains only fields that are requested
const GetSelectedNbProducts = (data: any, itemsNb: number) => {
    let productsToReturn: Product[] = [];
    let counter = 0;

    data.forEach((element) => {
        counter++;
        // when we got 3 products, just ignore other for the moment
        if (counter > itemsNb) return;
        productsToReturn.push(element);
    });
    return productsToReturn;
};

interface SearchBarProps {
    AddToCart: any;
    basket: Product[];
    setBasket:any;
}

const SearchBar = ({AddToCart, basket, setBasket} : SearchBarProps) => {
  const [t] = useTranslation();
  const [input, setInput] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
    const [itemsToPrint, setItemsToPrint] = useState(3)

    const [searchProduct, {loading, data, error}] = useSearchProductLazyQuery({
        variables: {
            query: input
        },
    });

    const handleClickAway = () => {
        setOpen(false);
        setItemsToPrint(3)
    };

    const showMoreItems = () => {
        setItemsToPrint(itemsToPrint + 3)
    }
    if (error) {
        console.log(error);
        console.error("There is an error while making the search request");
    }

    let products: Product[] = [];

    // if there is something in the search bar, display loading thing or products
    if (data && input != "") {
        products = GetSelectedNbProducts(data.searchProducts, itemsToPrint);
    } else if (input === "" && open) {
        // if input is empty don't proprose items
        setOpen(false);
    }

    return (
        <ClickAwayListener onClickAway={() => handleClickAway()}>
            <div style={{position: "relative"}}>
                <div className="dFlex">
                    <Input
                        onChange={(event: any) => {
                            setInput(event.target.value);
                            searchProduct();
                            setOpen(true);
                        }}
                        onClick={() => setOpen(true)}
                        fullWidth={true}
                        placeholder={t("searchbar.placeholder.label")}
                        color="secondary"
                        endAdornment={
                            <InputAdornment position="end">
                                {input === "" ? <Search/> : <Clear style={{cursor: "pointer"}}/>}
                            </InputAdornment>
                        }
                    />
                </div>
                {loading && input != "" && open && (
                    <Grid container style={{position: "absolute"}}>
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
                )}
                {!loading && open &&
                <Paper elevation={3} variant="outlined" style={{position: "absolute", zIndex: 100, width: "100%"}}>
                    <div className="flexDirCol">
                        <div style={{maxHeight: "20vh", overflowY: "auto"}}>
                            {products.length != 0 && products.sort((a, b) => b.scoreHealth! - a.scoreHealth!).map((product, index) => {
                                return (
                                    <div key={index}>
                                        <SearchBarItem
                                            key={index}
                                            product={product}
                                            setOpen={setOpen}
                                                                AddToCart={AddToCart}
                    basket={basket}
                    setBasket={setBasket}
                                        />
                                        {
                                            index < 2 ? <Divider/> : <></>
                                        }
                                    </div>
                                );
                            })}
                        </div>
                        <Divider/>
                        <div className="alignCenter pad5">
                            <Button color="secondary" onClick={showMoreItems}>
                                {t("label.showMore")}
                            </Button>
                        </div>
                    </div>
                </Paper>
                }

            </div>
        </ClickAwayListener>
    );
};

export default SearchBar;
