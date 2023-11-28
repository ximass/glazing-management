// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import PurchaseForm from 'src/views/purchases/Form'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { GetServerSideProps } from 'next/types';

import prisma from 'lib/prisma';
import { Provider, User } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany();
  const providers = await prisma.provider.findMany();
  // const items = await prisma.item.findMany();

  //@ts-ignore
  const providerNum: number = [];

  //@ts-ignore
  const userNum: number = [];

  //@ts-ignore
  // const itemNum: number = [];

  //@ts-ignore
  const quantity: number = [];

  return {
    props: { 
      purchase: null,
      users: JSON.parse(JSON.stringify(users)), 
      userNum: userNum,
      // quantity: quantity,
      // items: JSON.parse(JSON.stringify(items)),
      // itemNum: itemNum,
      providerNum: providerNum,
      providers: JSON.parse(JSON.stringify(providers))
    }
  };
};

type Props = {
  purchase: undefined;
  users: User[];
  userNum: number[];
  providers: Provider[];
  providerNum: number[];
  // items: Item[];
  // itemNum: number[];
  // quantity: number;
}

const FormLayouts: React.FC<Props> = (props) => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <PurchaseForm purchase={props.purchase} providers={props.providers} providerNum={props.providerNum} users={props.users} userNum={props.userNum} /*items={props.items} itemNum={props.itemNum}  quantity={props.quantity}*/ />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
