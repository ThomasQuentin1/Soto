import React from 'react'
import CriteriaButton from "components/shop/CriteriaButton";
import ObligationButton from "components/shop/ObligationButton";
import SearchBar from "components/shop/SearchBar";

const SearchWrapper = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <CriteriaButton></CriteriaButton>
            <ObligationButton></ObligationButton>
        </div>
        <div>
            <SearchBar></SearchBar>
        </div>
    </div>
    );
}

export default SearchWrapper