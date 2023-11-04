import { GetServerSideProps } from 'next/types';
import prisma from 'lib/prisma';

// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ** Demo Components Imports
import ProvidersTable from 'src/views/providers/List';

import { Provider } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const providers = await prisma.provider.findMany();

  return {
    props: {
      providers: JSON.parse(JSON.stringify(providers))
    }
  };
};

type Props = {
  providers: Provider[];
};

const ProvidersList: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'right', padding: '10px' }}>
          <Button variant='contained' color='primary' href='/providers/create'>
            Novo fornecedor
          </Button>
        </Box>
        <Card>
          <CardHeader title='Fornecedores' titleTypographyProps={{ variant: 'h6' }} />
          <ProvidersTable providers={props.providers} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProvidersList
