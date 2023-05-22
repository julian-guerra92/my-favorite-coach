
import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { SummaryTile } from '../admin';
import { AccessTimeOutlined, AssignmentTurnedInOutlined, FitnessCenterOutlined, GroupOutlined, TaskAltOutlined } from '@mui/icons-material';
import { dbExercise, dbUsers } from '../../database';

export const DashboardCoach = () => {

   const [refreshIn, setrefreshIn] = useState(60);

   const [totalClients, setTotalClients] = useState<Number>(0);

   const [totalExercises, setTotalExercises] = useState<Number>(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setrefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 60);
      }, 1000);
      return () => clearInterval(interval);
   }, []);

   useEffect(() => {
      const interval = setInterval(() => {
         getData();
      }, 60000)
      return () => clearInterval(interval);
   }, [])

   useEffect(() => {
      getData();
   }, [])

   const getData = async () => {
      const totalClients = await dbUsers.getTotalUsersByRole('client');
      const totalExercises = await dbExercise.getTotalExercises();
      setTotalExercises(totalExercises);
      setTotalClients(totalClients);
   }

   return (
      <Box className='fadeIn'
         display='flex'
         justifyContent='center'
         alignItems='center'
      >
         <Grid container spacing={2} >
            <SummaryTile
               title={`${totalClients}`}
               subTitle="Total Clientes"
               icon={<GroupOutlined color='secondary' sx={{ fontSize: 80 }} />}
            />
            <SummaryTile
               title={`${totalExercises}`}
               subTitle="Ejercicios Creados"
               icon={<FitnessCenterOutlined color='success' sx={{ fontSize: 80 }} />}
            />
            <SummaryTile
               title={'30'}
               subTitle="Actividades Semana Anterior"
               icon={<AssignmentTurnedInOutlined color='secondary' sx={{ fontSize: 80 }} />}
            />
            <SummaryTile
               title={'20'}
               subTitle="Actividades Semana Actual"
               icon={<AssignmentTurnedInOutlined color='warning' sx={{ fontSize: 80 }} />}
            />
            <SummaryTile
               title={'15'}
               subTitle="Actividades Ejecutadas"
               icon={<TaskAltOutlined color='success' sx={{ fontSize: 80 }} />}
            />
            <SummaryTile
               title={refreshIn}
               subTitle="Actualización en:"
               icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 80 }} />}
            />
         </Grid>
      </Box>
   )
}
