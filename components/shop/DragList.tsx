import React from "react";
import { List, arrayMove } from 'react-movable';
import {useTranslation} from "react-i18next";

// const defaultValues: Array<string> = [
//   "Impact sur la santé",
//   "Impact environnemental",
//   "Prix",
//   "Valeur nutritionnelle",
//   "Proximité du produit"
// ];

// const SendToBack = () => {
// }

export interface CriteriaData {
    id: number
    position: number
    name: string
    activated: boolean
}

interface Props {
    criteriaData: CriteriaData[];
    // setCriteria: (items: CriteriaData[]) => void;
}

const DragList = (props: Props) => {
    const [t] = useTranslation();

    const [items, setItems] = React.useState(props.criteriaData);

    return (
        <List
            lockVertically={true}
            values={items}
            onChange={({ oldIndex, newIndex }) => {
                setItems(arrayMove(items, oldIndex, newIndex))
                // changePositions(oldIndex, newIndex)
                // props.criteriaData[oldIndex].position = newIndex + 1
                // props.setCriteria(items)
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
        renderItem={({ value, props }) => 
        <li 
        {...props}
        style={{
            ...props.style,
            }}
        className="criteria_drag_list"
        >
              {t(value.name)}
            </li>
        }
      />
    );
};

export default DragList;
