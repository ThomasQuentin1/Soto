import React from 'react'
import ParametersSelect from "components/shop/ParametersSelect";
import SearchBar from "components/shop/SearchBar";
// import { useTranslation } from "react-i18next"
import SearchWrapperProps from "interfaces/SearchWrapper";

const SearchWrapper = ({ cartQueryRefetch, setIsBasketUpToDate } : SearchWrapperProps) => {
    // const {data, loading} = useAccountQuery()
    // const [t] = useTranslation();
    // const [validate, setValidate] = useState(false)

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <ParametersSelect/>
        <div>
            <SearchBar cartQueryRefetch={cartQueryRefetch} setIsBasketUpToDate={setIsBasketUpToDate}/>
        </div>
    </div>
    );
}

export default SearchWrapper