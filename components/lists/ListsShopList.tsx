import React from 'react';
import ListsShopItem from 'components/lists/ListsShopItem';
import {List} from "pages/lists";
import {Button, Grid, Typography} from '@mui/material';
import Router from "next/router";
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface ListsShopListProps {
    AddToCart: any;
    lists: List[];
    setBasket: any;
    RemoveFromCart: any;
    cartQueryRefetch?: any;
    setIsBasketUpToDate?: any;
    activeList: string;
    setActiveList: any;
    DeleteList: any;
}

const AddListToCurrentShoppingCart = (lists: List[], activeList: string) => {
    lists.map((list) => {
        if (list.id === activeList) {
            localStorage.setItem('listfavToAdd', JSON.stringify(list));
        }
    });
}

const ListsShopList = ({
                           AddToCart,
                           lists,
                           setBasket,
                           RemoveFromCart,
                           activeList,
                           setActiveList,
                           DeleteList
                       }: ListsShopListProps) => {

    let currentList: List = {id: '0', name: '', products: []};

    lists.map((item) => {
        if (item.id === activeList)
            currentList = Object.assign({}, item);
    })

    return (
        <Grid container style={{display: "flex", flexDirection: "row"}}>
            <Grid style={{
                display: "flex",
                flexDirection: "column",
                margin: '0px',
                justifyContent: 'flex-start',
                position: 'absolute',
                left: '15px',
                bottom: '350px'
            }}>
                {lists.map((item, index) => {
                    return (<Grid key={index} onClick={() => {
                        setActiveList(item.id)
                    }}><Typography
                        style={{textDecoration: activeList === item.id ? "underline" : "none"}}>{item.name}</Typography></Grid>)
                })}
            </Grid>
            <Grid item xs={10}>
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
            <Button onClick={() => {
                AddListToCurrentShoppingCart(lists, activeList);
                Router.push("/shop");
            }}
                    style={{position: "absolute", right: '115px', bottom: '350px'}}>Ajouter liste au
                panier
                <AddIcon/>
            </Button>
            <Button onClick={() => DeleteList(lists, setBasket, activeList)}
                    style={{position: "absolute", right: '15px', bottom: '350px'}}><DeleteForeverIcon/></Button>
        </Grid>
    );
}

export default ListsShopList