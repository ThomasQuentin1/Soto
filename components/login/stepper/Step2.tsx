import React, {useState} from "react";
import {arrayMove, List} from "react-movable";

const defaultValue: Array<string> = [
    "Impact sur la santé",
    "Impact environnemental",
    "Prix",
    "Valeur nutritionnelle",
    "Proximité du produit"
];

const defaultValueEn: Array<string> = [
    "Impact on health",
    "environmental Impact",
    "Price",
    "nutritional value",
    "proximity to product"
];

const Step2 = () => {
    let lng : string | null = 'fr';
    if (typeof window !== 'undefined') {
        lng = localStorage.getItem('lng');
    }
    const [items, setItems] = useState<Array<string>>(lng == 'fr' ? defaultValue : defaultValueEn);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                {items.map((_value, index) => {
                    return (
                        <span key={index.toString()}
                            style={{
                                marginLeft: "16px",
                                marginTop: "28px",
                            }}
                        >
              {index + 1}.
            </span>
                    );
                })}
            </div>
            <List
                lockVertically={true}
                values={items}
                onChange={({ oldIndex, newIndex }) =>
                    setItems(arrayMove(items, oldIndex, newIndex))
                }
                renderList={
                    ({ children, props , isDragged}) =>
                        <ul {...props}
                            style={{paddingLeft: "8px", paddingRight: "8px", cursor: isDragged ? "grabbing" : "inherit", width: "100%"}}
                        >
                            {children}
                        </ul>
                }
                renderItem={
                    ({ value, props, isDragged}) =>
                        <li
                            {...props}
                            style={{
                                ...props.style,
                                padding: "8px",
                                margin: "8px",
                                listStyleType: "none",
                                border: "1px solid",
                                // boxShadow: "1px 1px 1px #d9d9d9",
                                color: "black",
                                borderRadius: "5px",
                                cursor: isDragged ? "grabbing" : "pointer"
                            }}
                        >
                            {value}
                        </li>
                }
            >
            </List>
        </div>
    );

}

export default Step2;
