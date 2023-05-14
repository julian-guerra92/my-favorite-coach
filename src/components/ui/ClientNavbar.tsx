
import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';

import { UiContext } from '../../context';


export const ClientNavbar = () => {

   const { toggleSideMenu } = useContext(UiContext);

   const { asPath, push } = useRouter();

   const [searchTerm, setSearchTerm] = useState('');

   const [isSearchVisible, setIsSearchVisible] = useState(false);

   return (
      <AppBar>
         <Toolbar>

            <NextLink href='/dashboard' passHref legacyBehavior>
               <Link display='flex' alignItems='center'>
                  <Image src={'/logo-2.png'} alt='logo' width={133} height={43} priority={true} />
               </Link>
            </NextLink>

            <Box flex={1} />

            <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'none', md: 'block' } }} className='fadeIn'>

               <NextLink href='/actividades-fisicas' passHref legacyBehavior>
                  <Link>
                     <Button
                        color={asPath === '/category/women' ? 'primary' : 'info'}
                        sx={{ fontSize: '16px', ml: 1, ":hover": { color: 'black' } }}
                     >
                        Entrenamiento
                     </Button>
                  </Link>
               </NextLink>

               <NextLink href='/calendario' passHref legacyBehavior>
                  <Link>
                     <Button
                        color={asPath === '/category/kids' ? 'primary' : 'info'}
                        sx={{ fontSize: '16px', ml: 1, ":hover": { color: 'black' } }}
                     >
                        Calendario
                     </Button>
                  </Link>
               </NextLink>
            </Box>

            <Box flex={1} />

            <Button
               sx={{ fontSize: '16px', ml: 1 }}
               onClick={toggleSideMenu}
            >
               Menu
            </Button>

         </Toolbar>
      </AppBar>
   )
}
