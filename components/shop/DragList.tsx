import React, {useState} from "react";
import {List, arrayMove} from 'react-movable';
import {useTranslation} from "react-i18next";
import {useSetCriterionsMutation} from "../../typing";
import {notifyError, notifySuccess} from "../../public/notifications/notificationsFunctions";
// import { Transition } from 'react-transition-group';
import {Player} from '@lottiefiles/react-lottie-player';
import {Grid} from "@material-ui/core";

export interface CriteriaData {
    id: number
    position: number
    name: string
    activated: boolean
}

interface Props {
    criteriaData: CriteriaData[];
}

const DragList = (props: Props) => {
    const [t] = useTranslation();

    const [items, setItems] = useState(props.criteriaData);

    const [criteriaMutation] = useSetCriterionsMutation({
        variables: {
            criterias: items.map(function (item, index) {
                return {id: item.id, position: index + 1}
            })
        }
    })
    return (
        <>
            <Grid container>
                <Grid item xs={11}>
                    <List
                        lockVertically={true}
                        values={items}
                        onChange={({oldIndex, newIndex}) => {
                            setItems(arrayMove(items, oldIndex, newIndex))
                            items.forEach((elem, index) => {
                                elem.position = index + 1
                            })
                            criteriaMutation().then(res => {
                                if (!res) {
                                    notifyError("Criteria saving failed")
                                } else {
                                    notifySuccess("New Criterias are now saved")
                                }
                            })
                        }}
                        renderList={({children, props}) =>
                            <ul
                                {...props}
                                style={{
                                    paddingLeft: "8px",
                                    paddingRight: "8px",
                                    cursor: 'grab',
                                }}>
                                {children}
                            </ul>
                        }
                        renderItem={({value, props, index}) =>
                            <li
                                {...props}
                                style={{
                                    ...props.style,
                                    listStyleType: "none",
                                }}
                                className="criteria_drag_list"
                            >
                                <div className="dFlex criteria_drag_list_elem" style={{alignItems: "center"}}>
                                    <div style={{marginRight: "10px"}}>
                                        {index! + 1}.
                                    </div>
                                    <div className=" flexWidthFull">
                                        {" " + t(value.name)}
                                    </div>
                                </div>

                            </li>
                        }
                    />
                </Grid>
                <Grid item xs={1}>
                    <Player
                        autoplay
                        loop
                        src="https://assets4.lottiefiles.com/packages/lf20_8nwbsfmv.json"
                        style={{height: 'auto', width: '100px'}}
                    />
                </Grid>
            </Grid>
        </>

    )
        ;
};

export default DragList;
