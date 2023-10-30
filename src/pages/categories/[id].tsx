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
import { Category, Serial } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const categorie = await prisma.category.findUnique({
    where: {
      id: Number(params?.id),
    }
  });

  const serials = await prisma.serial.findMany();

  return {
    props: {
      categorie: JSON.parse(JSON.stringify(categorie)),
      serials: JSON.parse(JSON.stringify(serials))
    }
  };
};

type Props = {
  categorie: Category;
  serials: Serial[];
}

const FormLayouts: React.FC<Props> = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <CategorieForm category={props.categorie} categorySerial={props.categorie.ref_serial} serials={props.serials}/>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
