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

import { Customer } from '@prisma/client'

type Props = {
  customer: Customer | undefined;
}

const CustomerForm: React.FC<Props> = (props) => {
  const [id, setId] = useState(props.customer ? props.customer.id : null);
  const [name, setName] = useState(props.customer ? props.customer.name : '');
  const [email, setEmail] = useState(props.customer ? props.customer.email : '');
  const [identity, setIdentity] = useState(props.customer ? props.customer.identity : '');
  const [info, setInfo] = useState(props.customer ? props.customer.info : '');
  const [cep, setCep] = useState(props.customer ? props.customer.cep : '');
  const [uf, setUf] = useState(props.customer ? props.customer.uf : '');
  const [address, setAddress] = useState(props.customer ? props.customer.address : '');
  const [city, setCity] = useState(props.customer ? props.customer.city : '');
  const [phone, setPhone] = useState(props.customer ? props.customer.phone : '');
  const [country, setCountry] = useState(props.customer ? props.customer.country : '');

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { id, name, email, identity, info, cep, uf, address, city, phone, country };
      const method = props.customer ? 'PUT' : 'POST';

      await fetch('/api/customer', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await Router.push('/customers');
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
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
                fullWidth
                label='Nome'
                placeholder='Nome cliente'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                fullWidth
                type='email'
                label='Email'
                placeholder='fulano@gmail.com'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                required={true}
                fullWidth
                label='Identidade'
                placeholder='CPF ou CNPJ'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={true}
                fullWidth
                label='Telefone'
                placeholder='(xx) xxxxx-xxxx'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                required={true}
                fullWidth
                label='CEP'
                placeholder='xxxxx-xxx'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                required={true}
                fullWidth
                label='UF'
                placeholder='UF'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required={true}
                fullWidth
                label='País'
                placeholder='Brasil'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required={true}
                fullWidth
                label='Cidade'
                placeholder='Porto Alegre'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required={true}
                fullWidth
                label='Endereço'
                placeholder='Rua Bento Gonçalves, nº 69'
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
              <TextField
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                required={true}
                fullWidth
                label='Informações Adicionais'
                placeholder='infos'
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
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default CustomerForm
