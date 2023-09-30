// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import SerialForm from 'src/views/serials/Form'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { GetServerSideProps } from 'next/types';

import prisma from 'lib/prisma';
import { Serial } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const serial = await prisma.serial.findUnique({
    where: {
      id: Number(params?.id),
    }
  });

  return {
    props: {
      serial: JSON.parse(JSON.stringify(serial))
    }
  };
};

type Props = {
  serial: Serial;
}

const FormLayouts: React.FC<Props> = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <SerialForm serial={props.serial} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
