
import { ChangeEvent, useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar } from '@mui/material';
import { ClearOutlined, SearchOutlined } from '@mui/icons-material';

import { UiContext } from '../../context';
import Image from 'next/image';

export const AdminNavbar = () => {

   const { asPath, push } = useRouter();

   const { toggleSideMenu } = useContext(UiContext);

   const [searchTerm, setSearchTerm] = useState('');

   const [isSearchVisible, setIsSearchVisible] = useState(false);

   const onChageTerm = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = target;
      setSearchTerm(value);
   }

   const onSearchTerm = () => {
      if (searchTerm.trim().length === 0) return;
      push(`/search/${searchTerm}`);
   }

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

               <NextLink href='/clients' passHref legacyBehavior>
                  <Link>
                     <Button
                        color={asPath === '/clients' ? 'primary' : 'info'}
                        sx={{ fontSize: '16px', ":hover": { color: 'black' } }}
                     >
                        Clientes
                     </Button>
                  </Link>
               </NextLink>

               <NextLink href='/actividades-fisicas' passHref legacyBehavior>
                  <Link>
                     <Button
                        color={asPath === '/category/women' ? 'primary' : 'info'}
                        sx={{ fontSize: '16px', ml: 1, ":hover": { color: 'black' } }}
                     >
                        Actividades Físicas
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

            {/* Pantallas grandes */}
            {
               isSearchVisible
                  ? (
                     <Input
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                        className='fadeIn'
                        autoFocus
                        value={searchTerm}
                        onChange={onChageTerm}
                        onKeyUp={(event) => event.key === 'Enter' ? onSearchTerm() : null}
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                           <InputAdornment position="end">
                              <IconButton
                                 onClick={() => setIsSearchVisible(false)}
                              >
                                 <ClearOutlined />
                              </IconButton>
                           </InputAdornment>
                        }
                     />
                  )
                  : (
                     <IconButton
                        className='fadeIn'
                        onClick={() => setIsSearchVisible(true)}
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                     >
                        <SearchOutlined />
                     </IconButton>
                  )
            }

            {/* Pantallas pequeñas */}
            <IconButton
               sx={{ display: { xs: 'flex', sm: 'none' } }}
               onClick={toggleSideMenu}
            >
               <SearchOutlined />
            </IconButton>

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
