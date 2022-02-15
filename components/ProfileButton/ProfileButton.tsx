import React from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import defaultUserProfileImg from 'public/avatar.svg';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { ProfileButtonProps } from './ProfileButton.props';

const ProfileButton: React.FC<ProfileButtonProps> = ({ name, imageUrl }) => {
    const handleProfileButtonClick: React.MouseEventHandler<
        HTMLDivElement
    > = () => {
        signOut();
    };

    return (
        <header className="absolute top-5 right-8">
            <div
                className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
                onClick={handleProfileButtonClick}
            >
                <div className="relative w-10 h-10">
                    <Image
                        className="rounded-full"
                        layout="fill"
                        objectFit="cover"
                        src={imageUrl ?? defaultUserProfileImg}
                        alt="user image"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <h2>{name}</h2>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            </div>
        </header>
    );
};

export default React.memo(ProfileButton);
