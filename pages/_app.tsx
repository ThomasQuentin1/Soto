import type { AppProps /*, AppContext */ } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {ToastContainer} from "react-toastify";

// @ts-ignore
function MyApp({ Component, pageProps }: AppProps)  {
    return (
        <>
            <Component {...pageProps} />
            <ToastContainer />
        </>
    )
}

export default MyApp;