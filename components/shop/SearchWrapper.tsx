import React from 'react'
import ParametersSelect from "components/shop/ParametersSelect";
import SearchBar from "components/shop/SearchBar";
import SearchWrapperProps from "interfaces/SearchWrapper";

const SearchWrapper = ({ cartQuery } : SearchWrapperProps) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <ParametersSelect/>
        <div>
            <SearchBar cartQuery={cartQuery}/>
        </div>
    </div>
    );
}

export default SearchWrapper