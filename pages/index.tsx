import type { NextPage } from 'next';
// components
import Sidebar from '@components/Sidebar';
import Center from '@components/Center';
import { getSession, GetSessionParams } from 'next-auth/react';
import Player from '@components/Player';

const Home: NextPage = () => {
    return (
        <div className="bg-black h-screen overflow-hidden">
            <div className="flex">
                <Sidebar />

                <Center />
            </div>

            <div className="sticky bottom-0">
                <Player />
            </div>
        </div>
    );
};

export default Home;

export async function getServerSideProps(
    context: GetSessionParams | undefined
) {
    const session = await getSession(context);

    return {
        props: {
            session,
        },
    };
}
