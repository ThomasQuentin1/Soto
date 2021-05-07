import React, {useState} from 'react'
import ParametersSelect from "components/shop/ParametersSelect";
import SearchBar from "components/shop/SearchBar";
import SearchWrapperProps from "interfaces/SearchWrapper";
import {useTranslation} from "react-i18next";
import { Button } from '@material-ui/core';
// import {useAccountQuery} from "../../typing";

const SearchWrapper = ({basket, setBasket, cartQuery} : SearchWrapperProps) => {
    // const {data, loading} = useAccountQuery()
    const [t] = useTranslation();
    const [validate, setValidate] = useState(false)

    // if (!loading) {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <ParametersSelect validate={validate} setValidate={setValidate}/>
            <Button variant="contained" color="primary" onClick={() => {
                            setValidate(true)
                        }}>
                            {t("label.general.validate")}
            </Button>
        <div>
            <SearchBar basket={basket} setBasket={setBasket} cartQuery={cartQuery}/>
        </div>
    </div>
    );
    // } else {
    //     return <></>
    // }
}

export default SearchWrapper