import { GetServerSideProps } from 'next/types';
import prisma from 'lib/prisma';

// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ** Demo Components Imports
import PurchasesTable from 'src/views/purchases/List';

import { Purchase } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const purchases = await prisma.purchase.findMany();

  return {
    props: {
      purchases: JSON.parse(JSON.stringify(purchases))
    }
  };
};

type Props = {
  purchases: Purchase[];
};

const PurchasesList: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'right', padding: '10px' }}>
          <Button variant='contained' color='primary' href='/purchases/create'>
            Nova compra
          </Button>
        </Box>
        <Card>
          <CardHeader title='Compras' titleTypographyProps={{ variant: 'h6' }} />
          <PurchasesTable purchases={props.purchases} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default PurchasesList
