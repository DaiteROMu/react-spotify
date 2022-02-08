import React from 'react';
import Image from 'next/image';
import userAvatar from 'public/avatar.svg';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from 'lodash';

const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500',
];

const Center: React.FC = () => {
    const { data: session } = useSession();

    const [color, setColor] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        setColor(shuffle(colors).pop());
    }, []);

    return (
        <div className="flex-grow">
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-[#18D860] space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                    <div className="w-10 h-10">
                        <Image
                            className="rounded-full text-black"
                            width="100%"
                            height="100%"
                            src={session?.user?.image || userAvatar}
                            alt="user image"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <h2>{session?.user?.name}</h2>
                        <ChevronDownIcon className="h-5 w-5" />
                    </div>
                </div>
            </header>

            <section
                className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
            >
                <h1>hello!</h1>
            </section>
        </div>
    );
};

export default Center;
