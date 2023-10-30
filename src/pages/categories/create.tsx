// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import CategorieForm from 'src/views/categories/Form'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { GetServerSideProps } from 'next/types';

import prisma from 'lib/prisma';
import { Serial } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async () => {
  const serials = await prisma.serial.findMany();

  return {
    props: { 
      user: null, 
      serials: JSON.parse(JSON.stringify(serials))
    }
  };
};

type Props = {
  user: undefined;
  serials: Serial[];
  categorieSerial: number | undefined;
}

const FormLayouts: React.FC<Props> = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <CategorieForm category={undefined} categorySerial={props.categorieSerial} serials={props.serials}/>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
