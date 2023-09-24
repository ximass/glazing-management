// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import UserForm from 'src/views/users/Form'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { GetServerSideProps } from 'next/types';

import prisma from 'lib/prisma';
import { Group } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async () => {
  const groups = await prisma.group.findMany();

  //@ts-ignore
  const userGroups: number = [];

  return {
    props: { 
      user: null, 
      groups: groups, 
      userGroups: userGroups 
    }
  };
};

type Props = {
  user: undefined;
  groups: Group[];
  userGroups: number[];
}

const FormLayouts: React.FC<Props> = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <UserForm user={props.user} groups={props.groups} userGroups={props.userGroups}/>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
