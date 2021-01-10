import React from 'react'
import ParametersSelect from "components/shop/ParametersSelect";
import SearchBar from "components/shop/SearchBar";
import {CheckBoxData} from "./ObligationCheckboxList";

interface Props {
    setCriteria: (items: Array<string>) => void;
    setObligations: (items: CheckBoxData[]) => void;
}

const SearchWrapper = (props: Props) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <ParametersSelect shop={true} setCriteria={props.setCriteria} setObligations={props.setObligations}/>
        <div>
            <SearchBar></SearchBar>
        </div>
    </div>
    );
}

export default SearchWrapper