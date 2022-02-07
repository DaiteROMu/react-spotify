import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Layout } from '../components';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <SessionProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
};

export default MyApp;
