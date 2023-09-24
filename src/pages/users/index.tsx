import { GetServerSideProps } from 'next/types';
import prisma from 'lib/prisma';

// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

// ** Demo Components Imports
import UsersTable from 'src/views/users/List';

import { User } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const users = await prisma.user.findMany();

  return {
    props: { 
      users : JSON.parse(JSON.stringify(users))
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
        <Card>
          <CardHeader title='Usuários' titleTypographyProps={{ variant: 'h6' }} />
          <UsersTable users={props.users}/>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UsersList
