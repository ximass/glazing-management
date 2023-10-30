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
import { Request, User, Customer } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const users = await prisma.user.findMany();
  const customers = await prisma.customer.findMany();

  const request = await prisma.request.findUnique({
    where: {
      id: Number(params?.id),
    },
    include: {
      users: true,
      customers: true
    }
  });

  const customerNum = request ? request.customers.map(customer => customer.id) : [];
  const userNum = request ? request.users.map(user => user.id) : [];

  return {
    props: {
      request: JSON.parse(JSON.stringify(request)),
      user: JSON.parse(JSON.stringify(users)),
      customer: JSON.parse(JSON.stringify(customers)),
      customerNum: customerNum,
      userNum: userNum
      }
  };
};

type Props = {
  request: Request;
  users: User[];
  userNum: number[];
  customers: Customer[];
  customerNum: number[];
}

const FormLayouts: React.FC<Props> = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <RequestForm request={props.request} customers={props.customers} customerNum={props.customerNum} users={props.users} userNum={props.userNum} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
