
import React from "react"
import ParametersSelect from "../../shop/ParametersSelect";
// import {CheckBoxData} from "../../shop/ObligationCheckboxList";
// import {CriteriaData} from "../../shop/DragList";


/*interface Props {
    setCriteria: (items: CriteriaData[]) => void;
    setObligations: (items: CheckBoxData[]) => void;
}*/

const Step2 = () => {
    // let lng : string | null = 'fr';
    // if (typeof window !== 'undefined') {
    //     lng = localStorage.getItem('lng');
    // }
    // const [items, setItems] = useState<Array<string>>(lng == 'fr' ? defaultValue : defaultValueEn);
    // return (
    //     <div
    //         style={{
    //             display: "flex",
    //             flexDirection: "row",
    //         }}>
    //         <div
    //             style={{
    //                 display: "flex",
    //                 flexDirection: "column"
    //             }}
    //         >
    //             {items.map((_value, index) => {
    //                 return (
    //                     <span key={index.toString()}
    //                         style={{
    //                             marginLeft: "16px",
    //                             marginTop: "28px",
    //                         }}
    //                     >
    //           {index + 1}.
    //         </span>
    //                 );
    //             })}
    //         </div>
    //         <List
    //             lockVertically={true}
    //             values={items}
    //             onChange={({ oldIndex, newIndex }) =>
    //                 setItems(arrayMove(items, oldIndex, newIndex))
    //             }
    //             renderList={
    //                 ({ children, props , isDragged}) =>
    //                     <ul {...props}
    //                         style={{paddingLeft: "8px", paddingRight: "8px", cursor: isDragged ? "grabbing" : "inherit", width: "100%"}}
    //                     >
    //                         {children}
    //                     </ul>
    //             }
    //             renderItem={
    //                 ({ value, props, isDragged}) =>
    //                     <li
    //                         {...props}
    //                         style={{
    //                             ...props.style,
    //                             padding: "8px",
    //                             margin: "8px",
    //                             listStyleType: "none",
    //                             border: "1px solid",
    //                             // boxShadow: "1px 1px 1px #d9d9d9",
    //                             color: "black",
    //                             borderRadius: "5px",
    //                             cursor: isDragged ? "grabbing" : "pointer"
    //                         }}
    //                     >
    //                         {value}
    //                     </li>
    //             }
    //         >
    //         </List>
    //     </div>
    // );
    return (
        // <div>
        //     <ParametersSelect></ParametersSelect>
        // </div>
        <div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {/*<ParametersSelect shop={false} setCriteria={props.setCriteria} setObligations={props.setObligations}/>*/}
                <ParametersSelect shop={false}/>
            </div>
        </div>


    );

}

export default Step2;
