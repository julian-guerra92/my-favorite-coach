
import { IconButton, Typography } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { DashboardLayaout } from '../../components/layouts';
import { ClientsList } from '../../components/clients';
import { initialData } from '../../database/seed-data';

const ClientListPage = () => {

   return (
      <DashboardLayaout title={'My Favorite Coach - Clientes'} pageDescription={'Listado de clientes registrados en el sistema'}>
         <Typography variant='h1' component='h1'>Clientes</Typography>
         <Typography variant='h2' sx={{ mb: 1 }}>Listado de Todos los Clientes</Typography>
         <ClientsList users={initialData.users} />
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
