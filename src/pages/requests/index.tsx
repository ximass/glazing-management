import { GetServerSideProps } from 'next/types';
import prisma from 'lib/prisma';

// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ** Demo Components Imports
import RequestsTable from 'src/views/requests/List';

import { Request } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const requests = await prisma.request.findMany();

  return {
    props: {
      requests: JSON.parse(JSON.stringify(requests))
    }
  };
};

type Props = {
  requests: Request[];
};

const RequestsList: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'right', padding: '10px' }}>
          <Button variant='contained' color='primary' href='/requests/create'>
            Novo pedido
          </Button>
        </Box>
        <Card>
          <CardHeader title='Pedidos' titleTypographyProps={{ variant: 'h6' }} />
          <RequestsTable requests={props.requests} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default RequestsList
