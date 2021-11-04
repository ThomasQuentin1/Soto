import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import { useAccountQuery, useSubscribeNotificationsMutation } from 'typing';
import { Typography, CardMedia, Card, Grid, Link, Divider, Switch, Button, TextField } from '@material-ui/core';
import { notifyError, notifySuccess } from "public/notifications/notificationsFunctions";
import Router from "next/router";
import Cookies from "js-cookie";
import PdfGenerator from 'components/PdfGenerator';

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
    const [profileCardWasOpen, SetProfileCardWasOpen] = useState<boolean>(false);

    const [newsletterCardOpen, SetNewsletterCardOpen] = useState<boolean>(false);
    const [isSignedInNewsletter, SetIsSignedInNewsletter] = useState<boolean>(false);
    const [newsletterEmail, setNewsLetterEmail] = useState<string>("");
    const [subscribeNotification] = useSubscribeNotificationsMutation({ variables: { token: newsletterEmail } });

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

    useEffect(() => {
        if (window != null && localStorage.getItem('signedInNewsletter')) {
            let tmp = localStorage.getItem("signedInNewsletter")
            SetIsSignedInNewsletter(tmp === "1" ? true : false);
        }
    }, []);

    const GetBasketPrice = () => {
        let price = 0;

        if (basket === undefined) return price;
        basket.map((item) => {
            price += item.itemQuantity * Number(item.priceUnit);
        });

        return price;
    }

    const GetProductsNumber = () => {
        let productsNumber = 0;

        if (basket === undefined) return productsNumber;
        basket.map((item) => {
            productsNumber += item.itemQuantity;
        });

        return productsNumber;
    }

    return (
        <div className='header-div' style={{ zIndex: 1000, left: '0px', top: '0px', width: '100%', height: '80px', position: 'sticky', display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '10px' }}>
            <CardMedia onClick={() => Router.push("/shop")}
                style={{ left: '20px', marginLeft: "10px", height: '60px', width: '60px', marginRight: '10px', cursor: "pointer" }}
                image={`/images/${tmpTheme}/soto_round_logo_${tmpTheme}.png`}
                className={"roundLogo"}
            />
            <h2>{t('baseline')}</h2>
            <div style={{ marginLeft: 'auto', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <Button
                    onMouseEnter={() => {
                        if (isProfileCardOpen) {
                            SetProfileCardWasOpen(true);
                            SetOpenProfileCard(false);
                        }
                        SetBasketListOpen(true)
                    }}
                    onMouseLeave={() => {
                        if (profileCardWasOpen) {
                            SetProfileCardWasOpen(false);
                            SetOpenProfileCard(true);
                        }
                        SetBasketListOpen(false)
                    }}>
                    <Grid alignItems="center" justify="center" className={"profile-icon"} onClick={() => {
                        SetBasketListOpen(!isBasketListOpen)
                        if (isProfileCardOpen) {
                            SetOpenProfileCard(false);
                        }
                    }} style={{ cursor: "pointer" }}>
                        <Typography>{GetProductsNumber()}</Typography>
                        <FontAwesomeIcon style={{ height: '30px', width: '30px' }} icon={faShoppingBasket} />
                    </Grid>
                </Button>
                <div className={"profile-icon"}
                    onClick={() => {
                        SetOpenProfileCard(!isProfileCardOpen)
                        if (isBasketListOpen) {
                            SetBasketListOpen(false);
                        }
                    }}
                    style={{ cursor: "pointer", marginRight: "20px  " }}>
                    <FontAwesomeIcon style={{ height: '45px', width: '45px', cursor: "pointer", marginLeft: "20px" }} icon={faUserCircle} className={"profile-icon"} />
                </div>
                {isBasketListOpen && basket !== undefined && <Card style={{ position: "absolute", right: "20px", top: "75px", width: "300px", padding: "10px 20px", zIndex: 100 }}>
                    <Grid container>
                        <Grid item xs={12} style={{ textAlign: "right" }}><Typography style={{ textAlign: "right" }}>Total : {" " + GetBasketPrice() + " "}€</Typography></Grid>
                        {basket.map((item, index) => {
                            return (<Grid key={index} item xs={12}><Typography display="inline">{item.name}</Typography><Typography display="inline" style={{ fontWeight: 600 }}>{" x" + item.itemQuantity}</Typography></Grid>);
                        })}
                    </Grid>
                </Card>}
                {isProfileCardOpen && <>
                    {newsletterCardOpen === true ?
                        <Card style={{ position: "absolute", right: "20px", top: "75px", width: "300px", padding: "10px 20px" }}>
                            <Typography>Inscription newsletter</Typography>
                            <TextField value={newsletterEmail} onChange={(e) => {
                                setNewsLetterEmail(e.target.value);
                            }} />
                            <Button onClick={() => {
                                SetNewsletterCardOpen(!newsletterCardOpen)
                                setNewsLetterEmail("");
                            }}>cancel</Button>
                            <Button onClick={() => {
                                subscribeNotification().then(res => {
                                    if (!res) {
                                        notifyError("Sign in newsletter failed")

                                    } else {
                                        notifySuccess("Sign in newsletter success")
                                        SetIsSignedInNewsletter(true);
                                        localStorage.setItem('signedInNewsletter', '1');
                                    }
                                });
                                SetNewsletterCardOpen(!newsletterCardOpen)
                                setNewsLetterEmail("");
                            }}>confirm</Button>
                        </Card> :
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
                                {isSignedInNewsletter === false ? <Button onClick={() => SetNewsletterCardOpen(!newsletterCardOpen)}>Inscription à la newsletter</Button> : <Button onClick={() => {
                                    localStorage.removeItem("signedInNewsletter")
                                    SetIsSignedInNewsletter(false)
                                }}>Se désinscrire de la newsletter</Button>}

                                {data && data.account &&
                                    <Grid container justify="center">
                                        <Grid item xs={12}>
                                            <Typography style={{ marginBottom: "5px", textAlign: "center" }}>{data.account.currentShop.name}</Typography>
                                        </Grid>
                                        <Grid item xs={12} style={{ textAlign: "center" }}>
                                            <PdfGenerator {...{ basket }} />
                                        </Grid>
                                        <Grid item xs={12} style={{ textAlign: "center" }}>
                                            <Link href="#" onClick={() => Router.push("/lists").then(() => { })} color="secondary">{t("label.saved_list")}</Link>
                                        </Grid>
                                    </Grid>
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
                        </Card>}</>}
            </div>
        </div >);
};

export default Header;