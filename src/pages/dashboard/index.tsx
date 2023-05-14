
import { Box, Typography } from '@mui/material';

import { DashboardLayaout } from '../../components/layouts';
import { DashBoardClient, DashboardCoach } from '../../components/dashboard';

export const dashboardPage = () => {

  const user = {
    role: 'client'
  }

  return (
    <DashboardLayaout title={'Teslo-Shop - Home'} pageDescription={'Find the best Teslo products here'}>
      {
        user.role === 'coach' ? (
          <>
            <Typography variant='h1' component='h1'>Dashboard de Administración:</Typography>
            <Box sx={{ marginTop: '30px', padding: '0 50px' }}>
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

export default dashboardPage;