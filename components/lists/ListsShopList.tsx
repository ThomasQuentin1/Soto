import React from 'react';
import ListsShopItem from 'components/lists/ListsShopItem';
import {List} from "pages/lists";
import {Grid} from '@mui/material';

interface ListsShopListProps {
    AddToCart: any;
    lists: List[];
    setBasket: any;
    RemoveFromCart: any;
    cartQueryRefetch?: any;
    setIsBasketUpToDate?: any;
    activeList: string;
    setActiveList: any;
}

const ListsShopList = ({
                           AddToCart,
                           lists,
                           setBasket,
                           RemoveFromCart,
                           activeList,
                       }: ListsShopListProps) => {

    let currentList: List = {id: '0', name: '', products: []};

    lists.map((item) => {
        if (item.id === activeList)
            currentList = Object.assign({}, item);
    })

    return (
        <Grid container style={{display: "flex", flexDirection: "row"}}>
            <Grid item xs={12}>
                <Grid container justifyContent={"center"} alignItems={"flex-start"}>
                    {currentList.products && currentList.products.length != 0 && currentList.id != '0' && currentList.products.map((item, index) => {
                        return (
                            <ListsShopItem key={index} product={item} AddToCart={AddToCart} lists={lists}
                                           setBasket={setBasket} RemoveFromCart={RemoveFromCart}
                                           activeList={activeList}/>
                        );
                    })}
                </Grid>
            </Grid>

        </Grid>
    );
}

export default ListsShopList