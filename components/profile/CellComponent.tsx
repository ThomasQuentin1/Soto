import React from "react";
import {AccessibilityNew, ArrowForwardIosRounded, Language, ShoppingCart, Storefront} from "@material-ui/icons";
import Router from "next/router";
import {Typography} from "@material-ui/core";


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
                <a className={'flexWidthFull padding20'} style={{alignItems: "center"}} onClick={() => {
                    Router.push(props.path).then(() => {})
                }}>
                    <div style={{display: "flex", width: "40%", alignItems: "center"}}>
                        <i className={"padRight10"} hidden={props.iconName != "accessibility"}><AccessibilityNew/></i>
                        <i className={"padRight10"} hidden={props.iconName != "language"}><Language/></i>
                        <i className={"padRight10"} hidden={props.iconName != "cart"}><ShoppingCart/></i>
                        <i className={"padRight10"} hidden={props.iconName != "store"}><Storefront/></i>
                        <Typography color="textPrimary" variant="body1" className={"cellTitle"}>{props.label}</Typography>
                    </div>
                    <Typography color="textSecondary" variant="subtitle2" className={"cellValue"} style={{width: "50%"}}>{props.value}</Typography>
                    <div style={{width: "10%", display: "flex", justifyContent: "flex-end"}}>
                        <ArrowForwardIosRounded className={"icons"}/>
                    </div>
                </a>
            </div>
        </>
    )
}

export default CellComponent