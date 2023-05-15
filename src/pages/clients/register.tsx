
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardMedia, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography, capitalize } from '@mui/material';

import { DashboardLayaout } from '../../components/layouts';
import { validations } from '../../utils';

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

const RegisterClientPage = () => {

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

      <Typography variant='h1' component='h1' marginTop='30px'>Registro Nuevo Cliente:</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
          <Button
            color="secondary"
            className='circular-btn'
            startIcon={<SaveOutlined fontSize='large' />}
            sx={{ width: '150px' }}
            type="submit"
            size='large'
            disabled={isSaving}
          >
            Guardar
          </Button>
        </Box>

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

            {/* //TODO: Esto debe ser fecha de nacimiento */}
            <TextField
              label="Edad"
              type='number'
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
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
              fullWidth
              sx={{ mb: 1 }}
              {...register('weight', {
                required: 'Este Campo es Requerido!',
                min: { value: 1, message: 'El peso debe ser mayor o igual a 1' }
              })}
              error={!!errors.weight}
              helperText={errors.weight?.message}
            />

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

            <TextField
              label="Altura"
              type='number'
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('height', {
                required: 'Este Campo es Requerido!',
                min: { value: 1, message: 'La altura debe ser mayor o igual a 1' }
              })}
              error={!!errors.height}
              helperText={errors.height?.message}
            />

            <Divider sx={{ my: 2 }} />

            <FormLabel sx={{ marginBottom: 1 }}>Foto de Perfil</FormLabel>

            <Button
              color="secondary"
              fullWidth
              startIcon={<UploadOutlined fontSize='large' />}
              className='circular-btn'
              sx={{ mb: 3 }}
              size='large'
              onClick={() => fileInputRef.current?.click()}
            >
              Subir Imagen
            </Button>
            <input
              ref={fileInputRef} // se utiliza el useRef para hacer referencia al botón que queremes realmente que haga la acción
              type='file'
              multiple
              accept='image/png, image/gif, image/jpeg'
              style={{ display: 'none' }}
              onChange={onFileSelected}
            />

            <Card>
              <CardMedia
                component='img'
                className='fadeIn'
                image={'/clients/1.jpg'}
                height={300}
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
      </form>

    </DashboardLayaout>
  )
}
export default RegisterClientPage;