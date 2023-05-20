
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardMedia, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography, capitalize } from '@mui/material';

import { DashboardLayaout } from '../../components/layouts';
import { validations } from '../../utils';

const validIntensity = ['bajo', 'medio', 'alto'];

interface FormData {
   title: string;
   description: string;
   calories: Number;
   intensity: string;
   referenceImage: string;
}

const NewExercisePage = () => {

   const [isSaving, setIsSaving] = useState(false);
   const fileInputRef = useRef<HTMLInputElement>(null);
   const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({})

   const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
      //TODO: implementar lógica
   }

   const onDeleteImage = () => {
      //TODO: implementar lógica
   }

   const onSubmit = () => {
      //TODO: implementar lógica
   }

   return (
      <DashboardLayaout title={'Registro de Nuevo Cliente'} pageDescription={'Registro de un nuevo cliente en la aplicación'}>

         <Typography variant='h1' component='h1' marginTop='30px' marginBottom='15px'>Crear Nuevo Ejercicio</Typography>

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
                     startIcon={<UploadOutlined fontSize='large' />}
                     className='circular-btn'
                     sx={{ mt: 1, mb: 1 }}
                     size='large'
                     onClick={() => fileInputRef.current?.click()}
                  >
                     Subir Imagen de Referencia
                  </Button>
                  <input
                     ref={fileInputRef} // se utiliza el useRef para hacer referencia al botón que queremes realmente que haga la acción
                     type='file'
                     multiple
                     accept='image/png, image/gif, image/jpeg'
                     style={{ display: 'none' }}
                     onChange={onFileSelected}
                  />

                  <Card sx={{ marginTop: 1 }}>
                     <CardMedia
                        component='img'
                        className='fadeIn'
                        image={'/exercises/1.gif'}
                        alt={getValues('referenceImage')}
                        height={250}
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
export default NewExercisePage;