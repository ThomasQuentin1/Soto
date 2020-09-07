import React from 'react'
import Link from 'next/link'
import {useDarkMode} from "../components/settings/useDarkMode";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import {Typography} from "@material-ui/core";

export default () => {
    const [theme] = useDarkMode();
    const tmpTheme: string = theme.toString();

    return (
        <DarkModeParent theme={tmpTheme}>

            <ul>
                {/*<li>*/}
                {/*    <Link href="/a" as="/a">*/}
                {/*        <Typography color="secondary">A</Typography>*/}
                {/*    </Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <Link href="/b" as="/b">*/}
                {/*        <Typography color="secondary">B</Typography>*/}
                {/*    </Link>*/}
                {/*</li>*/}
                <li>
                    <Link href="/login" as="/login">
                        <Typography color="secondary" style={{cursor: "pointer"}}>Login</Typography>
                    </Link>
                </li>
                <li>
                    <Link href="/profile" as="/profile">
                        <Typography color="secondary" style={{cursor: "pointer"}}>Profile</Typography>
                    </Link>
                </li>
            </ul>
        </DarkModeParent>
    )
}
