import React from 'react'
import ParametersSelect from "components/shop/ParametersSelect";
import SearchBar from "components/shop/SearchBar";
import SearchWrapperProps from "interfaces/SearchWrapper";
// import {useAccountQuery} from "../../typing";

const SearchWrapper = ({basket, setBasket} : SearchWrapperProps) => {

    // if (!loading) {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <ParametersSelect/>
        <div>
            <SearchBar basket={basket} setBasket={setBasket}/>
        </div>
    </div>
    );
    // } else {
    //     return <></>
    // }
}

export default SearchWrapper