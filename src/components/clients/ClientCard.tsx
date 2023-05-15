
import { FC, useState } from 'react';
import NextLink from 'next/link';
import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from '@mui/material';

import { IUser } from '../../interface';

interface Props {
   user: IUser;
}

export const ClientCard: FC<Props> = ({ user }) => {

   const [isImageLoaded, setIsImageLoaded] = useState(false);

   return (
      <Grid item xs={6} sm={4} md={3}>
         <Card>
            <NextLink href={`/clients/${user.id}`} passHref prefetch={false} legacyBehavior>
               <Link>
                  <CardActionArea>
                     {
                        (!user.active) && (
                           <Chip
                              color='warning'
                              label='Usuario Inactivo'
                              sx={{
                                 position: 'absolute',
                                 zIndex: 99,
                                 bottom: '10px',
                                 left: '10px'
                              }}
                           />
                        )
                     }
                     <CardMedia
                        component='img'
                        className='fadeIn'
                        image={`/clients/${user.profilePicture}`}
                        alt={user.firstName}
                        height={300}
                     onLoad={() => setIsImageLoaded(true)}
                     />
                  </CardActionArea>
               </Link>
            </NextLink>
         </Card>
         <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
            <Typography fontWeight={700}>{`${user.firstName} ${user.lastName}`}</Typography>
            <Typography fontWeight={500}>Edad: {`${user.age}`}</Typography>
         </Box>
      </Grid >
   )
}

export default ClientCard;
