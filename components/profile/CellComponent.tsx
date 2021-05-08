import React from "react";
import {AccessibilityNew, ArrowForwardIosRounded, Language, ShoppingCart, Storefront} from "@material-ui/icons";
import Router from "next/router";


interface Props {
    label: string
    value: any
    path: string
    iconName?: string
}

const CellComponent = (props: Props) => {
    return (
        <>
            <div className={"cell"}>
                <a className={'flexWidthFull padding1020'} style={{alignItems: "center"}} onClick={() => {
                    Router.push(props.path).then(() => {})
                }}>
                    <div style={{display: "flex", width: "40%", alignItems: "center"}}>
                        <i className={"padRight10"} hidden={props.iconName != "accessibility"}><AccessibilityNew/></i>
                        <i className={"padRight10"} hidden={props.iconName != "language"}><Language/></i>
                        <i className={"padRight10"} hidden={props.iconName != "cart"}><ShoppingCart/></i>
                        <i className={"padRight10"} hidden={props.iconName != "store"}><Storefront/></i>
                        <p className={"cellTitle"}>{props.label}</p>
                    </div>
                    <p className={"cellValue"} style={{width: "50%"}}>{props.value}</p>
                    <div style={{width: "10%", display: "flex", justifyContent: "flex-end"}}>
                        <ArrowForwardIosRounded className={"icons"}/>
                    </div>
                </a>
            </div>
        </>
    )
}

export default CellComponent