import React, {useState} from 'react'
import ParametersSelect from "components/shop/ParametersSelect";
import SearchBar from "components/shop/SearchBar";
import SearchWrapperProps from "interfaces/SearchWrapper";
import {useAccountQuery} from "../../typing";

const SearchWrapper = ({basket, setBasket} : SearchWrapperProps) => {
    const {data, loading} = useAccountQuery()
    const [validate, setValidate] = useState(false)

    if (!loading) {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <ParametersSelect shop={true} account={data.account} validate={validate} setValidate={setValidate}/>
        <div>
            <SearchBar basket={basket} setBasket={setBasket}/>
        </div>
    </div>
    );
    } else {
        return <></>
    }
}

export default SearchWrapper