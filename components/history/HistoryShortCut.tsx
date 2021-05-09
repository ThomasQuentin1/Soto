import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import HistoryShortCutItem from 'components/history/HistoryShortCutItem';
import { Button, Typography } from "@material-ui/core";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Cart, Product } from 'typing';

export interface HistoryListProps {
    cartHistory: Cart[];
    basket: Product[];
    setBasket: any;
    cartQueryRefetch: any;
}

const HistoryShortCut = ({cartHistory, basket, setBasket, cartQueryRefetch}: HistoryListProps ) => {

    const [isToggled, setIsToggled] = useState(true);

    return (
        <div>
            <Grid container justify='flex-end' style={{position:'fixed', top:'90px', right: '0px', width:'auto'}}>
                <Grid item style={{position:'relative', justifyContent:'flex-end'}}>
                    <Grid container justify={isToggled ? 'flex-end' : 'flex-start'}>
                        <Button color='primary' onClick={() => { 
                            setIsToggled(!isToggled);
                        }}>{isToggled ? <FirstPageIcon style={{position:'absolute', left:"-15px", top:'3px'}}/> : <LastPageIcon style={{position:'absolute', left: "85px", top:'3px'}}/> }<Typography variant='caption'>historique</Typography></Button>
                        {!isToggled &&
                        <Button style={{left: '65px'}} color='primary' href='/history'><Typography variant='caption'>Page d'historiques</Typography></Button>}
                    </Grid>
                    <Grid>
                        {!isToggled && 
                            <Grid container className='history_short_cut_list bg-square' direction={'column'}>
                                {cartHistory.map((cart, index) => {
                                    return (
                                    <Grid item className='history_short_cut_item' key={index}>
                                        <HistoryShortCutItem cart={cart} basket={basket} setBasket={setBasket} cartQueryRefetch={cartQueryRefetch}></HistoryShortCutItem>

                                    </Grid>);
                                })}
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default HistoryShortCut;