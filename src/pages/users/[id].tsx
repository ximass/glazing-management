// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormUsers from 'src/views/users/Form'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { GetServerSideProps } from 'next/types';

import React from 'react';
import Router from 'next/router';

//import { useSession } from 'next-auth/react';
import prisma from 'lib/prisma';
import { Group, User } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const groups = await prisma.group.findMany();
  const user   = await prisma.user.findUnique({
    where: {
      id: Number(params?.id),
    }
  });

  return {
    props: { groups, user },
  };
};

type Props = {
  groups: Group[];
  user: User;
}

const FormLayouts: React.FC<Props> = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <FormUsers user={props.user} groups={props.groups} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
