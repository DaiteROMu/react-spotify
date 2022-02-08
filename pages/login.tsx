import type { NextPage } from 'next';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
// next-auth
import { getProviders, signIn } from 'next-auth/react';
import { LiteralUnion } from 'next-auth/react/types';
import { BuiltInProviderType } from 'next-auth/providers';
// components
import ProviderButton from '@components/ProviderButton';

const Login: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const providerSignIn = (id: LiteralUnion<BuiltInProviderType, string>) => {
        signIn(id, { callbackUrl: '/' });
    };

    return (
        <div className="flex flex-col items-center justify-center bg-black min-h-screen w-full">
            <div className="w-52 mb-5 flex flex-row justify-center">
                <Image
                    width="100%"
                    height="100%"
                    src="https://links.papareact.com/9xl"
                    alt="spotify-logo"
                />
            </div>

            {providers &&
                Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <ProviderButton
                            id={provider.id}
                            text={`Log with ${provider.name}`}
                            className="bg-[#18D860] text-white p-5 rounded-lg"
                            onClick={providerSignIn}
                        />
                    </div>
                ))}
        </div>
    );
};

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}
