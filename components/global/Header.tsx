import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import { useAccountQuery } from 'typing';
import { Typography, CardMedia, Card, Grid, Link, Divider, Switch, Button } from '@material-ui/core';
import Router from "next/router";
import Cookies from "js-cookie";

interface Props {
    theme: any;
    SetTheme: any;
}

const Header = ({ theme, SetTheme }: Props) => {
    const [t] = useTranslation();
    const tmpTheme: string = theme.toString();
    const { data, loading } = useAccountQuery();
    const [isProfileCardOpen, SetOpenProfileCard] = useState<boolean>(false);

    if (!loading && data === undefined && Router.route != "/" && Router.route != "/login")
        Router.push("/login").then(() => { })

    return (
        <div className='header-div' style={{ zIndex: 1000, left: '0px', top: '0px', width: '100%', height: '80px', position: 'sticky', display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '10px' }}>
            <CardMedia onClick={() => Router.push("/shop")}
                style={{ left: '20px', marginLeft: "10px", height: '60px', width: '60px', marginRight: '10px', cursor: "pointer" }}
                image={`/images/${tmpTheme}/soto_round_logo_${tmpTheme}.png`}
                className={"roundLogo"}
            />
            <h2>{t('baseline')}</h2>
            <div style={{ marginLeft: 'auto', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                {!loading && data && data.account.currentShop &&
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    </div>
                }
                <div className={"profile-icon"} onClick={() => SetOpenProfileCard(!isProfileCardOpen)} style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon style={{ height: '60px', width: '60px' }} icon={faUser} />
                </div>
                {isProfileCardOpen &&
                    <Card style={{ position: "absolute", right: "20px", top: "75px", width: "300px", padding: "10px 20px" }}>
                        {(data && data.account) ?
                            <Grid container direction="column">
                                <Grid container direction="column">
                                    <Typography style={{ marginBottom: "5px" }}>{data.account.email}</Typography>
                                    <Link href="#" onClick={() => Router.push("/profile").then(() => { })} color="secondary">Paramètres</Link>
                                </Grid>
                                <Divider style={{ marginTop: "10px", marginBottom: "10px" }} className="header-menu-divider divider" />
                            </Grid>
                            : <Grid container direction="column">
                                <Button onClick={() => Router.push("/login")}>Se connecter</Button>
                            </Grid>
                        }
                        <Grid container direction="column">
                            {data && data.account &&
                                <Typography style={{ marginBottom: "5px", textAlign: "center" }}>{data.account.currentShop.name}</Typography>
                            }
                            <Divider style={{ marginTop: "10px", marginBottom: "10px" }} className="header-menu-divider  divider" />
                        </Grid>
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs={8}>
                                <Typography style={{ fontSize: "1rem" }}>{t("label.changeTheme")}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Switch
                                    checked={theme === "dark"}
                                    onChange={SetTheme}
                                />
                            </Grid>
                            {data && data !== undefined &&
                                <Grid>
                                    <Button color="secondary" onClick={() => {
                                        Cookies.remove("token")
                                        Router.push("/login").then(() => { })
                                    }}>
                                        Déconnexion
                                    </Button>
                                </Grid>}
                        </Grid>
                    </Card>}
                {/* <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    handleClose()
                    Router.push("/profile").then(() => {})
                }}>Profile</MenuItem>
                <MenuItem onClick={() => {
                    handleClose()
                    Cookies.remove("token")
                    Router.push("/login").then(() => {})
                }}>Logout</MenuItem>
            </Menu> */}
            </div>
        </div >);
};

export default Header;