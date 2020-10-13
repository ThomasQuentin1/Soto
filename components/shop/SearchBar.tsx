import React from 'react'
import { useTranslation } from "react-i18next"
import Input from '@material-ui/core/Input';

const SearchBar = () => {
    const [t] = useTranslation();

    return (
        <Input fullWidth={true} placeholder={t("searchbar.placeholder.label")} color='secondary'/>
    );
}

export default SearchBar