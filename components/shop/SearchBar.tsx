// import { useLazyQuery, gql } from "@apollo/client";
import {Divider, Input, Paper} from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grid from "@material-ui/core/Grid";
import SearchBarProps from "interfaces/SeachBar";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchBarItem from "./SeachBarItem";
import SearchBarLoadingItem from "./SeachBarLoadingItem";
import { useSearchProductLazyQuery, Product } from "../../typing";

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

// const ObligationsQuery = () => {
//   const {loading, data, error} = useObligationsQuery();
//   let array : ObligationInput[] = [];
//   data.obligations.forEach((elem) => {
//     const newElem : ObligationInput = {id: elem.id}
//     array.push(newElem);
//   });
//   return array;
// }

// const CriterionsQuery = () => {
//   const {loading, data, error} = useCriterionsQuery();
//   let array : CriterionInput[] = [];
//   data.criterions.forEach((elem) => {
//     const newElem : CriterionInput = {id: elem.id, position: elem.position}
//     array.push(newElem);
//   });
//   return array;
// }

// const AccountQuery = () => {
//   const {loading, data, error} = useAccountQuery();
//   return data.currentShop.id;
// }

const SearchBar = ({ cartQueryRefetch, setIsBasketUpToDate }: SearchBarProps) => {
  const [t] = useTranslation();
  const [input, setInput] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const [searchProduct, { loading, data, error }] = useSearchProductLazyQuery({
    variables: {
      query: input
    },
  });
 
  // const dataObligations = ObligationsQuery();
  // const dataCriterions = CriterionsQuery();
  // const dataAccount = AccountQuery();
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
                // <Grid item xs={12} key={index}>
                  <>
                  <SearchBarItem
                    key={index}
                    product={product}
                    setOpen={setOpen}
                    cartQueryRefetch={cartQueryRefetch}
                    setIsBasketUpToDate={setIsBasketUpToDate}
                  />
                  {
                    index < 2 ? <Divider/> : <></>
                  }
                  </>

                // </Grid>
              );
            })}
        </Paper>
      </div>
    </ClickAwayListener>
  );
};

export default SearchBar;
