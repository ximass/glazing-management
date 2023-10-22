import { GetServerSideProps } from 'next/types';
import prisma from 'lib/prisma';

// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ** Demo Components Imports
import SerialsTable from 'src/views/serials/List';

import { Serial } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const serials = await prisma.serial.findMany();

  return {
    props: {
      serials: JSON.parse(JSON.stringify(serials))
    }
  };
};

type Props = {
  serials: Serial[];
};

const SerialList: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'right', padding: '10px' }}>
          <Button variant='contained' color='primary' href='/serials/create'>
            Novo serial
          </Button>
        </Box>
        <Card>
          <CardHeader title='Seriais' titleTypographyProps={{ variant: 'h6' }} />
          <SerialsTable serials={props.serials} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default SerialList
