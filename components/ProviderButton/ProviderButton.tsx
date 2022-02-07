import React from 'react';
import { ProviderButtonProps } from './ProviderButton.props';

const ProviderButton: React.FC<ProviderButtonProps> = ({
    id,
    text,
    className,
    onClick,
}: ProviderButtonProps) => {
    const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = () =>
        onClick(id);

    return (
        <button className={className} onClick={handleButtonClick}>
            {text}
        </button>
    );
};

export default ProviderButton;
