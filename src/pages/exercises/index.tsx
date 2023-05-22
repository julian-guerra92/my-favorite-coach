
import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { CardMedia, Grid, IconButton, Link, Typography, capitalize } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { AddOutlined } from '@mui/icons-material';

import { DashboardLayaout } from '../../components/layouts/DashboardLayaout';
import { dbExercise } from '../../database';
import { IExercise } from '../../interface';

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 60, headerAlign: 'center', align: 'center' },
   {
      field: 'img',
      headerName: 'Imagen',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }: GridRenderCellParams) => {
         return (
            <a href={`/exercises/${row.id}`} target='_blank' rel='noreferrer'>
               <CardMedia
                  alt={`${row.title}`}
                  height='60'
                  component='img'
                  className='fadeIn'
                  image={row.img}
               />
            </a>
         )
      }
   },
   {
      field: 'title',
      headerName: 'Título',
      headerAlign: 'center',
      width: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
         return (
            <NextLink href={`/exercises/${row.id}`} passHref legacyBehavior>
               <Link underline='always'>
                  {capitalize(row.title)}
               </Link>
            </NextLink>
         )
      }
   },
   { field: 'calories', headerName: 'Calorías por Sesión', width: 200, headerAlign: 'center', align: 'center' },
   {
      field: 'intensity',
      headerName: 'Intensidad',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => capitalize(params.value)
   }
]

interface Props {
   exercises: IExercise[]
}

const ExercisesPage: FC<Props> = ({ exercises }) => {

   const rows = exercises.map(exercise => ({
      id: exercise.id,
      img: exercise.referenceImage,
      title: exercise.title,
      calories: exercise.calories,
      intensity: exercise.intensity
   }))


   return (
      <DashboardLayaout title={'Actividades Físicas'} pageDescription={'Creación y edición de actividades físicas'}>
         <Typography variant='h1' component='h1' marginTop='30px'>Listado de Actividades Físicas:</Typography>
         <Grid container className='fadeIn' marginBottom={20} marginTop={2}>
            <Grid item xs={12} sx={{ height: 600, width: '100%' }}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                     pagination: {
                        paginationModel: {
                           pageSize: 10,
                        },
                     },
                  }}
                  pageSizeOptions={[10]}
               />
            </Grid>
         </Grid>
         <IconButton
            href='exercises/administration'
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
   try {
      const exercises = await dbExercise.getAll();
      return {
         props: {
            exercises
         }
      }
   } catch (error) {
      console.log(error)
      return {
         redirect: {
            destination: '/dashboard',
            permanent: false,
         }
      }
   }
}

export default ExercisesPage;