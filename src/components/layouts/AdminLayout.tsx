

import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { Box, Typography } from '@mui/material';
// import { AdminNavbar } from '../admin';
import { SideMenu } from '../ui';

interface Props {
   title: string;
   subTitle: string;
   icon?: JSX.Element;
}

export const AdminLayout: FC<PropsWithChildren<Props>> = ({ children, title, subTitle, icon }) => {
   return (
      <>
         <Head>
            <title>{title}</title>
         </Head>
         <nav>
            {/* <AdminNavbar /> */}
         </nav>
         <SideMenu />
         <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
         }}>
            <Box display='flex' flexDirection='column'>
               <Typography variant='h1' component='h1'>
                  {icon}
                  {' ' + title}
               </Typography>
               <Typography variant='h2' sx={{ mb: 1 }}>
                  {subTitle}
               </Typography>
            </Box>
            <Box className='fadeIn'>
               {children}
            </Box>
         </main>
      </>

   )
}
