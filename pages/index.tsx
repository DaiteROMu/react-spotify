import type { NextPage } from 'next';
import { Sidebar } from '../components';

const Home: NextPage = () => {
    return (
        <div className="bg-black h-screen overflow-hidden">
            <div>
                <Sidebar />

                {/* Center */}
            </div>

            <div>{/* Player */}</div>
        </div>
    );
};

export default Home;
