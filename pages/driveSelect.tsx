import DriveSelection from "../components/login/DriveSelection";
import React from "react";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import Header from "components/global/Header";
import { useShopListQuery } from 'typing';
import '../i18n';
import { BrowserRouter } from "react-router-dom";

const DriveSelectPage = () => {
    const [theme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    let lng : string | null = 'fr';
    if (typeof window !== 'undefined') {
      lng = localStorage.getItem('lng');
      if (lng == null) {
        localStorage.setItem('lng', 'fr');
      }
    }

    const {data, loading} = useShopListQuery();
      
    return (
        <div>
            <DarkModeParent theme={tmpTheme}>
                <Header/>
                <div>
                    {!loading &&
                        <DriveSelection data={data}></DriveSelection>
                    }
                </div>
            </DarkModeParent>
        </div>
    );
}

export default DriveSelectPage;
