import React, {useState} from "react";
import {arrayMove, List} from "react-movable";

// interface Item {
//     id: number;
//     text: string
// }

const defaultValue: Array<string> = [
    // {id: 0, text: "Impact sur la santé"},
    // {id: 1, text: "Impact environnemental"},
    // {id: 2, text: "Prix"},
    // {id: 3, text: "Valeur nutritionnelle"},
    // {id: 4, text: "Proximité du produit"}
    "Impact sur la santé",
    "Impact environnemental",
    "Prix",
    "Valeur nutritionnelle",
    "Proximité du produit"
];

const dragList = () => {
    const [items, setItems] = useState<Array<string>>(defaultValue);

    return (
        <div>
            <List
                lockVertically={true}
                values={items}
                onChange={({ oldIndex, newIndex }) =>
                    setItems(arrayMove(items, oldIndex, newIndex))
                }
                renderList={({ children, props }) => <ul {...props}>{children}</ul>}
                renderItem={({ value, props }) => <li {...props}>{value}</li>}

            >
            </List>
        </div>
    );

}

export default dragList;
