import React from "react";
import Header from "../../components/global/Header";
import DarkModeParent from "../../components/encapsulationComponents/DarkModeParent";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useRouter } from "next/router";
import { Button, Paper, Typography } from "@mui/material";
import { useDarkMode } from "../../components/settings/useDarkMode";
import { useTranslation } from "react-i18next";
import Footer from "../../components/global/Footer";
import ParametersSelect from "../../components/shop/ParametersSelect";

const CriteriaAndObligations = () => {
    const [t] = useTranslation();
    const [theme, SetTheme] = useDarkMode();
    const router = useRouter();

    return (
        <>
            <title>{t("label.criteriaAndObligations")}</title>
            <DarkModeParent theme={theme}>
                <Header {...{ theme, SetTheme }} />
                <div style={{ height: "80%" }}>
                    <div className={"flexAlignJustifyCentered"} style={{ margin: "20px 0px" }}>
                        <a style={{ margin: "0px 10px" }} onClick={() => {
                            router.back()
                        }}>
                            <ArrowBackRoundedIcon style={{ fontSize: "3rem" }} />
                        </a>
                        <Typography variant={"h4"} style={{ margin: "0px 10px" }}>{t("label.criteriaAndObligations")}</Typography>
                    </div>
                    <Paper variant={"outlined"} className='halfWidth centered body'
                        style={{ width: "30%", margin: "50px auto", padding: "20px" }}>
                        <div>
                            <ParametersSelect />
                            <div className={"dFlex"}
                                style={{ justifyContent: "flex-end", marginTop: "20px" }}>
                                <Button color="primary" onClick={() => {
                                    router.back()
                                }}>
                                    {t("label.general.cancel")}
                                </Button>
                                <Button variant="contained" color="primary" onClick={() => {
                                    router.back()
                                }}>
                                    {t("label.general.validate")}
                                </Button>
                            </div>
                        </div>
                    </Paper>
                </div>
                <Footer />
            </DarkModeParent>
        </>
    )
}

export default CriteriaAndObligations