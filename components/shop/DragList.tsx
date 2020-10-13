import React from "react";
import { List, arrayMove } from 'react-movable';

const defaultValues: Array<string> = [
  "Impact sur la santé",
  "Impact environnemental",
  "Prix",
  "Valeur nutritionnelle",
  "Proximité du produit"
];

// const SendToBack = () => {
// }

const DragList = () => {
    const [items, setItems] = React.useState(defaultValues);
    return (
      <List
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
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
              {value}
            </li>
        }
      />
    );
};

export default DragList;
