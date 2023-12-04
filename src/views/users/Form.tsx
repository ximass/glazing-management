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

import { Group, User } from '@prisma/client'

type Props = {
  user: User | undefined;
  groups: Group[];
  userGroups: number[];
}

const UserForm: React.FC<Props> = (props) => {
  const [id, setId] = useState(props.user ? props.user.id : null);
  const [name, setName] = useState(props.user ? props.user.name : '');
  const [email, setEmail] = useState(props.user ? props.user.email : '');
  const [login, setLogin] = useState(props.user ? props.user.login : '');
  const [password, setPassword] = useState(props.user ? props.user.password : '');
  const [userGroups, setGroups] = useState(props.user ? props.userGroups.map(group => group.toString()) : []);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setGroups(event.target.value as string[])
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const groups = userGroups.map(element => ({ id: parseInt(element) }));

      const body = { id, email, name, login, password, groups };
      const method = props.user ? 'PUT' : 'POST';

      await fetch('/api/user', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await Router.push('/users');
    } catch (error) {
      console.error(error);
    }
  }

  const onDelete = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const groups = userGroups.map(element => ({ id: parseInt(element) }));

      const body = { id };

      await fetch('/api/user/'+id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await Router.push('/users');
    } catch (error) {
      console.error(error);
    }
  }

  const onReturn = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await Router.push('/users');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card>
      <CardHeader title='Usuário' titleTypographyProps={{ variant: 'h6' }} />
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
                placeholder='Fulano'
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
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required={true}
                fullWidth
                label='Login'
                placeholder='fulano'
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
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-basic-password'>Senha</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                  id='form-layouts-basic-password'
                  type='password'
                  aria-describedby='form-layouts-basic-password-helper'
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Grupos</InputLabel>
                <Select
                  multiple
                  value={userGroups}
                  onChange={handleSelectChange}
                  required={true}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Permissões' id='groups' />}
                >
                  {
                    props.groups.map((group) => (
                      <MenuItem key={group.id} value={group.id}>
                        {group.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
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

export default UserForm
