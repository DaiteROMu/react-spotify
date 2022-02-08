import type { NextPage } from 'next';
// components
import Sidebar from '@components/Sidebar';
import Center from '@components/Center';

const Home: NextPage = () => {
    return (
        <div className="bg-black h-screen overflow-hidden">
            <div className="flex">
                <Sidebar />

                <Center />
            </div>

            <div>{/* Player */}</div>
        </div>
    );
};

export default Home;
