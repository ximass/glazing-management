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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const itemType = await prisma.itemType.findUnique({
    where: {
      id: Number(params?.id),
    }
  });
  const itemFields = await prisma.itemField.findMany({
    where: {
      ref_item_type: itemType?.id,
    },
    include: {
      ItemFieldValue: true,
    }
  });

  const itemFieldsValues : ItemFieldValue[] = [];

  itemFields.forEach((itemField) => {
    if (itemField.ItemFieldValue) {
      itemFieldsValues.push(itemField.ItemFieldValue);
    }
  });

  const categories = await prisma.category.findMany();
  const itemTypeCategory = itemType ? itemType.ref_category : undefined;

  return {
    props: { 
      itemType: JSON.parse(JSON.stringify(itemType)),
      itemFields: JSON.parse(JSON.stringify(itemFields)),
      itemFieldsValues: JSON.parse(JSON.stringify(itemFieldsValues)), 
      categories: JSON.parse(JSON.stringify(categories)),
      itemTypeCategory: itemTypeCategory
    }
  };
};

type Props = {
  itemType: ItemType;
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
