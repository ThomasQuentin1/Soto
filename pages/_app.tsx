import type { AppProps /*, AppContext */ } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {ToastContainer} from "react-toastify";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

// export const link = createHttpLink({
//     uri: 'http://localhost:3000'
// })

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/api/graphql'

})

// @ts-ignore
function MyApp({ Component, pageProps }: AppProps)  {
    return (
        <>
            <ApolloProvider client={client}>
                <Component {...pageProps} />
                <ToastContainer />
            </ApolloProvider>
        </>
    )
}

export default MyApp;