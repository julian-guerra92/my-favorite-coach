
import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Box, Button, Grid } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

import { initialData } from '../../database/seed-data';
import { IExercise } from '../../interface';
import { DashboardLayaout } from '../../components/layouts';
import { ExerciseDescription } from '../../components/exercises';

interface Props {
   exercise: IExercise;
}

const ExercisePage: FC<Props> = ({ exercise }) => {

   return (
      <DashboardLayaout title={`${exercise.title}`} pageDescription={'Información detallada de cada ejercicio'}>

         <Box display='flex' justifyContent='right'>
            <Button
               className='circular-btn'
               color='secondary'
               startIcon={<EditOutlined />}
               size='large'
            >
               Editar Ejercicio
            </Button>
         </Box>

         <Grid container display='flex' justifyContent='center' marginTop={3}>
            <Box width={600}>
               <ExerciseDescription exercise={exercise} />
            </Box>
         </Grid>

      </DashboardLayaout>
   )
}

//*Método para la creación de los paths de las distinas páginas de la App (tener en cuenta llaves en el nombre del archivo)
//TODO: Realizar petición a la base de datos para cargar la información correspondiente
export const getStaticPaths: GetStaticPaths = async (ctx) => {
   const exercises = initialData.exercises;
   return {
      paths: exercises.map(({ id }) => ({
         params: { id }
      })),
      fallback: "blocking"
   }
}

//*Método para crear el contenido estático que va a ir a las props de la página que va a ser renderizada
//TODO: Realizar petición a la base de datos para cargar la información correspondiente
export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { id = '' } = params as { id: string };
   const exercise = initialData.exercises.find(exercise => exercise.id === id);
   if (!exercise) {
      return {
         redirect: {
            destination: '/',
            permanent: false
         }
      }
   }
   return {
      props: {
         exercise
      },
      revalidate: 86400, //*Revalida el contenido de la paǵina en este tiempo determinado
   }
}

export default ExercisePage;