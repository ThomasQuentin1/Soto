import React from "react"
import ParametersSelect from "../../shop/ParametersSelect";
import {useSetCriterionsMutation} from "../../../typing";
import {CriteriaData} from "../../shop/DragList";

interface Props {
    criteria: CriteriaData[]
}

const Step2 = (props : Props) => {
    const [criteriaMutation] = useSetCriterionsMutation({
        variables: {
            criterias: props.criteria.map(function (item, index) {
                return {id: item.id, position: index + 1}
            })
        }
    })
    criteriaMutation().then(() => {})
    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <ParametersSelect/>
            </div>
        </div>
    );
}

export default Step2;
