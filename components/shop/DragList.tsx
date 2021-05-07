import React, {useState, useEffect} from "react";
import { List, arrayMove } from 'react-movable';
import {useTranslation} from "react-i18next";
// import { Transition } from 'react-transition-group';

export interface CriteriaData {
    id: number
    position: number
    name: string
    activated: boolean
}

interface Props {
    criteriaData: CriteriaData[];
    setCriteria: (items: CriteriaData[]) => void
}

const DragList = (props: Props) => {
    const [t] = useTranslation();

    const [items, setItems] = useState(props.criteriaData);

    useEffect(() => {
        items.forEach((elem, index) => {
            elem.position = index + 1
        })
        props.setCriteria(items)

    }, [items])


    return (
        <List
            lockVertically={true}
            values={items}
            onChange={({ oldIndex, newIndex }) => {
                setItems(arrayMove(items, oldIndex, newIndex))
            }}
            renderList={({ children, props }) =>
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
            renderItem={({ value, props, index }) =>
                <li
                    {...props}
                    style={{
                        ...props.style,
                        listStyleType: "none",
                    }}
                    className="criteria_drag_list"
                >
                    <div className="dFlex" style={{alignItems: "center"}}>
                        <div>
                            {index! + 1}.
                        </div>
                        <div className="criteria_drag_list_elem flexWidthFull">
                            {t(value.name)}
                        </div>
                    </div>

                </li>
            }
        />
    );
};

export default DragList;
