// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'

type Props = {
  permissions: string[];
  permissionsGroup: string[];
}

const FormGroups: React.FC<Props> = (props) => {

  const [permissionsSelect, setPermission] = useState<string[]>([]);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setPermission(event.target.value as string[])
  }

  return (
    <Card>
      <CardHeader title='Grupo' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <TextField fullWidth label='Nome do grupo' placeholder='Ex.: Administrador' />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Permissões</InputLabel>
                <Select
                  multiple
                  value={props.permissionsGroup}
                  onChange={handleSelectChange}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Permissões' id='permissions' />}
                >
                  {
                    props.permissions.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
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

export default FormGroups
