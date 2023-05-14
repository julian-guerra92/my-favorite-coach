
import { FC } from 'react';
import { Grid } from '@mui/material';

import { ClientCard } from './';
import { IUser } from '../../interface';

interface Props {
   users: IUser[];
}

export const ClientsList: FC<Props> = ({ users }) => {
   return (
      <Grid container spacing={4}>
         {
            users.map(user => (
               <ClientCard user={user} key={user._id} />
            ))
         }
      </Grid>
   )
}

export default ClientsList;