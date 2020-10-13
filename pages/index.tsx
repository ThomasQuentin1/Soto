import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";

export default () => {
    const [theme] = useDarkMode();
    const usedTheme: string = theme.toString();
    let lng : string | null = 'fr';
    if (typeof window !== 'undefined') {
      lng = localStorage.getItem('lng');
      if (lng == null) {
        localStorage.setItem('lng', 'fr');
      }
    }

    return (
    <DarkModeParent theme={usedTheme}>
        <Grid container style={{marginTop: '40px'}} justify={'center'}>
            <Grid item xs={2} justify={'center'}><Typography style={{borderBottom:'4px solid white', paddingBottom:'5px'}} align={'center'} paragraph variant={'h4'}>Le projet</Typography></Grid>
            <Grid container justify={'center'} wrap={'wrap'} alignContent={'space-around'}>
                <Grid item xs={6}>
                    <Typography align={'center'} style={{fontSize:'18px'}}>
                        Classe tes critères selon tes convictions, mets en place tes filtres, et commence tes courses.</Typography>
                    <Typography align={'center'} style={{fontSize:'18px'}}>
                        C'est tout simple, essaye de taper le nom d'un article, sans spéficier sa marque.
                    </Typography>
                    <Typography align={'center'} style={{fontSize:'18px'}}>
                        Soto te proposera toujours le meilleur !
                    </Typography>
                </Grid>
            </Grid>
            <Grid style={{marginTop:'40px'}} item xs={12} justify={'center'}><Typography align={'center'} paragraph variant={'h4'}>Notre équipe</Typography></Grid>
        </Grid>
    </DarkModeParent>);
}
