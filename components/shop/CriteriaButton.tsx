import React from 'react'
import Button from '@material-ui/core/Button';
import {useTranslation } from "react-i18next"

const CriteriaButton = () => {
    const [t] = useTranslation();

    return (
        <Button color='secondary'>
            {t('button.criteria.label')}
        </Button>
    )
}

export default CriteriaButton