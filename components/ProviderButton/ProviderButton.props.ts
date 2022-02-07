import { BuiltInProviderType } from 'next-auth/providers';
import { LiteralUnion } from 'next-auth/react/types';

export type ProviderButtonProps = {
    id: LiteralUnion<BuiltInProviderType, string>;
    text: string;
    className: string;
    onClick: (id: LiteralUnion<BuiltInProviderType, string>) => void;
};
