import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import HistoryShortCutItem from 'components/history/HistoryShortCutItem';
import {Button, Paper, Typography} from "@material-ui/core";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import {Cart, Product} from 'typing';
import {useTranslation} from "react-i18next";

export interface HistoryListProps {
    cartHistory: Cart[];
    basket: Product[];
    setBasket: any;
    cartQueryRefetch: any;
}

const HistoryShortCut = ({cartHistory, basket, setBasket, cartQueryRefetch}: HistoryListProps) => {

    const [isToggled, setIsToggled] = useState(true);

    const [t] = useTranslation();
    return (
        <div>
            <Grid container justify='flex-end' style={{position: 'fixed', top: '90px', right: '0px', width: 'auto'}}>
                <Grid item style={{position: 'relative', justifyContent: 'flex-end'}}>
                    <Grid style={{marginBottom: "10px"}} className="flexSpaceBetween" container justify={isToggled ? 'flex-end' : 'flex-start'}>
                        <Button color='primary' onClick={() => {
                            setIsToggled(!isToggled);
                        }}>{isToggled ? <FirstPageIcon style={{position: 'absolute', left: "-15px", top: '3px'}}/> :
                            <LastPageIcon style={{position: 'absolute', left: "85px", top: '3px'}}/>}
                            <Typography variant='caption'>
                                {t("label.history")}
                            </Typography>
                        </Button>
                        {!isToggled &&
                        <Button style={{marginLeft: '65px'}} variant={"outlined"} color='primary' href='/history'>
                            <Typography
                                variant='caption'>{t("label.fullHistory")}
                            </Typography>
                        </Button>}
                    </Grid>
                    <Grid>
                        {!isToggled &&
                        // <Grid container direction={'column'} spacing={2}>
                        //     {cartHistory.map((cart, index) => {
                        //         return (
                        //             <Grid item key={index}>
                        //                 <HistoryShortCutItem cart={cart} basket={basket} setBasket={setBasket}
                        //                                      cartQueryRefetch={cartQueryRefetch}/>
                        //             </Grid>);
                        //     })}
                        // </Grid>
                        // <Grid container direction={'column'} spacing={2}>
                        <div>
                            {cartHistory.map((cart, index) => {
                                    return (
                                        <Paper key={index} style={{marginBottom: "5px", width: "100%"}}>
                                            <HistoryShortCutItem cart={cart} basket={basket} setBasket={setBasket}
                                                                 cartQueryRefetch={cartQueryRefetch}/>
                                        </Paper>);
                                }
                            )
                            }
                        </div>
                            // </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default HistoryShortCut;