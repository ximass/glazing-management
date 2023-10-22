// ** React Imports
import { useState, SyntheticEvent } from 'react';
import Router from 'next/router';

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
import { Group, Permission } from '@prisma/client'

type Props = {
  group: Group | undefined;
  permissions: Permission[];
  groupPermissions: number[];
}

const FormGroups: React.FC<Props> = (props) => {
  const [id, setId] = useState(props.group ? props.group.id : null);
  const [name, setName] = useState(props.group ? props.group.name : '');
  const [groupPermissions, setPermission] = useState(props.group ? props.groupPermissions.map(group => group.toString()) : []);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setPermission(event.target.value as string[])
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const permissions = groupPermissions.map(element => ({ id: parseInt(element) }));

      const body = { id, name, permissions };
      const method = props.group ? 'PUT' : 'POST';

      await fetch('/api/group', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await Router.push('/groups');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card>
      <CardHeader title='Grupo' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
                fullWidth
                label='Nome do grupo'
                placeholder='Ex.: Administrador' />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Permissões</InputLabel>
                <Select
                  multiple
                  value={groupPermissions}
                  onChange={handleSelectChange}
                  required={true}
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

export default FormGroups
