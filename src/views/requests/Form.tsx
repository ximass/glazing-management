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

import { Request, User, Customer } from '@prisma/client'

type Props = {
  request: Request | undefined;
  users: User[];
  userNum: number[];
  customers: Customer[];
  customerNum: number[];
}

const RequestForm: React.FC<Props> = (props) => {
  const [id, setId] = useState(props.request ? props.request.id : null);
  const [value, setValue] = useState(props.request ? props.request.value : '');
  const [userNum, setUser] = useState(props.request ? props.userNum.map(user => user.toString()) : []);
  const [customerNum, setCustomer] = useState(props.request ? props.customerNum.map(customer => customer.toString()) : []);

  const handleSelectChangeUser = (event: SelectChangeEvent<string[]>) => {
    setUser(event.target.value as string[])
  }
  const handleSelectChangeCustomer = (event: SelectChangeEvent<string[]>) => {
    setCustomer(event.target.value as string[])
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    
    try {
      const user = userNum.map(element => ({ id: parseInt(element) }));
      const customer = customerNum.map(element => ({ id: parseInt(element) }));
      const body = { id, customer, user, value };
      const method = props.request ? 'PUT' : 'POST';

      await fetch('/api/request', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await Router.push('/requests');
    } catch (error) {
      console.error(error);
    }
  }

  const onDelete = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { id };

      await fetch('/api/request/'+id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await Router.push('/requests');
    } catch (error) {
      console.error(error);
    }
  }

  const onReturn = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await Router.push('/requests');
    } catch (error) {
      console.error(error);
    }
  }

  

  return (
    <Card>
      <CardHeader title='Cliente' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Cliente</InputLabel>
                <Select
                  multiple
                  value={customerNum}
                  onChange={handleSelectChangeCustomer}
                  required={true}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Cliente' id='customer' />}
                >
                  {
                    props.customers.map((customer) => (
                      <MenuItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Vendedor</InputLabel>
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
                placeholder='valor do pedido'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large'>
                Salvar
              </Button>
              {
                id && (
                <Button sx={{marginLeft: 5}} color='error'  type='button' onClick={onDelete} variant='contained' size='large'>
                Excluir
                </Button> 
                )            
              }
              <Button sx={{marginLeft: 5}} color='secondary'  type='button' onClick={onReturn} variant='contained' size='large'>
                Voltar
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default RequestForm
