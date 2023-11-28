import { useState, SyntheticEvent } from 'react'
import Router from 'next/router';

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Icons Imports
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'

import { Purchase, User, Provider, Item } from '@prisma/client'

type Props = {
  purchase: Purchase | undefined;
  users: User[];
  userNum: number[];
  providers: Provider[];
  providerNum: number[];
  items: Item[];
  itemNum: number[];
  itemQuantity: number;
}

const PurchaseForm: React.FC<Props> = (props) => {
  const [id, setId] = useState(props.purchase ? props.purchase.id : null);
  const [value, setValue] = useState(props.purchase ? props.purchase.value : '');
  // const [itemQuantity, setQuantity] = useState(props.purchase ? props.purchase.itemQuantity : '');
  const [userNum, setUser] = useState(props.purchase ? props.userNum.map(user => user.toString()) : []);
  const [providerNum, setProvider] = useState(props.purchase ? props.providerNum.map(provider => provider.toString()) : []);

  const handleSelectChangeUser = (event: SelectChangeEvent<string[]>) => {
    setUser(event.target.value as string[])
  }
  const handleSelectChangeProvider = (event: SelectChangeEvent<string[]>) => {
    setProvider(event.target.value as string[])
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    
    try {
      const user = userNum.map(element => ({ id: parseInt(element) }));
      const provider = providerNum.map(element => ({ id: parseInt(element) }));
      const body = { id, provider, user, value /*, itemQuantity */};
      const method = props.purchase ? 'PUT' : 'POST';

      await fetch('/api/purchase', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await Router.push('/purchases');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card>
      <CardHeader title='Fornecedor' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Fornecedor</InputLabel>
                <Select
                  multiple
                  value={providerNum}
                  onChange={handleSelectChangeProvider}
                  required={true}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Compra de itens de fornecedores' id='provider' />}
                >
                  {
                    props.providers.map((provider) => (
                      <MenuItem key={provider.id} value={provider.id}>
                        {provider.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Comprador</InputLabel>
                <Select
                  multiple
                  value={userNum}
                  onChange={handleSelectChangeUser}
                  required={true}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Vendedor' id='users' />}
                >
                  {
                    props.users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required={true}
                fullWidth
                label='Valor'
                placeholder='valor da compra'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            {/* <Grid item xs={4}>
              <TextField
                value={itemQuantity}
                onChange={(e) => setQuantity(e.target.itemQuantity)}
                required={true}
                fullWidth
                label='Quantidade do Item'
                placeholder='Quantidade'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid> */}
            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large'>
                Salvar
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default PurchaseForm
