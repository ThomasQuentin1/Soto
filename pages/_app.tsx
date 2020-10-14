import type { AppProps /*, AppContext */ } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {ToastContainer} from "react-toastify";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

// export const link = createHttpLink({
//     uri: 'http://localhost:3000'
// })

export const clientLocal = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/api/graphql'
})
// uri: 'http://' + process.env.NODE_ENV === 'development' ? 'localhost:3000' : 'soto.app' + '/api/graphql'

export const clientProd = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://soto.app/api/graphql'
})

// @ts-ignore
function MyApp({ Component, pageProps }: AppProps)  {
    console.log(process.env.NODE_ENV)
    return (
        <>
            <ApolloProvider client={process.env.NODE_ENV == "development" ? clientLocal : clientProd}>
                <Component {...pageProps} />
                <ToastContainer />
            </ApolloProvider>
        </>
    )
}

export default MyApp;
