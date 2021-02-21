import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next"
import DragList, {CriteriaData} from './DragList';
import ObligationCheckboxList, { CheckBoxData } from './ObligationCheckboxList';
import {criteriaBaseData, obligationsBaseData} from "../../public/values";

interface Props {
    shop: boolean
    criteria?: CriteriaData[]
    obligations?: CheckBoxData[]
}

/*interface Setters {
    setCriteria: (items: CriteriaData[]) => void;
    setObligations: (items: CheckBoxData[]) => void;
}*/

const returnButtonToggle = (criteriaIsActive : Boolean, obligationIsActive : Boolean, props: Props) => {
    if (criteriaIsActive) {
        return(<DragList criteriaData={props.shop ? props.criteria! : criteriaBaseData}/>);
    } else if (obligationIsActive) {
        return(<ObligationCheckboxList data={props.shop ? props.obligations! : obligationsBaseData}/>);
    } else {
        return(<></>) // Display nothing
    }
}

const ParametersSelect = (props: Props) => {
    const [t] = useTranslation();
    const [criteriaIsActive, setCriteriaIsActive] = useState<Boolean>(!props.shop);
    const [obligationIsActive, setObligationIsActive] = useState<Boolean>(false);
    const buttonToggle = returnButtonToggle(criteriaIsActive, obligationIsActive, props);

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Button color='secondary' variant={criteriaIsActive ? "outlined" : undefined} onClick={() => {
                if (!props.shop && !criteriaIsActive || props.shop)
                    setCriteriaIsActive(!criteriaIsActive);
                if (obligationIsActive)
                    setObligationIsActive(!obligationIsActive);
            }}>
                {t('button.criteria.label')}
            </Button>
            <Button color='secondary' variant={obligationIsActive ? "outlined" : undefined} onClick={() => {
                if (!props.shop && !obligationIsActive || props.shop)
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