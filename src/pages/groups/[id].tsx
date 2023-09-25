// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormGroups from 'src/views/groups/Form'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { GetServerSideProps } from 'next/types';

import prisma from 'lib/prisma';
import { Group, Permission, User } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const permissions = await prisma.permission.findMany();

  const group   = await prisma.group.findUnique({
    where: {
      id: Number(params?.id),
    },
    include: {
      permissions: true
    }
  });

  const groupPermissions = group ? group.permissions.map(permission => permission.id) : [];

  return {
    props: {
      group: JSON.parse(JSON.stringify(group)), 
      permissions: JSON.parse(JSON.stringify(permissions)), 
      groupPermissions: groupPermissions
      }
  };
};

type Props = {
  group: Group;
  permissions: Permission[];
  groupPermissions: number[];
}

const FormLayouts: React.FC<Props> = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <FormGroups group={props.group} permissions={props.permissions} groupPermissions={props.groupPermissions}/>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
