import React from 'react'
import ParametersSelect from "components/shop/ParametersSelect";
import SearchBar from "components/shop/SearchBar";
// import {CheckBoxData} from "./ObligationCheckboxList";
// import {CriteriaData} from "./DragList";

// interface Props {
//     setCriteria: (items: CriteriaData[]) => void;
//     setObligations: (items: CheckBoxData[]) => void;
// }

const SearchWrapper = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {/*<ParametersSelect shop={true} setCriteria={props.setCriteria} setObligations={props.setObligations}/>*/}
            <ParametersSelect shop={true}/>
        <div>
            <SearchBar></SearchBar>
        </div>
    </div>
    );
}

export default SearchWrapper