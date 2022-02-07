import Head from 'next/head';

const Layout: React.FC = ({ children }) => {
    return (
        <>
            <Head>
                <title>React Spotify</title>
            </Head>

            <main>{children}</main>
        </>
    );
};

export default Layout;
