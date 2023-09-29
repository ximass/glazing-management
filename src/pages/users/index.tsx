import { GetServerSideProps } from 'next/types';
import prisma from 'lib/prisma';

// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ** Demo Components Imports
import UsersTable from 'src/views/users/List';

import { User } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const users = await prisma.user.findMany();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users))
    }
  };
};

type Props = {
  users: User[];
};

const UsersList: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'right', padding: '10px' }}>
          <Button variant='contained' color='primary' href='/users/create'>
            Novo usuário
          </Button>
        </Box>
        <Card>
          <CardHeader title='Usuários' titleTypographyProps={{ variant: 'h6' }} />
          <UsersTable users={props.users} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UsersList
