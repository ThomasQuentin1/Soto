import React from 'react'
import ParametersSelect from "components/shop/ParametersSelect";
import ListsSearchBar from "components/lists/ListsSearchBar";
import { List } from "pages/lists";
import { Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';

interface ListsSearchWrapperProps {
    AddToCart: any;
    lists: List[];
    setBasket:any;
    CreateList: any;
    activeList: string;
}

const ListsSearchWrapper = ({AddToCart, lists, setBasket, CreateList, activeList} : ListsSearchWrapperProps) => {
    const [value, setValue] = useState("");

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <ParametersSelect/>
        <div>
            <ListsSearchBar AddToCart={AddToCart} lists={lists} setBasket={setBasket} activeList={activeList}/>
        </div>
        <div>
            <TextField id="standard-basic" label="Ajouter une liste" onChange={(e) => {setValue(e.target.value)}}/>
            <Button onClick={() => {
                if (value != "") {
                    CreateList(lists, setBasket, value);
                    setValue("");
                }
            }}><AddIcon/></Button>
        </div>
    </div>
    );
}

export default ListsSearchWrapper