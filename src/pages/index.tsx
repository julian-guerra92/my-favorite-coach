
import { useContext, useEffect, useState } from 'react';

import { Box, Button, Chip, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { AuthLayout } from '../components/layouts';
import { validations } from '../utils';
import { AuthContext } from '../context/auth';

type FormData = {
  email: string,
  password: string,
};

export default function HomePage() {

  const { loginUser } = useContext(AuthContext)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const [showError, setShowError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const hasError = router.query.error;

  useEffect(() => {
    if (hasError) {
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
    }
  }, [router, hasError])

  const onLoginUser = async ({ email, password }: FormData) => {
    const isValidLogin = await loginUser(email, password);
    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    setIsLoading(true);
    const pageDestination = router.query.p?.toString() || '/dashboard';
    router.replace(pageDestination);
  }

  return (
    <AuthLayout title='MyFavoriteCoach'>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 400, padding: '10px 20px' }}>
          <Grid container spacing={2}>

            <Grid item xs={12} display='flex' flexDirection='column'>
              <Typography
                variant='h1'
                component='h1'
                textAlign='center'
              >
                Iniciar Sesión
              </Typography>
              <Chip
                label='Contraseña o Correo Electrónico Incorrecto'
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type='email'
                label='Correo Electrónico'
                variant='filled'
                fullWidth
                {...register('email', {
                  required: 'Correo Electrónico es Requerido',
                  validate: validations.isEmail
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type='password'
                label='Contraseña'
                variant='filled'
                fullWidth
                {...register('password', {
                  required: 'La Contraseña es Requerida'
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type='submit'
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth
                sx={{ fontSize: 17 }}
                disabled={isLoading || showError ? true : false}
              >
                {
                  isLoading
                    ? (
                      <CircularProgress color='inherit' />
                    )
                    : 'Ingresar'
                }
              </Button>
            </Grid>

          </Grid>
        </Box>
      </form>
    </AuthLayout >
  )
}
