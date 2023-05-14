
import React from 'react';
import { Box, Grid } from '@mui/material';
import { SummaryTile } from '../admin';
import { AccessTimeOutlined, AssignmentOutlined, AssignmentTurnedInOutlined, FitnessCenterOutlined, GroupOutlined, TaskAltOutlined, TimerOutlined } from '@mui/icons-material';

export const DashBoardClient = () => {
   return (
      <Box className='fadeIn'
         display='flex'
         justifyContent='center'
         alignItems='center'
      >
         <Grid container spacing={2} >
            <SummaryTile
               title={'10'}
               subTitle="Actividades del día"
               icon={<FitnessCenterOutlined color='secondary' sx={{ fontSize: 80 }} />}
            />
            <SummaryTile
               title={'25'}
               subTitle="Actividades Semana"
               icon={<AssignmentOutlined color='success' sx={{ fontSize: 80 }} />}
            />
            <SummaryTile
               title={'10'}
               subTitle="Horas Semana Anterior"
               icon={<TimerOutlined color='secondary' sx={{ fontSize: 80 }} />}
            />
            <SummaryTile
               title={'8'}
               subTitle="Horas Semana Actual"
               icon={<TimerOutlined color='warning' sx={{ fontSize: 80 }} />}
            />
            <SummaryTile
               title={'15'}
               subTitle="Cumplimiento Actividades"
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
