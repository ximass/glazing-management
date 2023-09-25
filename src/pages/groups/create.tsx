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
import { Permission } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async () => {
  const permissions = await prisma.permission.findMany();
  const groupPermissions: number[] = [];

  return {
    props: {
      group: null,
      permissions: JSON.parse(JSON.stringify(permissions)), 
      groupPermissions: groupPermissions
    }
  };
};

type Props = {
  group: undefined;
  permissions: Permission[];
  groupPermissions: number[];
}

const FormLayouts: React.FC<Props> = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <FormGroups group={props.group} permissions={props.permissions} groupPermissions={props.groupPermissions} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
