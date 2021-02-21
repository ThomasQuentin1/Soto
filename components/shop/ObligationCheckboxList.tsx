import React, { useState } from "react";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useTranslation } from "react-i18next"

export interface CheckBoxData {
    id: number
    label: string
    checked: boolean
}

interface ObligationCheckboxListProps {
    data: CheckBoxData[];
    // setObligations: (list: CheckBoxData[]) => void
}

// const SendToBack = () => {
// }

const handleChange = (list : CheckBoxData[], setList : React.Dispatch<React.SetStateAction<CheckBoxData[]>>, id : number) => {
    let newList : CheckBoxData[] = [];
    list.map((item) => newList.push(item));
    let index = list.findIndex((item) => item.id == id);
    newList[index].checked = !list[index].checked;
    setList(newList);
    // props.setObligations(newList)
};

    
const ObligationCheckboxList = (data : ObligationCheckboxListProps) => {
    const [t] = useTranslation();
    
    const [list, setList] = useState<CheckBoxData[]>(data.data);
    return (
    <div>
        <FormGroup>
            {list.map((item, index) => {
                return (
                <FormControlLabel
                key={index}
                control={
                    <Checkbox
                        checked={item.checked}
                        onChange={() => handleChange(list, setList, item.id)}
                        name={item.label}
                        color="secondary"
                    />}
                label={t(item.label)}
                />)
            })}

        </FormGroup>

    </div>);
};

export default ObligationCheckboxList;
