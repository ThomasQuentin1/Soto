import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import HistoryItem from 'components/history/HistoryItem';
import { Cart } from 'typing';

export interface HistoryListProps {
    cartHistory: Cart[];
}

const HistoryList = ({cartHistory}: HistoryListProps ) => {
    return (
        <div>
            <Grid container justify='flex-start' style={{paddingLeft:'25px'}}>
                <Typography variant='h5'>Historique de vos courses</Typography>
            </Grid>
            <Grid container justify={"center"} alignItems={"center"} direction={'column'} spacing={1}>
                {cartHistory && cartHistory.map((cart, index) => 
                    <HistoryItem cart={cart} key={index}/>
                )}
            </Grid>
        </div>
    );
}

export default HistoryList;