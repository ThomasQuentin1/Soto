import React, { useState, useEffect } from "react";
import '../i18n'
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import ListsSearchWrapper from "../components/lists/ListsSearchWrapper";
import ListsShopList from "components/lists/ListsShopList";
import { Grid } from "@material-ui/core";
import Header from 'components/global/Header';
import Footer from 'components/global/Footer';
import { Product, useAddToCartMutation, useOldCartsQuery, Cart } from 'typing';

export interface List {
    id: string;
    name: string;
    products: Product[];
}

const AddToBasketFromHistory = (oldCart: Cart/*, basket: Product[]*/, addToCartMutation: any) => { //TODO with new basket system

    oldCart.products.map((item) => {
        for (let i = 0; i < item.itemQuantity!; i++) {
            addToCartMutation(item.id);
            console.log("Adding from history")
        }
    });
}

const RemoveFromBasketAndSessionStorage = (product: Product, lists: List[], setBasket: any, listId: string) => {
    let newLists: List[] = [];
    lists.map((list) => {
        if (list.id === listId) {
            let newList: List = { id: list.id, name: list.name, products: [] };

            list.products.map((item) => {
                if (item.id === product.id) {
                    let tmpItem = Object.assign({}, item);
                    if (tmpItem.itemQuantity != null || tmpItem.itemQuantity != undefined) {
                        tmpItem.itemQuantity -= 1;
                        if (tmpItem.itemQuantity > 0) {
                            newList.products.push(tmpItem);
                        }
                    }
                } else {
                    newList.products.push(item);
                }
            });
            newLists.push(newList);
        } else {
            newLists.push(list);
        }
    });
    setBasket(newLists);
    localStorage.setItem('listfav', JSON.stringify(newLists));
};

const AddToBasketAndSessionStorage = (product: Product, lists: List[], setBasket: any, listId: string) => {
    let modifiedItsQuantity = false;

    let newLists: List[] = [];

    lists.map((list) => {
        if (list.id === listId) {
            let newList: List = { id: list.id, name: list.name, products: [] };
            list.products.map((item) => {
                if (product.id === item.id) {
                    let tmpItem = Object.assign({}, item);
                    if (tmpItem.itemQuantity != null || tmpItem.itemQuantity != undefined) {
                        tmpItem.itemQuantity += 1;
                        newList.products.push(tmpItem);
                        modifiedItsQuantity = true;
                    } else {
                        console.error("The item has no item.itemQuantity");
                    }
                } else {
                    newList.products.push(item);
                }
            });
            if (!modifiedItsQuantity)
                newList.products.push(product);
            newLists.push(newList);
        } else {
            newLists.push(list);
        }
    });
    setBasket(newLists);
    localStorage.setItem('listfav', JSON.stringify(newLists));
};

const CreateList = (lists: List[], setBasket: any, name: string) => {
    let newLists: List[] = [];

    lists.map((item) => {
        newLists.push(item);
    });

    let id = '0'
    if (lists.length == 0) {
        id = '1';
    } else {
        id = (parseInt(lists[lists.length - 1].id) + 1).toString();
    }
    let newList: List = { name: name, id: id, products: [] }
    newLists.push(newList);
    setBasket(newLists);
    localStorage.setItem('listfav', JSON.stringify(newLists));
}

const DeleteList = (lists: List[], setBasket: any, listId: string) => {
    let newLists: List[] = []

    lists.map((item) => {
        if (item.id !== listId)
            newLists.push(item);
    });
    setBasket(newLists);
    localStorage.setItem('listfav', JSON.stringify(newLists));

}

const ListsPage = () => {
    const [theme, SetTheme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    let lng: string | null = 'fr';
    if (typeof window !== 'undefined') {
        lng = localStorage.getItem('lng');
        if (lng == null) {
            localStorage.setItem('lng', 'fr');
        }
    }
    const [loadHistory, setLoadHistory] = useState(false);
    const [lists, setLists] = useState<List[]>([]);
    const [isAnyItem, setIsAnyItem] = useState<boolean>(false);
    if (lists.length != 0 && !isAnyItem) {
        setIsAnyItem(true);
    }
    const [activeList, setActiveList] = useState('0');

    let oldCart: undefined | Cart = undefined;

    useEffect(() => {
        if (window != null && window != undefined && localStorage.getItem('listfav')) {
            let jsonString: any = localStorage.getItem('listfav');
            let listsFav: any = JSON.parse(jsonString);
            setLists(listsFav);
        }
    }, []);


    const [addToCartMutation, { }] = useAddToCartMutation({
        variables: {
            productId: "1"
        },
    });

    if (loadHistory && oldCart != undefined) {
        AddToBasketFromHistory(oldCart!/*, basket*/, addToCartMutation);
        setLoadHistory(false);
    }

    const { data: oldCartsData, loading: oldCartsLoading, error: oldCartsError } = useOldCartsQuery({
        variables: {
        },
    });


    const [cartHistory, setCartHistory] = useState<Cart[]>();

    if (oldCartsError) {
        console.log(oldCartsError)
    } else if (oldCartsData && !oldCartsLoading && !cartHistory) {
        if (oldCartsData.oldCarts) {
            setCartHistory(oldCartsData.oldCarts)
        }
    }
    console.log("test")

    return (
        <DarkModeParent theme={tmpTheme}>
            <Header {...{ theme, SetTheme }} />
            <Grid container justify="center" style={{ marginTop: '10px', height: "80%" }}>
                <Grid item xs={4}>
                    <ListsSearchWrapper AddToCart={AddToBasketAndSessionStorage} lists={lists} setBasket={setLists} CreateList={CreateList} activeList={activeList} />
                </Grid>
                <Grid item xs={12}>
                    {/* <Button onClick={() => clearCartMutation()} color="secondary">
                <Typography>Clear cart</Typography>
              </Button> */}
                </Grid>
                <Grid item xs={12}>
                    <ListsShopList AddToCart={AddToBasketAndSessionStorage} lists={lists} setBasket={setLists} RemoveFromCart={RemoveFromBasketAndSessionStorage} activeList={activeList} setActiveList={setActiveList} DeleteList={DeleteList} />
                </Grid>
            </Grid>
            <Footer />
        </DarkModeParent>
    );
};

export default ListsPage;