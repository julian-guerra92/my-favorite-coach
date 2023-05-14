
import React from 'react';
import { Box, Grid } from '@mui/material';
import { SummaryTile } from '../admin';
import { AccessTimeOutlined, AssignmentTurnedInOutlined, FitnessCenterOutlined, GroupOutlined, TaskAltOutlined } from '@mui/icons-material';

export const DashboardCoach = () => {
   return (
      <Box className='fadeIn'
         display='flex'
         justifyContent='center'
         alignItems='center'
      >
         <Grid container spacing={2} >
            <SummaryTile
               title={'10'}
               subTitle="Total Clientes"
               icon={<GroupOutlined color='secondary' sx={{ fontSize: 80 }} />}
            />
            <SummaryTile
               title={'55'}
               subTitle="Ejercicios Creados"
               icon={<FitnessCenterOutlined color='success' sx={{ fontSize: 80 }} />}
            />
            <SummaryTile
               title={'30'}
               subTitle="Asignación Semana Anterior"
               icon={<AssignmentTurnedInOutlined color='secondary' sx={{ fontSize: 80 }} />}
            />
            <SummaryTile
               title={'20'}
               subTitle="Asignación Semana Actual"
               icon={<AssignmentTurnedInOutlined color='warning' sx={{ fontSize: 80 }} />}
            />
            <SummaryTile
               title={'15'}
               subTitle="Actividades Ejecutadas"
               icon={<TaskAltOutlined color='success' sx={{ fontSize: 80 }} />}
            />
            <SummaryTile
               title={'60'}
               subTitle="Actualización en:"
               icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 80 }} />}
            />
         </Grid>
      </Box>
   )
}
