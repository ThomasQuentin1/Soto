import React from 'react'
import ParametersSelect from "components/shop/ParametersSelect";
import SearchBar from "components/shop/SearchBar";

const SearchWrapper = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <ParametersSelect/>
        <div>
            <SearchBar></SearchBar>
        </div>
    </div>
    );
}

export default SearchWrapper