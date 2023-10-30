import { GetServerSideProps } from 'next/types';
import prisma from 'lib/prisma';

// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ** Demo Components Imports
import CategoriesTable from 'src/views/categories/List';

import { Categorie } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const categories = await prisma.category.findMany();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories))
    }
  };
};

type Props = {
  categories: Category[];
};

const CategorieList: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'right', padding: '10px' }}>
          <Button variant='contained' color='primary' href='/categories/create'>
            Novo categoria
          </Button>
        </Box>
        <Card>
          <CardHeader title='Categorias' titleTypographyProps={{ variant: 'h6' }} />
          <CategoriesTable categories={props.categories} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default CategorieList
