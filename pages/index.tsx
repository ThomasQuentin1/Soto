import React, {useEffect} from 'react';
import {Typography, Grid, Button} from '@mui/material';
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import {useDarkMode} from "../components/settings/useDarkMode";
import Header from 'components/global/Header';
import '../i18n'
import {useTranslation} from "react-i18next";
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineSeparator
} from "@mui/lab";
import Footer from "../components/global/Footer";

const Index = () => {
    const [t, i18n] = useTranslation();
    const [theme, SetTheme] = useDarkMode();
    const usedTheme: string = theme.toString();
    let lng: string = 'fr';
    if (typeof window !== 'undefined') {
        lng = localStorage.getItem('lng') as string;
        if (lng == null) {
            localStorage.setItem('lng', window.navigator.language.split('-')[0]);
        }
        useEffect(() => {
            i18n.changeLanguage(lng)
        }, []);
    }

    const milestones = [
        {
            date: "28/02/2020",
            content: "label.milestones.step1",
            past: true
        },
        {
            date: "14/10/2020",
            content: "label.milestones.step2",
            past: true
        },
        {
            date: "12/01/2020",
            content: "label.milestones.step3",
            past: true
        },
        {
            date: "11/05/2021",
            content: "label.milestones.step4",
            past: true
        },
        {
            date: t("label.milestones.step5.date"),
            content: "label.milestones.step5",
            past: false
        }
    ]


    return (
        <DarkModeParent theme={usedTheme}>
            <Header  {...{theme, SetTheme}} />
            <div>
                <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                    <a style={{marginRight: "5px"}}
                       href={"https://apps.apple.com/us/app/discord-talk-chat-hang-out/id985746746"}>
                        <img alt="discord app" style={{height: "50px"}}
                             src={"images/common/Download_on_the_App_Store_Badge_FR_RGB_blk_100517.svg"}/>
                    </a>
                    <a style={{marginLeft: "5px"}} href={"https://play.google.com/store/apps/details?id=com.discord"}>
                        <img alt="soto google play" style={{height: "50px"}}
                             src={"images/common/google-play-badge.png"}/>
                    </a>
                </div>

                <Grid container style={{marginTop: '40px'}} justifyContent={'center'}>
                    {/*   DESCRIPTION   */}
                    <Grid item xs={2}>
                        <Typography className="indexTitle" align={'center'} paragraph variant={'h4'}>
                            {t('label.project')}
                        </Typography>
                    </Grid>
                    <Grid container justifyContent={'center'} wrap={'wrap'} alignContent={'space-around'}>
                        <Grid item xs={6}>
                            <Typography align={'center'} style={{fontSize: '18px'}}>{t('label.project.l1')}</Typography>
                            <Typography align={'center'} style={{fontSize: '18px'}}>{t('label.project.l2')}</Typography>
                            <Typography align={'center'} style={{fontSize: '18px'}}>{t('label.project.l3')}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container style={{marginTop: '20px', justifyContent: 'center'}}>
                        <Grid item>
                            <Button color="secondary" style={{border: '1px solid'}}
                                    href={'shop'}>{t('label.startShopping')}</Button>
                        </Grid>
                    </Grid>
                    {/*   TEAM   */}
                    <Grid item xs={2} style={{marginTop: '40px'}}>
                        <Typography className="indexTitle" align={'center'} paragraph variant={'h4'}>
                            {t('label.team')}
                        </Typography>
                    </Grid>
                    <Grid container justifyContent={'center'} wrap={'wrap'} alignContent={'space-around'}>
                        <Grid item xs={4}>
                            <Typography align={'center'} style={{fontSize: '22px'}}>{t('label.team.front')}</Typography>
                            <div style={{display: "flex", justifyContent: "center", marginBottom: "20px"}}>
                                <div>
                                    <img alt="soto developpeur" style={{width: "175px", height: "200px", margin: "5px"}}
                                         src={"images/team/arnaud.jpg"}/>
                                    <Typography align={"center"}>Arnaud MOTTE</Typography>
                                </div>
                                <div>
                                    <img alt="soto developpeur" style={{width: "175px", height: "200px", margin: "5px"}}
                                         src={"images/team/nicolas.jpg"}/>
                                    <Typography align={"center"}>Nicolas GOEPP</Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align={'center'} style={{fontSize: '22px'}}>{t('label.team.back')}</Typography>
                            <div style={{display: "flex", justifyContent: "center", marginBottom: "20px"}}>
                                <div>
                                    <img alt="soto developpeur" style={{width: "175px", height: "200px", margin: "5px"}}
                                         src={"images/team/tom.jpg"}/>
                                    <Typography align={"center"}>Tom FLORENTIN</Typography>
                                </div>
                                <div>
                                    <img alt="soto developpeur" style={{width: "175px", height: "200px", margin: "5px"}}
                                         src={"images/team/quentin.jpg"}/>
                                    <Typography align={"center"}>Quentin THOMAS</Typography>
                                </div>

                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align={'center'}
                                        style={{fontSize: '22px'}}>{t('label.team.mobile')}</Typography>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <div>
                                    <img alt="soto developpeur" style={{width: "175px", height: "200px", margin: "5px"}}
                                         src={"images/team/loup.jpg"}/>
                                    <Typography align={"center"}>Loup MASNERI</Typography>
                                </div>
                                <div>
                                    <img alt="soto developpeur" style={{width: "175px", height: "200px", margin: "5px"}}
                                         src={"images/team/pq.jpg"}/>
                                    <Typography align={"center"}>Pierre-Quentin LAGANDRÉ</Typography>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item xs={2} style={{marginTop: '40px'}}>
                        <Typography className="indexTitle" align={'center'} paragraph variant={'h4'}>
                            {t('label.milestones')}
                        </Typography>
                    </Grid>
                    <Grid container justifyContent={'center'} wrap={'wrap'} alignContent={'space-around'}>
                        <Grid item xs={6}>
                            <Timeline position="alternate">
                                {
                                    milestones.map(elem => {
                                        return (
                                            <TimelineItem>
                                                <TimelineSeparator>
                                                    <TimelineDot color={elem.past ? "secondary" : "primary"}/>
                                                    <TimelineConnector/>
                                                </TimelineSeparator>
                                                <TimelineContent>
                                                    <Typography style={{color: "grey"}}>{elem.date}</Typography>
                                                    <Typography>{t(elem.content)}</Typography>
                                                </TimelineContent>
                                            </TimelineItem>
                                        )
                                    })
                                }
                            </Timeline>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

            <Footer/>
        </DarkModeParent>);
}

export default Index;