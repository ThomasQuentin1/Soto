import React from "react";
import DarkModeParent from "components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "components/settings/useDarkMode";
import Header from 'components/global/Header';
import Footer from 'components/global/Footer';
import HistoryList from 'components/history/HistoryList';
import { Cart } from 'interfaces/Cart';
import { Grid, Button, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import 'i18n';

const HistoryPage = () => {
    const [theme] = useDarkMode();
    const tmpTheme: string = theme.toString();

    const cartHistory : Cart[] = [{shop: {name: 'Auchan', city: 'Strasbourg', long: 1, lat: 1, id:1, server:'null', code:'null'}, price: 55, dateCreated: new Date(), dateLastEdit: new Date(), products: [{name: 'Pain', brand: 'Bon matin', scoreHealth: 20, quantity: 1, price: 1}, {name: 'Soda', brand: 'Coca-cola', scoreHealth: 1, quantity: 2, price: 1}, {name: 'Pâtes', brand: 'Barilla', scoreHealth: 100, quantity: 25, price: 2}, {name: 'Sauce tomate', brand: 'Panzani', scoreHealth: 50, quantity: 1, price: 1}]}, {shop: {name: 'Leclerc', city: 'Strasbourg', long: 1, lat: 1, id:1, server:'null', code:'null'}, price: 55, dateCreated: new Date(), dateLastEdit: new Date(), products: [{name: 'Pain', brand: 'Bon matin', scoreHealth: 20, quantity: 1, price: 1}, {name: 'Soda', brand: 'Coca-cola', scoreHealth: 1, quantity: 2, price: 1}, {name: 'Pâtes', brand: 'Barilla', scoreHealth: 100, quantity: 25, price: 2}, {name: 'Sauce tomate', brand: 'Panzani', scoreHealth: 50, quantity: 1, price: 1}]}];

    return (
        <div>
            <DarkModeParent theme={tmpTheme}>
                <Header/>
                    <Grid container direction='column'>
                        <Grid item xs={4}>
                            <Button color='secondary' href='/shop' style={{marginLeft:'10px', marginTop:'10px'}}>
                                <ArrowBackIcon/>
                                <Typography variant='caption'>Retourner faire ses courses</Typography>
                            </Button>
                        </Grid>
                        <Grid container direction='column'>
                            <HistoryList cartHistory={cartHistory}/>
                        </Grid>
                    </Grid>
                {/* <Footer/> */}
            </DarkModeParent>
        </div>
    );
}

export default HistoryPage;
