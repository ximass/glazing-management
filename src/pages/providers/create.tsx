// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import ProviderForm from 'src/views/providers/Form'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { GetServerSideProps } from 'next/types';

import prisma from 'lib/prisma';
import { Provider } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async () => {
  const provider = await prisma.provider.findMany();


  return {
    props: { 
      provider: null 
    }
  };
};

type Props = {
  provider: undefined;
}

const FormLayouts: React.FC<Props> = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <ProviderForm provider={props.provider}/>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
