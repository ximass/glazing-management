import { GetServerSideProps } from 'next/types';
import prisma from 'lib/prisma';

// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ** Demo Components Imports
import TableStickyHeader from 'src/views/permissions/List';
import { Permission } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const permissions = await prisma.permission.findMany();

  return {
    props: {
      permissions: JSON.parse(JSON.stringify(permissions))
    }
  };
};

type Props = {
  permissions: Permission[];
};

const GroupList: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'right', padding: '10px' }}>
          <Button variant='contained' color='primary' href='/permissions/create'>
            Nova permissão
          </Button>
        </Box>
        <Card>
          <CardHeader title='Permissões' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader permissions={props.permissions} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default GroupList
