import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next"
import DragList from './DragList';
import ObligationCheckboxList, { CheckBoxData } from './ObligationCheckboxList';

const data : CheckBoxData[] = [
    {value: 'vegetarian', label: 'obligation.vegetarian', checked: false},
    {value: 'vegan', label: 'obligation.vegan', checked: false},
    {value: 'peanut_free', label: 'obligation.peanut_free', checked: true},
    {value: 'lactose_free', label: 'obligation.lactose_free', checked: true},
    {value: 'halal', label: 'obligation.halal', checked: true},
    {value: 'kosher', label: 'obligation.kosher', checked: true}
];

const returnButtonToggle = (criteriaIsActive : Boolean, obligationIsActive : Boolean) => {
    if (criteriaIsActive) {
        return(<DragList></DragList>);
    } else if (obligationIsActive) {
        return(<ObligationCheckboxList data={data}></ObligationCheckboxList>);
    } else {
        return(<></>) // Display nothing
    }
}

const ParametersSelect = () => {
    const [t] = useTranslation();
    const [criteriaIsActive, setCriteriaIsActive] = useState<Boolean>(false);
    const [obligationIsActive, setObligationIsActive] = useState<Boolean>(false);

    const buttonToggle = returnButtonToggle(criteriaIsActive, obligationIsActive);

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Button color='secondary' variant={criteriaIsActive ? "outlined" : undefined} onClick={() => {
                setCriteriaIsActive(!criteriaIsActive);
                if (obligationIsActive)
                    setObligationIsActive(!obligationIsActive);
            }}>
                {t('button.criteria.label')}
            </Button>
            <Button color='secondary' variant={obligationIsActive ? "outlined" : undefined} onClick={() => {
                setObligationIsActive(!obligationIsActive);
                if (criteriaIsActive)
                    setCriteriaIsActive(!criteriaIsActive);
            }}>
                {t('button.obligation.label')}
            </Button>
            </div>
            <div>
                {buttonToggle}
            </div>
        </div>
    );
}

export default ParametersSelect