
import { Typography } from '@mui/material';

import { DashboardLayaout } from '../../components/layouts';
import { ClientsList } from '../../components/clients';
import { initialData } from '../../database/seed-data';

export const ClientsPage = () => {

   return (
      <DashboardLayaout title={'My Favorite Coach - Clientes'} pageDescription={'Listado de clientes registrados en el sistema'}>
         <Typography variant='h1' component='h1'>Clientes</Typography>
         <Typography variant='h2' sx={{ mb: 1 }}>Listado de Todos los Clientes</Typography>
         <ClientsList users={initialData.users} />
      </DashboardLayaout>
   )
}

export default ClientsPage;
