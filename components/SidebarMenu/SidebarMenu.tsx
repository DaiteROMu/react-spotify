import React from 'react';
import Image from 'next/image';
import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
} from '@heroicons/react/outline';

const SidebarMenu: React.FC = () => {
    return (
        <>
            <div className="flex flex-row space-x-3">
                <div className="flex flex-row justify-center w-10">
                    <Image
                        width="100%"
                        height="100%"
                        src="https://links.papareact.com/9xl"
                        alt="spotify-logo"
                    />
                </div>
                <div>
                    <h1 className="text-white font-bold text-2xl tracking-widest">
                        SPOTIFY
                    </h1>
                </div>
            </div>
            <hr className="border-t-[0.1px] border-gray-900" />

            <button className="flex items-center space-x-2 hover:text-white">
                <HomeIcon className="h-5 w-5" />
                <p>Home</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <SearchIcon className="h-5 w-5" />
                <p>Search</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <LibraryIcon className="h-5 w-5" />
                <p>Your Library</p>
            </button>
            <hr className="border-t-[0.1px] border-gray-900" />

            <button className="flex items-center space-x-2 hover:text-white">
                <PlusCircleIcon className="h-5 w-5" />
                <p>Create your playlist</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <HeartIcon className="h-5 w-5" />
                <p>Liked Songs</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <RssIcon className="h-5 w-5" />
                <p>Your Episodes</p>
            </button>
            <hr className="border-t-[0.1px] border-gray-900" />
        </>
    );
};

export default React.memo(SidebarMenu);
