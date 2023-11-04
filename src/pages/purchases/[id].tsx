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
import { Purchase, User, Provider, Item } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const users = await prisma.user.findMany();
  const providers = await prisma.provider.findMany();
  const items = await prisma.item.findMany();

  const purchase = await prisma.purchase.findUnique({
    where: {
      id: Number(params?.id),
    },
    include: {
      users: true,
      items: true,
      providers: true
    }
  });

  const providerNum = purchase ? purchase.providers.map(provider => provider.id) : [];
  const userNum = purchase ? purchase.users.map(user => user.id) : [];
  const itemNum = purchase ? purchase.items.map(item => item.id) : [];

  return {
    props: {
      purchase: JSON.parse(JSON.stringify(purchase)),
      user: JSON.parse(JSON.stringify(users)),
      provider: JSON.parse(JSON.stringify(providers)),
      item: JSON.parse(JSON.stringify(items)),
      itemNum: itemNum,
      providerNum: providerNum,
      userNum: userNum
      }
  };
};

type Props = {
  purchase: Purchase;
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
          <PurchaseForm purchase={props.purchase} purchase={props.itemQuantity} providers={props.providers} providerNum={props.providerNum} users={props.users} userNum={props.userNum} items={props.items} itemNum={props.itemNum} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
