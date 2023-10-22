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
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Categorie, Serial } from '@prisma/client'

type Props = {
  categorie: Categorie | undefined;
  serials: Serial[];
  categorieSerial: number | undefined;
}

const CategorieForm: React.FC<Props> = (props) => {
  const [id, setId] = useState(props.categorie ? props.categorie.id : null);
  const [name, setName] = useState(props.categorie ? props.categorie.name : '');
  const [active, setActive] = useState(props.categorie ? props.categorie.active : true);
  const [categorieSerial, setSerial] = useState(props.categorie ? props.categorieSerial : null);

  const onChangeSerial = (event: SelectChangeEvent<number>) => {
    setSerial(event.target.value as number)
  }

  const onChangeActive = (event: SelectChangeEvent<boolean>) => {
    setActive(event.target.value as boolean)
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {;
      const body = { id, name, active, ref_serial: categorieSerial };
      const method = props.categorie ? 'PUT' : 'POST';

      await fetch('/api/categorie', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await Router.push('/categories');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card>
      <CardHeader title='Categoria' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
                fullWidth
                label='Nome do categoria'
                placeholder='Ex.: Categoria de vidros...' />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Seriais</InputLabel>
                <Select
                  value={categorieSerial ? categorieSerial : ''}
                  onChange={onChangeSerial}
                  required={true}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Seriais' id='serials' />}
                >
                  {
                    props.serials.map((serial) => (
                      <MenuItem key={serial.id} value={serial.id}>
                        {serial.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Ativo?</InputLabel>
                <Select
                  value={active}
                  onChange={onChangeActive}
                  required={true}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Ativo?' id='active' />}
                >
                  <MenuItem value={true as any}>
                    Sim
                  </MenuItem>
                  <MenuItem value={false as any}>
                    Não
                  </MenuItem>
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

export default CategorieForm
