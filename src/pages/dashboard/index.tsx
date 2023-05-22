
import { useContext } from 'react';
import { Box, Typography } from '@mui/material';

import { DashboardLayaout } from '../../components/layouts';
import { DashBoardClient, DashboardCoach } from '../../components/dashboard';
import { AuthContext } from '../../context/auth';

export const DashboardPage = () => {

  const { user } = useContext(AuthContext)

  if (!user) return <></>;

  return (
    <DashboardLayaout title={'My Favorite Coach - Dashboard'} pageDescription={'Entrenamiento personalizado para mejorar tu salud'}>
      {
        user?.role?.description === 'coach' ? (
          <>
            <Typography variant='h1' component='h1'>Dashboard de Administración</Typography>
            <Box sx={{ marginTop: '30px', padding: { sm: '0 50px' } }}>
              <DashboardCoach />
            </Box>
          </>
        ) :
          (
            <>
              <Typography variant='h1' component='h1'>Dashboard de Objetivos:</Typography>
              <Box sx={{ marginTop: '30px', padding: '0 50px' }}>
                <DashBoardClient />
              </Box>
            </>
          )
      }
    </DashboardLayaout>
  )
}

export default DashboardPage;