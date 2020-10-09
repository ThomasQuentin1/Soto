import React from 'react'
import Button from '@material-ui/core/Button';
import {useTranslation } from "react-i18next"

const ObligationButton = () => {
    const [t] = useTranslation();

    return (
        <Button color='secondary'>
            {t('button.obligation.label')}
        </Button>
    )
}

export default ObligationButton