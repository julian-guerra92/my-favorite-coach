
import { Box } from '@mui/system';
import { DashboardLayaout } from '../components/layouts/DashboardLayaout';
import { Typography } from '@mui/material';

const Custom404 = () => {
   return (
      <DashboardLayaout title='Page Not Found' pageDescription='There is nothing to show here'>
         <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
         >
            <Typography
               variant='h1'
               component='h1'
               fontSize={80}
               fontWeight={200}
            >
               404 |
            </Typography>
            <Typography marginLeft={1} fontWeight={500}>
               Page Not Found
            </Typography>
         </Box>
      </DashboardLayaout>
   )
}

export default Custom404