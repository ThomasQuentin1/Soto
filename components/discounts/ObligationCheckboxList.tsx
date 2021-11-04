import React, { useState } from "react";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useTranslation } from "react-i18next"
import {useSetObligationsMutation} from "../../typing";
import {notifyError, notifySuccess} from "../../public/notifications/notificationsFunctions";

export interface CheckBoxData {
    id: number
    label: string
    checked: boolean
}

interface ObligationCheckboxListProps {
    data: CheckBoxData[];
}

// const handleChange = (list : CheckBoxData[], setList : React.Dispatch<React.SetStateAction<CheckBoxData[]>>, id : number) => {
//     let newList : CheckBoxData[] = [];
//     list.map((item) => newList.push(item));
//     let index = list.findIndex((item) => item.id == id);
//     newList[index].checked = !list[index].checked;
//     setList(newList);
// };


const ObligationCheckboxList = (data : ObligationCheckboxListProps) => {
    const [t] = useTranslation();
    const [list, setList] = useState<CheckBoxData[]>(data.data);
    const [obligationsMutation] = useSetObligationsMutation({
        variables: {
            obligations: list.filter(item => item.checked).map(function (item) {
                return {id: item.id}
            })
        }
    })

    function handleChange(itemId: number) {
        return new Promise(resolve => {
            let newList : CheckBoxData[] = [];
            list.map((item) => newList.push(item));
            let index = list.findIndex((item) => item.id == itemId);
            newList[index].checked = !list[index].checked;
            setList(newList);
            resolve(true)
        })
    }

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
                                    onChange={() =>  {
                                        handleChange(item.id).then(() => {
                                            obligationsMutation().then(res => {
                                                if (!res) {
                                                    notifyError("Obligations saving failed")
                                                } else {
                                                    notifySuccess("Obligations is now saved")
                                                }
                                            })
                                        })
                                    }}
                                    name={item.label}
                                    color="primary"
                                />}
                            label={t(item.label)}
                        />)
                })}
            </FormGroup>

        </div>);
};

export default ObligationCheckboxList;
