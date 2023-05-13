
import { CreditCardOffOutlined } from '@mui/icons-material';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
   title: string | number;
   subTitle: string;
   icon: JSX.Element;
}

export const SummaryTile: FC<Props> = ({ title, subTitle, icon }) => {
   return (
      <Grid item xs={12} sm={4} md={3}>
         <Card sx={{ display: 'flex' }} className='summary-card'>
            <CardContent
               sx={{ width: 60, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
               {icon}
            </CardContent>
            <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <Typography variant='h3'>{title}</Typography>
               <Typography variant='caption'>{subTitle}</Typography>
            </CardContent>
         </Card>
      </Grid>
   )
}
