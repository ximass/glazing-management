import { GetServerSideProps } from 'next/types';
import prisma from 'lib/prisma';

// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ** Demo Components Imports
import GroupsTable from 'src/views/groups/List';

import { Group } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const groups = await prisma.group.findMany();

  return {
    props: {
      groups: JSON.parse(JSON.stringify(groups))
    }
  };
};

type Props = {
  groups: Group[];
};

const GroupList: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'right', padding: '10px' }}>
          <Button variant='contained' color='primary' href='/groups/create'>
            Novo grupo
          </Button>
        </Box>
        <Card>
          <CardHeader title='Grupos' titleTypographyProps={{ variant: 'h6' }} />
          <GroupsTable groups={props.groups} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default GroupList
