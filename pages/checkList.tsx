import { useDarkMode } from "../components/settings/useDarkMode";
import React, { useCallback, useEffect, useState } from "react";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import { useTranslation } from "react-i18next";
import '../i18n'
import { FavoredListObject } from "../components/shop/PriceBanner";
import { CardMedia, Checkbox, Divider, MenuItem, Paper, Select, Typography } from "@mui/material";
import { notifyError } from "../public/notifications/notificationsFunctions";
import Grid from "@mui/material/Grid";
import { FiberManualRecord } from "@mui/icons-material";
import { selectColor } from "../styles/globalStyle";

const CheckListPage = () => {
    const [t, i18n] = useTranslation();
    const [theme, SetTheme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    const [favList, updateFavList] = useState<FavoredListObject[]>([]);
    const [listIndex, setListIndex] = useState(0)
    const [checkedList, setCheckedList] = useState<boolean[]>([])

    if (typeof window !== 'undefined') {
        if (favList.length === 0) {
            const elem = JSON.parse(localStorage.getItem("listFav") as string)
            console.log(elem);
            if (elem === null || elem.length === 0) {
                notifyError("")
            }
            else
                updateFavList(JSON.parse(localStorage.getItem("listFav") as string))
        }
        if (localStorage.getItem('lng') == null)
            localStorage.setItem('lng', 'fr');
        useEffect(() => {
            i18n.changeLanguage(localStorage.getItem('lng') as string).then()
        }, []);
    }
    useCallback(() => { }, [checkedList])

    // useEffect(() => {
    // }, [checkedList]);

    const handleChange = (event: any) => {
        setListIndex(event.target.value);
    };

    const handleChangeChecked = (indexToChange: number) => {
        let tmpList: boolean[] = [];
        checkedList.map((elem, index) => {
            if (indexToChange === index) {
                tmpList.push(!elem)
            } else {
                tmpList.push(elem)
            }
        });
        console.log(tmpList)
        setCheckedList(tmpList);
    };

    const setupCheckedList = () => {
        const elem = favList[listIndex]
        let tmpList: boolean[] = []
        elem.products.map(() => {
            tmpList.push(false);
        })
        setCheckedList(tmpList)
    }

    if (favList) {
        return (
            <>
                <DarkModeParent theme={tmpTheme}>
                    <Header {...{ theme, SetTheme }} />
                    <div className="flexJustifiedCenter" style={{ marginTop: "150px" }}>
                        <Paper className="paperStyle " elevation={3}>
                            <div className="flexJustifiedCenter">
                                <Select className="" color={"secondary"} variant={"outlined"}
                                    value={listIndex} onChange={handleChange} style={{ minWidth: "10vw" }} >
                                    {
                                        favList.length > 0 && favList.map((elem, index) => {
                                            return (
                                                <MenuItem key={"select" + index} value={index}>{elem.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                            <Divider className="divider" />
                            <div>
                                <Grid container direction='row' justifyContent='space-evenly' wrap='wrap' style={{ paddingTop: '20px' }}
                                    spacing={2}>
                                    {
                                        favList.length > 0 && favList[listIndex].products.map((elem, index) => {
                                            if (checkedList.length === 0)
                                                setupCheckedList()
                                            return (
                                                <Grid item key={index} className={"dFlex"} xs={12}
                                                    // sm={11} md={11} lg={11} xl={11}
                                                    style={{ padding: "10px 50px" }}
                                                >
                                                    <div className="dFlex alignCenter" style={{ margin: "0px 20px" }}>
                                                        <Checkbox color="secondary" onChange={() => {
                                                            handleChangeChecked(index)
                                                        }}
                                                            checked={checkedList[index]}
                                                        />
                                                    </div>
                                                    <div style={{
                                                        width: "20vw", height: "20vw", objectFit: "contain",
                                                        marginRight: "20px"
                                                    }}>
                                                        <CardMedia
                                                            style={{ width: '100%', height: '100%' }}
                                                            image={elem.photo as string}>
                                                        </CardMedia>
                                                    </div>
                                                    <div className="flexDirCol flexJustifiedCenter">
                                                        <div>
                                                            <Typography>{elem.name}</Typography>
                                                            <Typography>{t("label.quantity")} {elem.itemQuantity}</Typography>
                                                            <Typography>
                                                                {t("label.price")} {Number(elem.priceUnit).toFixed(2)} €
                                                            </Typography>
                                                        </div>
                                                        <div className="dFlex">
                                                            <Typography>{t("label.score.final")} {elem.scoreHealth}</Typography>
                                                            <FiberManualRecord htmlColor={selectColor(Number(elem.scoreHealth), false)} />
                                                        </div>
                                                    </div>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </div>
                        </Paper>
                    </div>
                </DarkModeParent>
            </>
        )
    }
    return (
        <>
            <DarkModeParent theme={tmpTheme}>
                <Header {...{ theme, SetTheme }} />
                <Footer />
            </DarkModeParent>
        </>
    )
}

export default CheckListPage;