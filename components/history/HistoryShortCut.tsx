import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import HistoryShortCutItem from 'components/history/HistoryShortCutItem';
import { Button, Paper, Typography } from "@mui/material";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Cart, Product } from 'typing';
import { useTranslation } from "react-i18next";

export interface HistoryListProps {
    cartHistory: Cart[];
    basket: Product[];
    setBasket: any;
}

const HistoryShortCut = ({ cartHistory, basket, setBasket }: HistoryListProps) => {

    const [isToggled, setIsToggled] = useState(true);

    const [t] = useTranslation();
    return (
        <div>
            <Grid container justifyContent='flex-end' style={{ position: 'fixed', top: '90px', right: '0px', width: 'auto' }}>
                <Grid item style={{ position: 'relative', justifyContent: 'flex-end' }}>
                    <Grid style={{ marginBottom: "10px" }} className="flexSpaceBetween" container
                        justifyContent={isToggled ? 'flex-end' : 'flex-start'}>
                        <Button color='secondary' onClick={() => {
                            setIsToggled(!isToggled);
                        }}>{isToggled ? <FirstPageIcon style={{ position: 'absolute', left: "-15px", top: '3px' }} /> :
                            <LastPageIcon style={{ position: 'absolute', left: "85px", top: '3px' }} />}
                            <Typography variant='caption'>
                                {t("label.history")}
                            </Typography>
                        </Button>
                        {!isToggled &&
                            <Button style={{ marginLeft: '65px' }} variant={"outlined"} color='secondary' href='/history'>
                                <Typography
                                    variant='caption'>{t("label.fullHistory")}
                                </Typography>
                            </Button>}
                    </Grid>
                    <Grid>
                        {!isToggled &&
                            <div>
                                {cartHistory.map((cart, index) => {
                                    return (
                                        <Paper key={index} style={{ marginBottom: "5px", width: "100%" }}>
                                            <HistoryShortCutItem cart={cart} basket={basket} setBasket={setBasket} />
                                        </Paper>);
                                }
                                )}
                            </div>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default HistoryShortCut;