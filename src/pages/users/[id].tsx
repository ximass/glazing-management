// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormGroups from 'src/views/groups/Form'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { GetServerSideProps } from 'next/types';

import React from 'react';
import Router from 'next/router';

//import { useSession } from 'next-auth/react';
import prisma from 'lib/prisma';


export const getServerSideProps: GetServerSideProps = async () => {
  const permissions = [
    "Humaira Sims",
    "Santiago Solis",
    "Dawid Floyd",
    "Mateo Barlow",
    "Samia Navarro",
    "Kaden Fields",
    "Genevieve Watkins",
    "Mariah Hickman",
    "Rocco Richardson",
    "Harris Glenn"
  ];

  const permissionsGroup = [
    "Humaira Sims",
    "Santiago Solis",
    "Dawid Floyd"
  ];

  return {
    props: { permissions, permissionsGroup },
  };
};

type Props = {
  permissions: string[];
  permissionsGroup: string[];
}

const FormLayouts: React.FC<Props> = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <FormGroups permissions={props.permissions} permissionsGroup={props.permissionsGroup}/>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
