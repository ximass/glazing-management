// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import ItemTypeForm from 'src/views/itemTypes/Form'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { GetServerSideProps } from 'next/types';

import prisma from 'lib/prisma';
import { Category, ItemField, ItemFieldValue, ItemType } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await prisma.category.findMany();

  return {
    props: { 
      user: null, 
      categories: JSON.parse(JSON.stringify(categories))
    }
  };
};

type Props = {
  itemType: undefined;
  itemFields: ItemField[];
  itemFieldsValues: ItemFieldValue[];
  categories: Category[];
  itemTypeCategory: number | undefined;
}

const FormLayouts: React.FC<Props> = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <ItemTypeForm itemType={props.itemType} itemFields={props.itemFields} itemFieldsValues={props.itemFieldsValues} categories={props.categories} itemTypeCategory={props.itemTypeCategory}/>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
