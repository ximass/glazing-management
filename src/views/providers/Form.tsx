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

import { Provider } from '@prisma/client'

type Props = {
  provider: Provider | undefined;
}

const ProviderForm: React.FC<Props> = (props) => {
  const [id, setId] = useState(props.provider ? props.provider.id : null);
  const [name, setName] = useState(props.provider ? props.provider.name : '');
  const [legal_name, setLegalName] = useState(props.provider ? props.provider.legal_name : '');
  const [email, setEmail] = useState(props.provider ? props.provider.email : '');
  const [identity, setIdentity] = useState(props.provider ? props.provider.identity : '');
  const [info, setInfo] = useState(props.provider ? props.provider.info : '');
  const [cep, setCep] = useState(props.provider ? props.provider.cep : '');
  const [uf, setUf] = useState(props.provider ? props.provider.uf : '');
  const [address, setAddress] = useState(props.provider ? props.provider.address : '');
  const [city, setCity] = useState(props.provider ? props.provider.city : '');
  const [phone, setPhone] = useState(props.provider ? props.provider.phone : '');
  const [country, setCountry] = useState(props.provider ? props.provider.country : '');
  const [company_owner, setCompanyOwner] = useState(props.provider ? props.provider.company_owner : '');
  const [company_owner_cpf, setCompanyOwnerCpf] = useState(props.provider ? props.provider.company_owner_cpf : '');

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { id, name, legal_name, email, identity, info, cep, uf, address, city, phone, country, company_owner, company_owner_cpf };
      const method = props.provider ? 'PUT' : 'POST';

      await fetch('/api/provider', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await Router.push('/providers');
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
                placeholder='Nome Fornecedor'
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
                value={legal_name}
                onChange={(e) => setLegalName(e.target.value)}
                required={true}
                fullWidth
                label='Nome Legal'
                placeholder='Nome Legal do Fornecedor'
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
                label='CNPJ'
                placeholder='CNPJ'
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
            <Grid item xs={6}>
              <TextField
                value={company_owner}
                onChange={(e) => setCompanyOwner(e.target.value)}
                required={true}
                fullWidth
                label='Nome responsável'
                placeholder='Nome responsável'
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
                value={company_owner_cpf}
                onChange={(e) => setCompanyOwnerCpf(e.target.value)}
                required={true}
                fullWidth
                label='CPF responsável'
                placeholder='CPF do responsável'
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

export default ProviderForm
