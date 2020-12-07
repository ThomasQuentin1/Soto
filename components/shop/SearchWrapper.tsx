import React from 'react'
import ParametersSelect from "components/shop/ParametersSelect";
import SearchBar from "components/shop/SearchBar";
import SearchWrapperProps from "interfaces/SearchWrapper";

const SearchWrapper = ({basket, setBasket} : SearchWrapperProps) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {/*<ParametersSelect shop={true} setCriteria={props.setCriteria} setObligations={props.setObligations}/>*/}
            <ParametersSelect shop={true}/>
        <div>
            <SearchBar basket={basket} setBasket={setBasket}/>
        </div>
    </div>
    );
}

export default SearchWrapper