
import { ChangeEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {
   AccountCircleOutlined, CalendarMonthOutlined, EqualizerOutlined, FitnessCenterOutlined, GroupOutlined, LoginOutlined, SearchOutlined
} from "@mui/icons-material";
import { DashboardOutlined } from '@mui/icons-material';

import { AuthContext, UiContext } from "../../context";


export const SideMenu = () => {

   const router = useRouter();

   const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

   const { isLoggedIn, user, logout } = useContext(AuthContext);

   const [searchTerm, setSearchTerm] = useState('');

   const navigateTo = (url: string) => {
      router.push(url);
      toggleSideMenu();
   }

   const onChageTerm = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = target;
      setSearchTerm(value);
   }

   const onSearchTerm = () => {
      if (searchTerm.trim().length === 0) return;
      navigateTo(`/search/${searchTerm}`);
   }

   const onLogout = (url: string) => {
      logout();
      toggleSideMenu();
      router.replace(url);
   }

   return (
      <Drawer
         open={isMenuOpen}
         onClose={toggleSideMenu}
         anchor='right'
         sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      >
         <Box sx={{ width: 300, paddingTop: 5 }}>

            <List>

               <ListItem>
                  <Input
                     autoFocus
                     value={searchTerm}
                     onChange={onChageTerm}
                     onKeyUp={(event) => event.key === 'Enter' ? onSearchTerm() : null}
                     type='text'
                     placeholder="Buscar..."
                     endAdornment={
                        <InputAdornment position="end">
                           <IconButton
                              onClick={onSearchTerm}
                           >
                              <SearchOutlined />
                           </IconButton>
                        </InputAdornment>
                     }
                  />
               </ListItem>

               <ListItemButton>
                  <ListItemIcon>
                     <AccountCircleOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Perfil'} />
               </ListItemButton>

               <ListItemButton onClick={() => navigateTo('/dashboard')}>
                  <ListItemIcon>
                     <DashboardOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Dashboard'} />
               </ListItemButton>

               <ListItemButton onClick={() => navigateTo('/dashboard')}>
                  <ListItemIcon>
                     <EqualizerOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Metas e Indicadores'} />
               </ListItemButton>


               {/* Vista Entrenador */}
               {
                  user?.role?.description === 'coach' && (
                     <>
                        <ListItemButton
                           sx={{ display: { xs: '', sm: '', md: 'none' } }}
                           onClick={() => navigateTo('/clients')}
                        >
                           <ListItemIcon>
                              <GroupOutlined />
                           </ListItemIcon>
                           <ListItemText primary={'Clientes'} />
                        </ListItemButton>

                        <ListItemButton
                           sx={{ display: { xs: '', sm: '', md: 'none' } }}
                           onClick={() => navigateTo('/exercises')}
                        >
                           <ListItemIcon>
                              <FitnessCenterOutlined />
                           </ListItemIcon>
                           <ListItemText primary={'Actividades Físicas'} />
                        </ListItemButton>

                        <ListItemButton
                           sx={{ display: { xs: '', sm: '', md: 'none' } }}
                           onClick={() => navigateTo('/')}
                        >
                           <ListItemIcon>
                              <CalendarMonthOutlined />
                           </ListItemIcon>
                           <ListItemText primary={'Calendario'} />
                        </ListItemButton>
                     </>
                  )
               }

               {/* Vista Usuario */}
               {
                  user?.role?.description === 'user' && (
                     <>
                        <ListItemButton
                           sx={{ display: { xs: '', sm: '', md: 'none' } }}
                           onClick={() => navigateTo('/category/men')}
                        >
                           <ListItemIcon>
                              <FitnessCenterOutlined />
                           </ListItemIcon>
                           <ListItemText primary={'Entrenamiento'} />
                        </ListItemButton>

                        <ListItemButton
                           sx={{ display: { xs: '', sm: '', md: 'none' } }}
                           onClick={() => navigateTo('/category/kids')}
                        >
                           <ListItemIcon>
                              <CalendarMonthOutlined />
                           </ListItemIcon>
                           <ListItemText primary={'Calendario'} />
                        </ListItemButton>
                     </>
                  )
               }

               <ListItemButton onClick={() => onLogout('/')}>
                  <ListItemIcon>
                     <LoginOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Salir'} />
               </ListItemButton>

            </List>
         </Box>
      </Drawer >
   )
}

//TODO: Validar vista con el JWT para verificar perfil de usuario
