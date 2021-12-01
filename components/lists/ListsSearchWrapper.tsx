import React from 'react'
import ParametersSelect from "components/shop/ParametersSelect";
import ListsSearchBar from "components/lists/ListsSearchBar";
import {List} from "pages/lists";
import {Button, Grid, IconButton, InputAdornment, OutlinedInput, TextField} from '@mui/material';
import {useState} from 'react';
import AddIcon from "@mui/icons-material/Add";
import Router from "next/router";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface ListsSearchWrapperProps {
    AddToCart: any;
    lists: List[];
    setBasket: any;
    CreateList: any;
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

const ListsSearchWrapper = ({AddToCart, lists, setBasket, CreateList, activeList, setActiveList, DeleteList}: ListsSearchWrapperProps) => {
    const [value, setValue] = useState(lists.length > 0 ? lists[0].name : "");
    const [newList, setNewList] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        setActiveList(lists.find((item) => {
            return item.name === event.target.value
        })?.id)
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewList(event.target.value)
    }

    return (
        <>
            <Grid container justifyContent={"center"}>
                <Grid item xs={4}>
                    <ParametersSelect/>
                </Grid>
                <Grid item xs={10}>
                    <Grid container className="flexWidthFull" style={{alignItems: "baseline"}} spacing={2}>
                        <Grid item xs={3} className={"dFlex"}>
                            <div hidden={value != "new"}>
                                <OutlinedInput value={newList} onChange={handleTextChange} label={"New List Name"}
                                               endAdornment={
                                                   <InputAdornment position={"end"}>
                                                       <IconButton onClick={() => {
                                                           if (newList != "")
                                                               CreateList(lists, setBasket, newList);
                                                           setValue(newList);
                                                           setNewList("");
                                                       }}
                                                                   edge={"end"}>
                                                           <AddIcon/>
                                                       </IconButton>
                                                   </InputAdornment>
                                               }/>
                            </div>
                            <TextField value={value} className="flexWidthFull" select onChange={handleChange}
                                       label="Lists" SelectProps={{native: true}}>
                                <option hidden={true}>Choisir une liste</option>
                                <optgroup label="Listes enregistrées">
                                    {lists.map((item) => {
                                        return (<option value={item.name} key={item.id}>
                                            {item.name}
                                        </option>)
                                    })}
                                </optgroup>
                                <optgroup label="">
                                    <option value={"new"} key={"new"}>
                                        Ajouter une nouvelle liste
                                    </option>
                                </optgroup>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <ListsSearchBar AddToCart={AddToCart} lists={lists} setBasket={setBasket}
                                            activeList={activeList}/>
                        </Grid>
                        <Grid item xs={3} justifyContent={"center"}>
                            <Button variant="text" color="secondary" onClick={() => {
                                AddListToCurrentShoppingCart(lists, activeList);
                                Router.push("/shop");
                            }}>
                                Ajouter liste au panier<AddIcon color="secondary"/>
                            </Button>
                            <Button onClick={() => DeleteList(lists, setBasket, activeList)}>
                                <DeleteForeverIcon color="secondary"/>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default ListsSearchWrapper