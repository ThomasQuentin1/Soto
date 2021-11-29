import React, { useEffect } from "react";
import DarkModeParent from "components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "components/settings/useDarkMode";
import Header from 'components/global/Header';
import HistoryList from 'components/history/HistoryList';
import { Grid, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useOldCartsQuery } from 'typing';
import Router from "next/router";
import 'i18n';
import { useTranslation } from "react-i18next";

const HistoryPage = () => {
    const [theme, SetTheme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    const { data, loading, error } = useOldCartsQuery({
        variables: {
        },
    });
    const [t, i18n] = useTranslation();
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('lng') === null) {
            localStorage.setItem('lng', 'fr');
        }
        useEffect(() => {
            i18n.changeLanguage(localStorage.getItem('lng') as string)
        }, []);
    }

    if (data && !loading) {
        console.log(data)
    } else if (error) {
        console.log(error)
    }
    return (
        <div>
            <DarkModeParent theme={tmpTheme}>
                <Header {...{ theme, SetTheme }} />
                <Grid container direction='column'>
                    <Grid container direction='column'>
                        <Grid item xs={4}>
                            <Button color='secondary' onClick={() => Router.back()} style={{ marginLeft: '10px', marginTop: '10px' }}>
                                <ArrowBackIcon />
                                <Typography variant='caption'>{t("label.continue_shopping")}</Typography>
                            </Button>
                        </Grid>
                        <Grid container direction='column'>
                            {data &&
                                <HistoryList cartHistory={data.oldCarts} t={t} />
                            }
                            {!data && <Typography>Loading</Typography>}
                        </Grid>
                    </Grid>
                </Grid>
            </DarkModeParent>
        </div>
    );
}

export default HistoryPage;
