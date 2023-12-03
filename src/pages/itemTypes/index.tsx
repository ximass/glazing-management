import { GetServerSideProps } from 'next/types';
import prisma from 'lib/prisma';

// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ** Demo Components Imports
import ItemTypeTable from 'src/views/itemTypes/List';

import { ItemType } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const itemTypes = await prisma.itemType.findMany();

  return {
    props: {
      itemTypes: JSON.parse(JSON.stringify(itemTypes))
    }
  };
};

type Props = {
  itemTypes: ItemType[];
};

const GroupList: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'right', padding: '10px' }}>
          <Button variant='contained' color='primary' href='/itemTypes/create'>
            Novo tipo de item
          </Button>
        </Box>
        <Card>
          <CardHeader title='Tipos de itens' titleTypographyProps={{ variant: 'h6' }} />
          <ItemTypeTable itemTypes={props.itemTypes} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default GroupList
