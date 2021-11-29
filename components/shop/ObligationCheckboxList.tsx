import React, { useState } from "react";
import { useTranslation } from "react-i18next"
import {useSetObligationsMutation} from "../../typing";
import {notifyError, notifySuccess} from "../../public/notifications/notificationsFunctions";
import {Switch, Typography} from "@mui/material";

export interface CheckBoxData {
    id: number
    label: string
    checked: boolean
}

interface ObligationCheckboxListProps {
    data: CheckBoxData[];
}

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
        <div style={{margin: "1em 0"}}>
            {list.map((item) => {
                return (
                    <div className="dFlex criteria_drag_list_elem" style={{justifyContent: "space-between"}}>
                        <Typography className={item.checked ? '' : "disableText"}>
                            {t(item.label)}
                        </Typography>
                        <Switch
                            checked={item.checked}
                            color="secondary"
                            onChange={() =>  {
                                handleChange(item.id).then(() => {
                                    obligationsMutation().then(res => {
                                        if (!res) {
                                            // TODO Traduction
                                            notifyError("Obligations saving failed")
                                        } else {
                                            notifySuccess("Obligations is now saved")
                                        }
                                    })
                                })
                            }}
                        />
                    </div>
                )}
            )}
        </div>
    );
};

export default ObligationCheckboxList;
