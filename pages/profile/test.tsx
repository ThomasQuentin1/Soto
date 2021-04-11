import React from "react";
import Header from "../../components/global/Header";
import DarkModeParent from "../../components/encapsulationComponents/DarkModeParent";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import {useRouter} from "next/router";
import {Paper, Typography} from "@material-ui/core";
import ToggleColorMode from "../../components/settings/ToggleColorMode";
import {useDarkMode} from "../../components/settings/useDarkMode";
import {i18n} from "../../i18n";


const Test = () => {
    const router = useRouter();

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang)
        localStorage.setItem('lng', lang)
    }

    const langs = ['fr', 'en']
    const [theme, setTheme] = useDarkMode();
    return (
        <>
            <DarkModeParent theme={theme}>
                <Header isConnected={true}/>
                <div>
                    <Paper variant={"outlined"} className='halfWidth centered body' style={{width: "30%", margin: "50px auto"}}>
                        <div className={"flexAlignJustifyCentered"} style={{marginTop: "20px"}}>
                            <a onClick={() => {
                                router.back()
                            }} style={{margin: "0px 10px"}}>
                                <ArrowBackRoundedIcon style={{fontSize: "3rem"}}/>
                            </a>
                            {/*<Typography style={{fontSize: "24px"}}>Test page</Typography>*/}
                            <Typography variant={"h3"} style={{margin: "0px 10px"}}>Test page</Typography>
                        </div>
                        <h4>Work In Progress</h4>
                        <ToggleColorMode theme={theme} toggleTheme={setTheme}/>
                        <div style={{position:"absolute", display: "flex", top:"100px", right:"10px"}}>
                            {langs.map((lang, index) => {
                                console.log(lang)
                                return (
                                    <img
                                        key={index}
                                        src={`../images/common/flag_${lang}.png`}
                                        className={"flagLogo"}
                                        alt={"roundSotoLogo"}
                                        onClick={() => {
                                            changeLang(lang)}
                                        }
                                    />
                                )
                            })}
                        </div>
                    </Paper>
                </div>
            </DarkModeParent>
        </>
    )
}

export default Test