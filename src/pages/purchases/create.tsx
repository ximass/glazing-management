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
import { Provider, User, Item } from '@prisma/client';
import { isNumberObject } from 'util/types';

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany();
  const providers = await prisma.provider.findMany();
  const items = await prisma.item.findMany();

  //@ts-ignore
  const providerNum: number = [];

  //@ts-ignore
  const userNum: number = [];

  //@ts-ignore
  const itemNum: number = [];

  const itemQuantity: number = [];

  return {
    props: { 
      request: null,
      users: JSON.parse(JSON.stringify(users)), 
      userNum: userNum,
      itemQuantity: itemQuantity,
      items: JSON.parse(JSON.stringify(items)),
      itemNum: itemNum,
      providerNum: providerNum,
      providers: JSON.parse(JSON.stringify(providers))
    }
  };
};

type Props = {
  request: undefined;
  users: User[];
  userNum: number[];
  providers: Provider[];
  providerNum: number[];
  items: Item[];
  itemNum: number[];
  itemQuantity: number;
}

const FormLayouts: React.FC<Props> = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <RequestForm request={props.request} providers={props.providers} providerNum={props.providerNum} users={props.users} userNum={props.userNum} items={props.items} itemNum={props.itemNum} itemQuantity={props.itemQuantity}/>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
