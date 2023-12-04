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
import { Serial } from '@prisma/client'

type Props = {
  serial: Serial | undefined;
}

const SerialForm: React.FC<Props> = (props) => {
  const [id, setId] = useState(props.serial ? props.serial.id : null);
  const [name, setName] = useState(props.serial ? props.serial.name : '');
  const [value, setValue] = useState(props.serial ? props.serial.value : '');
  const [pattern, setPattern] = useState(props.serial ? props.serial.pattern : '');

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { id, name, value, pattern };
      const method = props.serial ? 'PUT' : 'POST';

      await fetch('/api/serial', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await Router.push('/serials');
    } catch (error) {
      console.error(error);
    }
  }

  const onDelete = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { id };

      await fetch('/api/serial/'+id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await Router.push('/serials');
    } catch (error) {
      console.error(error);
    }
  }

  const onReturn = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await Router.push('/serials');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card>
      <CardHeader title='Serial' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
                fullWidth
                label='Nome do serial'
                placeholder='Ex.: Serial de vidros...' />
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required={true}
                fullWidth
                label='Valor do serial'
                placeholder='Ex.: #00032' />
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                fullWidth
                label='Estilo do serial'
                placeholder='Ex.: #00032' />
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

export default SerialForm
