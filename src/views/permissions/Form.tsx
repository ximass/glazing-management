// ** React Imports
import { useState, SyntheticEvent } from 'react';
import Router from 'next/router';

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { Permission } from '@prisma/client'

type Props = {
  permission: Permission | undefined;
}

const FormPermission: React.FC<Props> = (props) => {
  const [id, setId] = useState(props.permission ? props.permission.id : null);
  const [name, setName] = useState(props.permission ? props.permission.name : '');

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { id, name };
      const method = props.permission ? 'PUT' : 'POST';

      await fetch('/api/permission', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await Router.push('/permissions');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card>
      <CardHeader title='Permissão' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField fullWidth label='Permissão' placeholder='Ex.: Pedidos' value={name} onChange={(e) => setName(e.target.value)} />
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

export default FormPermission
