import { useState } from 'react'

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
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'

type Props = {
  user: User;
  permissions: Permission[];
}

const FormUsers: React.FC<Props> = (props) => {

  const [permissionsSelect, setGroups] = useState<string[]>([]);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setGroups(event.target.value as string[])
  }

  return (
    <Card>
      <CardHeader title='Usuários' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
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
                  value={props.user.password}
                  id='form-layouts-basic-password'
                  type='password'
                  aria-describedby='form-layouts-basic-password-helper'
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Permissões</InputLabel>
                <Select
                  multiple
                  value={props.user.permissions.map((permission) => permission.id)}
                  onChange={handleSelectChange}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Permissões' id='permissions' />}
                >
                  {
                    props.permissions.map((permission) => (
                      <MenuItem key={permission.id} value={permission.id}>
                        {permission.name}
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
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormUsers
