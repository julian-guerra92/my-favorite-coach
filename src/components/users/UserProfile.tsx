
import { FC } from 'react';
import { Avatar, Box, Button, Card, CardContent, CardMedia, Chip, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { EditOutlined, EmailOutlined, PhoneAndroidOutlined, ScaleOutlined, StraightenOutlined } from '@mui/icons-material';

import { IUser } from '../../interface/user';

interface Props {
   user: IUser;
}

export const UserProfile: FC<Props> = ({ user }) => {
   return (
      <Grid container spacing={3} marginBottom='30px'>

         <Grid item xs={12} sm={12} md={6}>
            {
               (!user.active) && (
                  <Chip
                     color='warning'
                     label='Usuario Inactivo'
                     sx={{
                        position: 'absolute',
                        zIndex: 99,
                        bottom: '200px',
                        left: '50px'
                     }}
                  />
               )
            }
            <Card className='summary-card'>
               <CardMedia
                  component='img'
                  className='fadeIn'
                  image={user.profilePicture}
                  alt={user.firstName}
                  height={400}
               />
               <CardContent>
                  <Typography variant='h1' component='h1'>{`${user.firstName} ${user.lastName}`}</Typography>
                  <Typography variant='h2' component='h1'>{`Edad: ${user.age}`}</Typography>
               </CardContent>
            </Card>
         </Grid>

         <Grid item xs={12} sm={12} md={6}>

            <Typography variant='h1' component='h1'>Información de Usuario:</Typography>

            <List sx={{ width: '100%' }}>
               <ListItem>
                  <ListItemAvatar>
                     <Avatar>
                        <EmailOutlined />
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Correo Electrónico' secondary={user.email} />
               </ListItem>
               <ListItem>
                  <ListItemAvatar>
                     <Avatar>
                        <PhoneAndroidOutlined />
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Número de Contacto' secondary={user.phoneNumber} />
               </ListItem>
               <ListItem>
                  <ListItemAvatar>
                     <Avatar>
                        <ScaleOutlined />
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Peso (Kg)' secondary={`${user.weight}`} />
               </ListItem>
               <ListItem>
                  <ListItemAvatar>
                     <Avatar>
                        <StraightenOutlined />
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Altura (m)' secondary={`${user.height}`} />
               </ListItem>
            </List>

            <Box display='flex' justifyContent='right'>
               <Button
                  className='circular-btn'
                  color='secondary'
                  startIcon={<EditOutlined />}
                  size='large'
               >
                  Editar Perfil
               </Button>
            </Box>

         </Grid>

      </Grid>
   )
}

export default UserProfile;