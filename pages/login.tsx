import LoginController from "../components/login/LoginController";
import DriveSelection from "../components/login/DriveSelection";
import React, { useEffect } from "react";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import Header from "components/global/Header";
import { useShopListQuery } from 'typing';


const LoginPage = () => {
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
                    <LoginController/>
                    {/* {!loading &&
                        <DriveSelection data={data}></DriveSelection>
                    } */}
                </div>
                
            </DarkModeParent>
        </div>
    );
}

export default LoginPage;
