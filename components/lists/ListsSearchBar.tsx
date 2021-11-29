// import { useLazyQuery, gql } from "@apollo/client";
import {Divider, Input, Paper} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ListsSearchBarItem from "./ListsSeachBarItem";
import SearchBarLoadingItem from "../shop/SeachBarLoadingItem";
import { useSearchProductLazyQuery, Product } from "../../typing";
import { List } from "pages/lists";

// this data contains only fields that are requested
const GetThreeFirstProducts = (data: any) => {
  let productsToReturn: Product[] = [];
  let counter = 0;

  data.forEach((element) => {
    counter++;
    // when we got 3 products, just ignore other for the moment
    if (counter > 3) return;
    productsToReturn.push(element);
  });
  return productsToReturn;
};

const handleClickAway = (setOpen: any) => {
  setOpen(false);
};

interface ListsSearchBarProps {
    AddToCart: any;
    lists: List[];
    setBasket:any;
    activeList: string;
}

const ListsSearchBar = ({AddToCart, lists, setBasket, activeList} : ListsSearchBarProps) => {
  const [t] = useTranslation();
  const [input, setInput] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const [searchProduct, { loading, data, error }] = useSearchProductLazyQuery({
    variables: {
      query: input
    },
  });
 
  if (error) {
    console.log(error);
    console.error("There is an error while making the search request");
  }
  
  let threeFirstProducts: Product[] = [];

  // if there is something in the search bar, display loading thing or products
  if (data && input != "") {
    threeFirstProducts = GetThreeFirstProducts(data.searchProducts);
  } else if (input === "" && open) {
    // if input is empty don't proprose items
    setOpen(false);
  }

  return (
    <ClickAwayListener onClickAway={() => handleClickAway(setOpen)}>
      <div style={{ position: "relative" }}>
        <Input
          onChange={(event: any) => {
            searchProduct();
            setInput(event.target.value);
            setOpen(true);
          }}
          onClick={() => setOpen(true)}
          fullWidth={true}
          placeholder={t("searchbar.placeholder.label")}
          color="secondary"
        />
        {loading && input != "" && open && (
          <Grid container style={{ position: "absolute" }}>
            <Grid item xs={12}>
              <SearchBarLoadingItem />
            </Grid>
            <Grid item xs={12}>
              <SearchBarLoadingItem />
            </Grid>
            <Grid item xs={12}>
              <SearchBarLoadingItem />
            </Grid>
          </Grid>
        )}
        <Paper elevation={3} variant="outlined" style={{ position: "absolute", zIndex: 100, width: "100%" }}>
          {!loading &&
            open &&
            threeFirstProducts.length != 0 &&
            threeFirstProducts.sort((a, b) => b.scoreHealth! - a.scoreHealth!).map((product, index) => {
              return (
                  <div key={index}>
                  <ListsSearchBarItem
                    key={index}
                    product={product}
                    setOpen={setOpen}
                    AddToCart={AddToCart}
                    lists={lists}
                    setBasket={setBasket}
                    activeList={activeList}
                  />
                  {
                    index < 2 ? <Divider/> : <></>
                  }
                  </div>
              );
            })}
        </Paper>
      </div>
    </ClickAwayListener>
  );
};

export default ListsSearchBar;
