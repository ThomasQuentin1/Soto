import React from 'react'
import ParametersSelect from "components/shop/ParametersSelect";
import SearchBar from "components/shop/SearchBar";
import { Product } from 'typing';

interface SearchWrapperProps {
    AddToCart: any;
    basket: Product[];
    setBasket:any;
}

const SearchWrapper = ({AddToCart, basket, setBasket} : SearchWrapperProps) => {
    // const {data, loading} = useAccountQuery()
    // const [t] = useTranslation();
    // const [validate, setValidate] = useState(false)

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <ParametersSelect/>
        <div>
            <SearchBar AddToCart={AddToCart} basket={basket} setBasket={setBasket}/>
        </div>
    </div>
    );
}

export default SearchWrapper