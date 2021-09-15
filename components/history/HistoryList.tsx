import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import HistoryItem from 'components/history/HistoryItem';
import { Cart } from 'typing';
import {TFunction} from "i18next";

export interface HistoryListProps {
    cartHistory: Cart[];
    t: TFunction
}

const HistoryList = (props: HistoryListProps ) => {
    return (
        <div>
            <Grid container justify='flex-start' style={{paddingLeft:'25px'}}>
                <Typography variant='h5'>{props.t("label.history.cart")}</Typography>
            </Grid>
            <Grid container justify={"center"} alignItems={"center"} direction={'column'} spacing={1}>
                {props && props.cartHistory && props.cartHistory.map((cart, index) =>
                    <HistoryItem cart={cart} t={props.t} key={index}/>
                )}
            </Grid>
        </div>
    );
}

export default HistoryList;