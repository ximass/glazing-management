// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import CustomerForm from 'src/views/customers/Form'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { GetServerSideProps } from 'next/types';

import prisma from 'lib/prisma';
import { Customer } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async () => {
  const customer = await prisma.customer.findMany();


  return {
    props: { 
      customer: null 
    }
  };
};

type Props = {
  customer: undefined;
}

const FormLayouts: React.FC<Props> = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <CustomerForm customer={props.customer}/>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
