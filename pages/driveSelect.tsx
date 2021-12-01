import DriveSelection from "../components/driveSelect/DriveSelection";
import React from "react";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import Header from "components/global/Header";
import { useShopListQuery } from 'typing';
import '../i18n';

const DriveSelectPage = () => {
    const [theme, SetTheme] = useDarkMode();
    const tmpTheme: string = theme.toString();
    let lng: string | null = 'fr';
    if (typeof window !== 'undefined') {
        lng = localStorage.getItem('lng');
        if (lng == null) {
            localStorage.setItem('lng', 'fr');
        }
    }

    const { data, loading } = useShopListQuery();

    return (
        <div>
            <title>Sélection de drive</title>
            <DarkModeParent theme={tmpTheme}>
                <Header {...{ theme, SetTheme }} />
                <div>
                    {!loading &&
                        <DriveSelection data={data} />
                    }
                </div>
            </DarkModeParent>
        </div>
    );
}

export default DriveSelectPage;
