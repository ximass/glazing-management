import { GetServerSideProps } from 'next/types';
import prisma from 'lib/prisma';

// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ** Demo Components Imports
import CustomersTable from 'src/views/customers/List';

import { Customer } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const customers = await prisma.customer.findMany();

  return {
    props: {
      customers: JSON.parse(JSON.stringify(customers))
    }
  };
};

type Props = {
  customers: Customer[];
};

const CustomersList: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'right', padding: '10px' }}>
          <Button variant='contained' color='primary' href='/customers/create'>
            Novo cliente
          </Button>
        </Box>
        <Card>
          <CardHeader title='Clientes' titleTypographyProps={{ variant: 'h6' }} />
          <CustomersTable customers={props.customers} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default CustomersList
