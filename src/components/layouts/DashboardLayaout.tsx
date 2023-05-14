
import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { ClientNavbar, AdminNavbar, SideMenu } from '../ui';

interface Props {
   title: string;
   pageDescription: string;
   imageFullUrl?: string;
}

export const DashboardLayaout: FC<PropsWithChildren<Props>> = ({ children, title, pageDescription, imageFullUrl }) => {

   const user = {
      role: 'client'
   }

   return (
      <>
         <Head>
            <title>{title}</title>
            <meta name='description' content={pageDescription} />
            <meta name='og:title' content={title} />
            <meta name='og:description' content={pageDescription} />
            {
               imageFullUrl && (<meta name='og:image' content={imageFullUrl} />)
            }
         </Head>
         <nav>
            {
               user.role === 'coach' ? (
                  <AdminNavbar />
               ) : (
                  <ClientNavbar />
               )
            }
         </nav>
         <SideMenu />
         <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
         }}>
            {children}
         </main>
         <footer>
            {/* TODO: mi custom footer*/}
         </footer>
      </>

   )
}
