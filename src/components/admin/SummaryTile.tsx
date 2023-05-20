
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
   title: string | number;
   subTitle: string;
   icon: JSX.Element;
}

export const SummaryTile: FC<Props> = ({ title, subTitle, icon }) => {
   return (
      <Grid item xs={12} sm={12} md={6}>
         <Card sx={{ display: 'flex', height: 150 }} className='summary-card'>
            <CardContent
               sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
               {icon}
            </CardContent>
            <CardContent sx={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <Typography variant='h3'>{title}</Typography>
               <Typography variant='subtitle1'  textAlign='center'>{subTitle}</Typography>
            </CardContent>
         </Card>
      </Grid>
   )
}
