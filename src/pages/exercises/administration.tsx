
import { ChangeEvent, FC, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Alert, Box, Button, Card, CardActions, CardMedia, CircularProgress, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography, capitalize } from '@mui/material';

import { DashboardLayaout } from '../../components/layouts';
import { validations } from '../../utils';
import { FormDataExercise, IExercise } from '../../interface';
import { dbExercise } from '../../database';
import { myFavoriteCoachNextApi } from '../../api';

const validIntensity = ['baja', 'media', 'alta'];

interface Props {
   exercise: IExercise
}

const AdministrationExercisePage: FC<Props> = ({ exercise }) => {

   const [isSaving, setIsSaving] = useState(false);

   const [isLoading, setIsLoading] = useState(false);

   const [showError, setShowError] = useState(false);

   const router = useRouter();

   const fileInputRef = useRef<HTMLInputElement>(null);

   const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormDataExercise>({defaultValues: exercise})

   const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (!target.files) {
         return;
      }
      try {
         setIsLoading(true);
         const formData = new FormData();
         formData.append('file', target.files[0]);
         const { data } = await myFavoriteCoachNextApi.post<{ message: string }>('/uploadImage', formData);
         setValue('referenceImage', data.message, { shouldValidate: true })
      } catch (error) {
         console.log({ error });
      }
   }

   const onDeleteImage = async () => {
      try {
         const imageUrl = getValues('referenceImage');
         await myFavoriteCoachNextApi.post('/deleteImage', { data: imageUrl });
         setValue(
            'referenceImage',
            undefined,
            { shouldValidate: true }
         )
         setIsLoading(false);
      } catch (error) {
         console.log(error);
      }
   }

   const onSubmit = async (formData: FormDataExercise) => {
      if (!formData.referenceImage) {
         setShowError(true);
         setTimeout(() => setShowError(false), 4000);
         return;
      }
      try {
         setIsSaving(true);
         let newExercise: IExercise;
         if (exercise) {
            exercise = { ...formData }
            newExercise = await dbExercise.update(exercise);
         } else {
            newExercise = await dbExercise.create(formData);
         }
         router.replace(`/exercises/${newExercise.id}`)
      } catch (error) {
         console.log(error);
         setIsSaving(false);
      }
   }

   return (
      <DashboardLayaout title={'Registro de Nuevo Cliente'} pageDescription={'Registro de un nuevo cliente en la aplicación'}>

         <Typography variant='h1' component='h1' marginTop='30px' marginBottom='15px'>Crear o Editar Ejercicio</Typography>

         <form onSubmit={handleSubmit(onSubmit)}>

            <Grid container spacing={2}>

               <Grid item xs={12} sm={12} md={7}>

                  <TextField
                     label="Título"
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     {...register('title', {
                        required: 'Este Campo es Requerido!',
                        minLength: { value: 2, message: 'El título debe contener como mínimo 2 caracteres!' }
                     })}
                     error={!!errors.title}
                     helperText={errors.title?.message}
                  />

                  <TextField
                     label="Descripción"
                     variant="filled"
                     fullWidth
                     multiline
                     rows={8}
                     sx={{ mb: 1 }}
                     {...register('description', {
                        required: 'Este Campo es Requerido!',
                        minLength: { value: 30, message: 'La descripción debe contener como mínimo 30 caracteres!' }
                     })}
                     error={!!errors.description}
                     helperText={errors.description?.message}
                  />

                  <TextField
                     label="Calorías por Sesión"
                     type='number'
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     {...register('calories', {
                        required: 'Este Campo es Requerido!',
                        min: { value: 1, message: 'La edad debe ser mayor o igual a 1' }
                     })}
                     error={!!errors.calories}
                     helperText={errors.calories?.message}
                  />

                  <Divider sx={{ my: 2 }} />

                  <FormControl >
                     <FormLabel>Intensidad del Ejercicio</FormLabel>
                     <RadioGroup
                        row
                        value={getValues('intensity')}
                        onChange={({ target }) => setValue('intensity', target.value, { shouldValidate: true })}
                     >
                        {
                           validIntensity.map(option => (
                              <FormControlLabel
                                 key={option}
                                 value={option}
                                 control={<Radio color='secondary' />}
                                 label={capitalize(option)}
                              />
                           ))
                        }
                     </RadioGroup>
                  </FormControl>

               </Grid>

               <Grid item xs={12} sm={12} md={5}>

                  <FormLabel >Imagen de Referencia (jpge, png o gif)</FormLabel>

                  <Button
                     color="secondary"
                     fullWidth
                     startIcon={<UploadOutlined fontSize='large' sx={{ display: isLoading ? 'none' : 'flex' }} />}
                     className='circular-btn'
                     sx={{ mt: 1, mb: 1, display: getValues('referenceImage') ? 'none' : 'flex' }}
                     size='large'
                     disabled={isLoading}
                     onClick={() => fileInputRef.current?.click()}
                  >
                     {
                        isLoading
                           ? (
                              <CircularProgress color='inherit' size={25} />
                           )
                           : 'Subir Imagen de Referencia'
                     }
                  </Button>
                  <input
                     ref={fileInputRef} // se utiliza el useRef para hacer referencia al botón que queremes realmente que haga la acción
                     type='file'
                     multiple
                     accept='image/png, image/gif, image/jpeg'
                     style={{ display: 'none' }}
                     onChange={onFileSelected}
                  />

                  <Card sx={{ display: getValues('referenceImage') ? 'block' : 'none' }}>
                     <CardMedia
                        component='img'
                        className='fadeIn'
                        image={getValues('referenceImage')}
                        alt={getValues('referenceImage')}
                        height={350}
                     />
                     <CardActions sx={{ justifyContent: 'center' }}>
                        <Button
                           color="error"
                           sx={{ ":hover": { color: 'black' } }}
                           size='large'
                           startIcon={<DeleteOutline fontSize='large' />}
                           onClick={() => onDeleteImage()}
                        >
                           Borrar Selección
                        </Button>
                     </CardActions>
                  </Card>

                  <Stack sx={{ width: '100%', display: showError ? 'flex' : 'none' }} spacing={2}>
                     <Alert variant="filled" severity="warning">
                        Se requiere agregar una foto de perfil!
                     </Alert>
                  </Stack>

               </Grid>

            </Grid>
            <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
               <Button
                  color="secondary"
                  className='circular-btn'
                  startIcon={<SaveOutlined fontSize='large' />}
                  sx={{ width: '150px', mt: 2 }}
                  type="submit"
                  size='large'
                  disabled={isSaving}
               >
                  Guardar
               </Button>
            </Box>
         </form>

      </DashboardLayaout>
   )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
   const { id } = query;
   if (!id) return { props: {} };
   try {
      const exercise = await dbExercise.getById(`${id}`);
      return {
         props: {
            exercise
         }
      }
   } catch (error) {
      console.log(error);
      return {
         redirect: {
            destination: '/exercises',
            permanent: false,
         }
      }
   }
}

export default AdministrationExercisePage;

//TODO: Optimizar la creación de esta página junto con el correspondiente a los usuarios