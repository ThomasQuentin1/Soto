import React from 'react'
import ParametersSelect from "components/shop/ParametersSelect";
import SearchBar from "components/shop/SearchBar";
import SearchWrapperProps from "interfaces/SearchWrapper";

const SearchWrapper = ({ cartQueryRefetch, setIsBasketUpToDate } : SearchWrapperProps) => {
    // const {data, loading} = useAccountQuery()
    const [t] = useTranslation();
    const [validate, setValidate] = useState(false)

    // if (!loading) {
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