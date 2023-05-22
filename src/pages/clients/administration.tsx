
import { ChangeEvent, FC, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Alert, Box, Button, Card, CardActions, CardMedia, CircularProgress, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography, capitalize } from '@mui/material';

import { DashboardLayaout } from '../../components/layouts';
import { validations } from '../../utils';
import { FormDataClient, IUser } from '../../interface';
import { myFavoriteCoachNextApi } from '../../api';
import { dbUsers } from '../../database';

const validGender = ['masculino', 'femenino', 'no especificar'];

interface Props {
  user: IUser;
}

const AdministrationClientPage: FC<Props> = ({ user }) => {

  const [isSaving, setIsSaving] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [showError, setShowError] = useState(false);

  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormDataClient>({ defaultValues: user })

  const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files) {
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
      await myFavoriteCoachNextApi.post('/deleteImage', { data: imageUrl });
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

  const onSubmit = async (formData: FormDataClient) => {
    if (!formData.profilePicture) {
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
      return;
    }
    try {
      setIsSaving(true);
      let client: IUser;
      if (user) {
        user = { ...formData }
        client = await dbUsers.updateClient(user);
      } else {
        client = await dbUsers.createClient(formData);
      }
      router.replace(`/clients/${client.id}`)
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  }

  return (
    <DashboardLayaout title={'Administración de Clientes'} pageDescription={'Registro o edición de un nuevo cliente en la aplicación'}>

      <Typography variant='h1' component='h1' marginTop='30px' marginBottom='15px'>Registro o Edición Clientes</Typography>

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

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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
                sx={{ ml: 1 }}
                {...register('lastName', {
                  required: 'Este Campo es Requerido!',
                  minLength: { value: 2, message: 'El apellido debe contener como mínimo 2 caracteres!' }
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Box>

            <TextField
              label="Número de Teléfono"
              type='number'
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('phoneNumber', {
                required: 'Este Campo es Requerido!',
                minLength: { value: 10, message: 'El número de teléfono debe ser mínimo de 10 cifras!' }
              })}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
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
                variant="filled"
                inputProps={{ inputMode: 'numeric', pattern: '^[0-9]+([.][0-9]+)?$' }}
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
                inputProps={{ inputMode: 'numeric', pattern: '^[0-9]+([.][0-9]+)?$' }}
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
              <FormLabel id='radio-buttons-group'>Género</FormLabel>
              <RadioGroup
                aria-labelledby='radio-buttons-group'
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
              startIcon={<UploadOutlined fontSize='large' sx={{ display: isLoading ? 'none' : 'flex' }} />}
              className='circular-btn'
              sx={{ mt: 1, mb: 2, display: getValues('profilePicture') ? 'none' : 'flex' }}
              size='large'
              disabled={isLoading}
              onClick={() => fileInputRef.current?.click()}
            >
              {
                isLoading
                  ? (
                    <CircularProgress color='inherit' size={25} />
                  )
                  : 'Subir Imagen'
              }
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
    const user = await dbUsers.getUserById(`${id}`);
    return {
      props: {
        user
      }
    }
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/clients',
        permanent: false,
      }
    }
  }
}

export default AdministrationClientPage;

//TODO: Optimizar esta página al igual que la correspondiente a la creación de los ejercicios