
import { useEffect, useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { DashboardLayaout } from '../../components/layouts';
import { ClientsList } from '../../components/clients';
import { dbUsers } from '../../database';
import { IUser } from '../../interface/user';
import { FullScreenLoading } from '../../components/ui';

const ClientListPage = () => {

   const [users, setUsers] = useState<IUser[]>([]);

   const loadUsers = async () => {
      const usersDb = await dbUsers.getUsersByRole('client');
      setUsers(usersDb);
   }

   useEffect(() => {
      loadUsers();
   }, [])

   return (
      <DashboardLayaout title={'My Favorite Coach - Clientes'} pageDescription={'Listado de clientes registrados en el sistema'}>
         <Typography variant='h1' component='h1' marginBottom={2}>Listado de Todos los Clientes</Typography>
         {
            users.length === 0 //Todo: Debe mejorarse esta condición
               ? <FullScreenLoading />
               : <ClientsList users={users} />
         }
         <IconButton
            href='clients/register'
            size='large'
            sx={{
               color: 'white',
               backgroundColor: 'secondary.main',
               ':hover': { backgroundColor: 'secondary.main', opacity: 0.9 },
               position: 'fixed',
               right: 50,
               bottom: 50
            }}
         >
            <AddOutlined sx={{ fontSize: 50 }} />
         </IconButton>
      </DashboardLayaout>
   )
}

export default ClientListPage;
