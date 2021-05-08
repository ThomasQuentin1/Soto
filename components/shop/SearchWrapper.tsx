import React from 'react'
import ParametersSelect from "components/shop/ParametersSelect";
import SearchBar from "components/shop/SearchBar";
import SearchWrapperProps from "interfaces/SearchWrapper";
import {useTranslation} from "react-i18next";
import { Button } from '@material-ui/core';
// import {useAccountQuery} from "../../typing";

const SearchWrapper = ({ cartQuery } : SearchWrapperProps) => {

    // if (!loading) {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <ParametersSelect/>
        <div>
            <SearchBar cartQuery={cartQuery}/>
        </div>
    </div>
    );
    // } else {
    //     return <></>
    // }
}

export default SearchWrapper