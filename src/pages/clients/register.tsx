
import { ChangeEvent, FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardMedia, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography, capitalize } from '@mui/material';

import { DashboardLayaout } from '../../components/layouts';
import { validations } from '../../utils';
import { IUser } from '../../interface';
import { myFavoriteCoachNextApi } from '../../api';

const validGender = ['masculono', 'femenino', 'no especificar'];

interface FormData {
  identificationNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  age: Number;
  weight?: Number;
  height?: Number;
  profilePicture?: string;
}

interface Props {
  user: IUser;
}

const RegisterClientPage: FC<Props> = ({ user }) => {

  const [isSaving, setIsSaving] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({ defaultValues: user })

  const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', target.files[0]);
      const { data } = await myFavoriteCoachNextApi.post<{ message: string }>('/uploadImage', formData);
      setValue('profilePicture', data.message, { shouldValidate: true })
    } catch (error) {
      console.log({ error });
    }
  }

  const onDeleteImage = async () => {
    try {
      const imageUrl = getValues('profilePicture');
      await myFavoriteCoachNextApi.post('/deleteImage', {
        data: imageUrl
      });
      setValue(
        'profilePicture',
        undefined,
        { shouldValidate: true }
      )
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }

  }

  const onSubmit = () => {
    //TODO: implementar lógica
  }

  return (
    <DashboardLayaout title={'Registro de Nuevo Cliente'} pageDescription={'Registro de un nuevo cliente en la aplicación'}>

      <Typography variant='h1' component='h1' marginTop='30px' marginBottom='15px'>Registro Nuevo Cliente</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>

        <Grid container spacing={2}>

          <Grid item xs={12} sm={6}>

            <TextField
              label="Número de Identificación"
              type='number'
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('identificationNumber', {
                required: 'Este Campo es Requerido!',
                minLength: { value: 3, message: 'El número de de identificación debe ser mínimo de 3 cifras!' }
              })}
              error={!!errors.identificationNumber}
              helperText={errors.identificationNumber?.message}
            />

            <TextField
              label="Nombre"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('firstName', {
                required: 'Este Campo es Requerido!',
                minLength: { value: 2, message: 'El nombre debe contener como mínimo 2 caracteres!' }
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />

            <TextField
              label="Apellido"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('lastName', {
                required: 'Este Campo es Requerido!',
                minLength: { value: 2, message: 'El apellido debe contener como mínimo 2 caracteres!' }
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />

            <TextField
              type='email'
              label='Correo Electrónico'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('email', {
                required: 'Este Campo es Requerido!',
                validate: validations.isEmail
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              type='password'
              label='Contraseña'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('password', {
                required: 'Este Campo es Requerido!',
                minLength: { value: 6, message: 'La contraseña debe contener como mínimo 6 caracteres!' }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              {/* //TODO: Esto debe ser fecha de nacimiento */}
              <TextField
                label="Edad"
                type='number'
                variant="filled"
                {...register('age', {
                  required: 'Este Campo es Requerido!',
                  min: { value: 1, message: 'La edad debe ser mayor o igual a 1' }
                })}
                error={!!errors.age}
                helperText={errors.age?.message}
              />

              <TextField
                label="Peso"
                type='number'
                variant="filled"
                sx={{ ml: 1 }}
                {...register('weight', {
                  required: 'Este Campo es Requerido!',
                  min: { value: 1, message: 'El peso debe ser mayor o igual a 1' }
                })}
                error={!!errors.weight}
                helperText={errors.weight?.message}
              />

              <TextField
                label="Altura"
                type='number'
                variant="filled"
                sx={{ ml: 1 }}
                {...register('height', {
                  required: 'Este Campo es Requerido!',
                  min: { value: 1, message: 'La altura debe ser mayor o igual a 1' }
                })}
                error={!!errors.height}
                helperText={errors.height?.message}
              />
            </Box>

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Género</FormLabel>
              <RadioGroup
                row
                value={getValues('gender')}
                onChange={({ target }) => setValue('gender', target.value, { shouldValidate: true })}
              >
                {
                  validGender.map(option => (
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

          <Grid item xs={12} sm={6}>

            <FormLabel>Foto de Perfil</FormLabel>

            <Button
              color="secondary"
              fullWidth
              startIcon={<UploadOutlined fontSize='large' />}
              className='circular-btn'
              sx={{ mt: 1, mb: 2, display: getValues('profilePicture') ? 'none' : 'flex' }}
              size='large'
              disabled={isLoading}
              onClick={() => fileInputRef.current?.click()}
            >
              Subir Imagen
            </Button>
            <input
              ref={fileInputRef} // se utiliza el useRef para hacer referencia al botón que queremes realmente que haga la acción
              type='file'
              accept='image/png, image/gif, image/jpeg'
              style={{ display: 'none' }}
              onChange={onFileSelected}
            />

            <Card sx={{ display: getValues('profilePicture') ? 'block' : 'none' }}>
              <CardMedia
                component='img'
                className='fadeIn'
                image={getValues('profilePicture')}
                height={380}
                alt={getValues('profilePicture')}
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
export default RegisterClientPage;