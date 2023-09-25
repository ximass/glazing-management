// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormPermission from 'src/views/permissions/Form'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { GetServerSideProps } from 'next/types';

import prisma from 'lib/prisma';
import { Permission } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const permission = await prisma.permission.findUnique({
    where: {
      id: Number(params?.id),
    },
    include: {
      groups: true
    }
  });

  return {
    props: {
      permission: JSON.parse(JSON.stringify(permission)),
    }
  };
};

type Props = {
  permission: Permission;
}

const FormLayouts: React.FC<Props> = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <FormPermission permission={props.permission} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
