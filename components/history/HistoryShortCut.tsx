import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import HistoryShortCutItem from 'components/history/HistoryShortCutItem';
import { Cart } from 'interfaces/Cart';
import { Button, Typography } from "@material-ui/core";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useAnimatePresence } from "use-animate-presence";
import { Product } from "interfaces/Product";

export interface HistoryListProps {
    cartHistory: Cart[];
    basket: Product[];
    setBasket: any;
}

const HistoryShortCut = ({cartHistory, basket, setBasket}: HistoryListProps ) => {

    const bgVariants = {
        x: { from: 800, to: 0 },
        deg: 0
    };
    
    const bgSquare = useAnimatePresence({
        variants: bgVariants,
        initial: "visible",
        options: {
            stiffness: 900,
            mass: 1,
            damping: 100,
          },
    });

    const [isToggled, setIsToggled] = useState(false);

    return (
        <div>
            <Grid container justify='flex-end' style={{position:'fixed', top:'90px', right: '0px', width:'auto'}}>
                <Grid item style={{position:'relative', justifyContent:'flex-end'}}>
                    <Grid container justify={isToggled ? 'flex-end' : 'flex-start'}>
                        <Button color='secondary' onClick={() => { 
                            setIsToggled(!isToggled);
                            bgSquare.togglePresence();
                        }}>{isToggled ? <FirstPageIcon style={{position:'absolute', left:"-15px", top:'3px'}}/> : <LastPageIcon style={{position:'absolute', left: "85px", top:'3px'}}/> }<Typography variant='caption'>historique</Typography></Button>
                        {!isToggled &&
                        <Button style={{left: '65px'}} color='secondary' href='/history'><Typography variant='caption'>Page d'historiques</Typography></Button>}
                    </Grid>
                    <Grid>
                        <Grid container className='history_short_cut_list bg-square' ref={bgSquare.ref} direction={'column'}>
                            {cartHistory.map((cart, index) => {
                                return (
                                <Grid item className='history_short_cut_item'>
                                    <HistoryShortCutItem cart={cart} basket={basket} setBasket={setBasket} key={index}></HistoryShortCutItem>

                                </Grid>);
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default HistoryShortCut;