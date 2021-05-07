import React from 'react';
import {Typography, Grid, Button, ThemeProvider} from '@material-ui/core';
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import Header from 'components/global/Header';
import '../i18n'
import muiLightTheme from "../themes/mui/mainLightTheme";

const Index = () => {
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
            <Header/>
            <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                <a style={{marginRight: "5px"}} href={"https://apps.apple.com/us/app/discord-talk-chat-hang-out/id985746746"}>
                    <img style={{height: "50px"}} src={"images/common/Download_on_the_App_Store_Badge_FR_RGB_blk_100517.svg"}/>
                </a>
                <a style={{marginLeft: "5px"}} href={"https://play.google.com/store/apps/details?id=com.discord"}>
                    <img style={{height: "50px"}} src={"images/common/google-play-badge.png"}/>
                </a>
            </div>
            <Grid container style={{marginTop: '40px'}} justify={'center'}>
                <Grid item xs={2}><Typography style={{borderBottom:'4px solid #3586e2', paddingBottom:'5px'}} align={'center'} paragraph variant={'h4'}>Le projet</Typography></Grid>
                <Grid container justify={'center'} wrap={'wrap'} alignContent={'space-around'}>
                    <Grid item xs={6}>
                        <Typography align={'center'} style={{fontSize:'18px'}}>
                            Classe tes critères selon tes convictions, mets en place tes filtres, et commence tes courses.</Typography>
                        <Typography align={'center'} style={{fontSize:'18px'}}>
                            C'est tout simple, essaye de taper le nom d'un article, sans spéficier sa marque.
                        </Typography>
                        <Typography align={'center'} style={{fontSize:'18px'}}>
                            Soto te proposera toujours le meilleur choix !
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop:'20px', justifyContent:'center'}}>
                    <Grid item>
                        <ThemeProvider theme={muiLightTheme}>
                            <Button color="primary" style={{border:'1px solid'}} href={'shop'}>Commencer les courses !</Button>
                        </ThemeProvider>
                    </Grid>
                </Grid>
                <Grid item xs={2} style={{marginTop:'40px'}}>
                    <Typography style={{borderBottom:'4px solid #3586e2', paddingBottom:'5px'}} align={'center'} paragraph variant={'h4'}>
                        Notre équipe
                    </Typography>
                </Grid>
                <Grid container justify={'center'} wrap={'wrap'} alignContent={'space-around'}>
                    <Grid item xs={8}>
                        <Typography align={'center'} style={{fontSize:'18px'}}>
                            Développeur Front end
                        </Typography>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <img style={{width: "175px", height: "200px", margin: "5px"}} src={"images/team/arnaud.jpg"}/>
                            <img style={{width: "175px", height: "200px", margin: "5px"}} src={"images/team/nicolas.jpg"}/>
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align={'center'} style={{fontSize:'18px'}}>
                            Développeur Back end
                        </Typography>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <img style={{width: "175px", height: "200px", margin: "5px"}} src={"images/team/tom.jpg"}/>
                            <img style={{width: "175px", height: "200px", margin: "5px"}} src={"images/team/quentin.jpg"}/>

                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align={'center'} style={{fontSize:'18px'}}>
                            Développeur mobile
                        </Typography>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <img style={{width: "175px", height: "200px", margin: "5px"}} src={"images/team/loup.jpg"}/>
                            <img style={{width: "175px", height: "200px", margin: "5px"}} src={"images/team/pq.jpg"}/>
                        </div>
                    </Grid>

                </Grid>
            </Grid>
        </DarkModeParent>);
}

export default Index;