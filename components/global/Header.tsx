import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingBasket, faChevronDown } from '@fortawesome/free-solid-svg-icons'
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
    const [basket, setBasket] = useState<any>(undefined);
    const [isProfileCardOpen, SetOpenProfileCard] = useState<boolean>(false);
    const [isBasketListOpen, SetBasketListOpen] = useState<boolean>(false);

    if (!loading && data === undefined && Router.route != "/" && Router.route != "/login")
        Router.push("/login").then(() => { })

    setInterval(() => {
        if (window != null) {
            if (sessionStorage.getItem('currentCart')) {
                let jsonString: any = sessionStorage.getItem('currentCart');
                let currentCart: any = JSON.parse(jsonString);
                setBasket(currentCart);
            }
        }
    }, 1000);


    return (
        <div className='header-div' style={{ zIndex: 1000, left: '0px', top: '0px', width: '100%', height: '80px', position: 'sticky', display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '10px' }}>
            <CardMedia onClick={() => Router.push("/shop")}
                style={{ left: '20px', marginLeft: "10px", height: '60px', width: '60px', marginRight: '10px', cursor: "pointer" }}
                image={`/images/${tmpTheme}/soto_round_logo_${tmpTheme}.png`}
                className={"roundLogo"}
            />
            <h2>{t('baseline')}</h2>
            <div style={{ marginLeft: 'auto', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <Grid alignItems="center" justify="center" className={"profile-icon"} onClick={() => {
                    SetBasketListOpen(!isBasketListOpen)
                    if (isProfileCardOpen) {
                        SetOpenProfileCard(false);
                    }
                }} style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon style={{ height: '30px', width: '30px' }} icon={faShoppingBasket} />
                    <FontAwesomeIcon style={{ height: '20px', width: '20px' }} icon={faChevronDown} />
                </Grid>
                <div className={"profile-icon"} onClick={() => {
                    SetOpenProfileCard(!isProfileCardOpen)
                    if (isBasketListOpen) {
                        SetBasketListOpen(false);
                    }
                }} style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon style={{ height: '60px', width: '60px' }} icon={faUser} />
                </div>
                {isBasketListOpen && basket !== undefined && <Card style={{ position: "absolute", right: "20px", top: "75px", width: "300px", padding: "10px 20px" }}>
                    <Grid container>
                        {basket.map((item, index) => {
                            return (<Grid item xs={12}><Typography display="inline">{item.name}</Typography><Typography display="inline" style={{ fontWeight: 600 }}>{" x" + item.itemQuantity}</Typography></Grid>);
                        })}
                    </Grid>
                </Card>}
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
            </div>
        </div >);
};

export default Header;