
import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import Image from 'next/image';

interface Props {
   title: string;
}

export const AuthLayout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
   return (
      <>
         <Head>
            <title>{title}</title>
         </Head>
         <main>
            <Box position={'fixed'} top={10} left={10}>
               <Image src={'/logo.png'} alt='logo' width={313} height={135} priority={true} />
            </Box>
            <Box
               display='flex'
               justifyContent='center'
               alignItems='center'
               height='calc(100vh - 80px)'
            >
               {children}
            </Box>
         </main>
      </>
   )
}
