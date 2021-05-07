import React, {useState} from "react";
import Header from "../../components/global/Header";
import DarkModeParent from "../../components/encapsulationComponents/DarkModeParent";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import {useRouter} from "next/router";
import {Button, Paper, Typography} from "@material-ui/core";
import {useDarkMode} from "../../components/settings/useDarkMode";
import {useTranslation} from "react-i18next";
import Footer from "../../components/global/Footer";
import ParametersSelect from "../../components/shop/ParametersSelect";
// import {useCriterionsQuery, useObligationsQuery} from "../../typing";

const CriteriaAndObligations = () => {
    const [t] = useTranslation();
    const [theme] = useDarkMode();
    const router = useRouter();
    const [validate, setValidate] = useState(false)

    // if (!criteriaLoading && !obligationsLoading) {
        return (
            <>
                <title>{t("label.criteriaAndObligations")}</title>
                <DarkModeParent theme={theme}>
                    <Header/>
                    <div>
                        <div className={"flexAlignJustifyCentered"} style={{margin: "20px 0px"}}>
                            <a style={{margin: "0px 10px"}} onClick={() => {
                                router.back()
                            }}>
                                <ArrowBackRoundedIcon style={{fontSize: "3rem"}}/>
                            </a>
                            <Typography variant={"h4"} style={{margin: "0px 10px"}}>{t("label.criteriaAndObligations")}</Typography>
                        </div>
                        <Paper variant={"outlined"} className='halfWidth centered body'
                               style={{width: "30%", margin: "50px auto", padding: "20px"}}>
                            <div>
                                <ParametersSelect validate={validate} setValidate={setValidate}/>
                                <div className={"dFlex"}
                                     style={{justifyContent: "flex-end", marginTop: "20px"}}>
                                    <Button color="primary" onClick={() => {
                                        router.back()
                                    }}>
                                        {t("label.general.cancel")}
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => {
                                        setValidate(true)
                                        router.back()
                                    }}>
                                        {t("label.general.validate")}
                                    </Button>
                                </div>
                            </div>
                        </Paper>
                    </div>
                    <div style={{position:"absolute", bottom:'0px', left:'0px', width:'100%'}}>
                        <Footer/>
                    </div>
                </DarkModeParent>
            </>
        )
    // } else {
    //     return (
    //         <>
    //             <DarkModeParent theme={theme}>
    //                 <Header isConnected={true}/>
    //                 <div>
    //                     <Footer/>
    //                 </div>
    //             </DarkModeParent>
    //         </>
    //     )
    // }

}

export default CriteriaAndObligations