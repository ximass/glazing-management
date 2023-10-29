// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import RequestForm from 'src/views/requests/Form'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { GetServerSideProps } from 'next/types';

import prisma from 'lib/prisma';
import { Customer, User } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany();
  const customers = await prisma.customer.findMany();

  //@ts-ignore
  const customerNum: number = [];
  const userNum: number = [];

  return {
    props: { 
      request: null,
      users: JSON.parse(JSON.stringify(users)), 
      userNum: userNum,
      customerNum: customerNum,
      customers: JSON.parse(JSON.stringify(customers))
    }
  };
};

type Props = {
  request: undefined;
  user: User[];
  userNum: number[];
  customer: Customer[];
  customerNum: number[];
}

const FormLayouts: React.FC<Props> = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <RequestForm request={props.request} customers={props.customer} customerNum={props.customerNum} users={props.user} userNum={props.userNum} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
