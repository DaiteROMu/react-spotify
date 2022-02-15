import React, { MouseEventHandler } from 'react';
import { SidebarPlaylistItemProps } from './SidebarPlaylistItem.props';

const SidebarPlaylistItem: React.FC<SidebarPlaylistItemProps> = ({
    id,
    name,
    sidebarPlaylistItemClick,
}) => {
    const handleSidebarPlaylistItemClick: MouseEventHandler<
        HTMLParagraphElement
    > = () => {
        sidebarPlaylistItemClick(id);
    };

    return (
        <p
            onClick={handleSidebarPlaylistItemClick}
            className="cursor-pointer hover:text-white"
        >
            {name}
        </p>
    );
};

export default React.memo(SidebarPlaylistItem);
