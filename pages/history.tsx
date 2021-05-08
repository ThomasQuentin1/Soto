import React from "react";
import DarkModeParent from "components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "components/settings/useDarkMode";
import Header from 'components/global/Header';
import HistoryList from 'components/history/HistoryList';
import { Grid, Button, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useOldCartsQuery } from 'typing';
import 'i18n';

const HistoryPage = () => {
    const [theme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    const { data, loading, error } = useOldCartsQuery({
        variables: {
        },
    });

    if (data && !loading) {
        console.log(data)
    } else if (error) {
        console.log(error)
    }
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
                            {data && 
                                <HistoryList cartHistory={data.oldCarts}/>
                            }
                            {!data && <Typography>Loading</Typography>}
                        </Grid>
                    </Grid>
                {/* <Footer/> */}
            </DarkModeParent>
        </div>
    );
}

export default HistoryPage;
