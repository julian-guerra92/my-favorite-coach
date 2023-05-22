
import { FC } from 'react';
import { Avatar, Card, CardContent, CardMedia, List, ListItem, ListItemAvatar, ListItemText, Typography, capitalize } from '@mui/material';
import { FitnessCenterOutlined, InfoOutlined, WhatshotOutlined } from '@mui/icons-material';

import { IExercise } from '../../interface/exercise';

interface Props {
   exercise: IExercise;
}

export const ExerciseDescription: FC<Props> = ({ exercise }) => {

   return (
      <Card className='summary-card'>
         <CardMedia
            component='img'
            image={exercise.referenceImage}
            height={400}
         />
         <CardContent>
            <Typography variant='h1'>
               {capitalize(exercise.title)}
            </Typography>
            <List sx={{ width: '100%' }}>
               <ListItem>
                  <ListItemAvatar>
                     <Avatar>
                        <WhatshotOutlined />
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Calorias por Sesión' secondary={`${exercise.calories}`} />
               </ListItem>
               <ListItem>
                  <ListItemAvatar>
                     <Avatar>
                        <FitnessCenterOutlined />
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Nivel de Intensidad' secondary={capitalize(exercise.intensity)} />
               </ListItem>
               <ListItem>
                  <ListItemAvatar>
                     <Avatar>
                        <InfoOutlined />
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Descripción' secondary={capitalize(exercise.description)} />
               </ListItem>
            </List>
         </CardContent>
      </Card>
   )
}

export default ExerciseDescription;