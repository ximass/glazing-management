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

import { ItemType, Category, ItemField, ItemFieldValue, Item } from '@prisma/client'

type Props = {
  itemType: ItemType | undefined;
  itemFields: ItemField[];
  itemFieldsValues: ItemFieldValue[];
  categories: Category[];
  itemTypeCategory: number | undefined;
}

const ItemTypeForm: React.FC<Props> = (props) => {
  const [id, setId] = useState(props.itemType ? props.itemType.id : null);
  const [name, setName] = useState(props.itemType ? props.itemType.name : null);
  const [info, setInfo] = useState(props.itemType ? props.itemType.info : null);
  const [active, setActive] = useState(props.itemType ? props.itemType.active : true);
  const [itemTypeCategory, setCategory] = useState(props.itemType ? props.itemTypeCategory : null);
  const [itemFields, setItemFields] = useState(props.itemType ? props.itemFields : []);
  const [itemFieldsValues, setItemFieldsValues] = useState(props.itemType ? props.itemFieldsValues : []);

  const indexedFields: { [key: string]: ItemField } = {};

  itemFields.forEach((itemField) => {
    indexedFields[itemField.id] = itemField;
  });

  const indexedFieldsValues: { [key: string]: ItemFieldValue } = {};

  itemFieldsValues.forEach((itemFieldValue: ItemFieldValue) => {
    indexedFieldsValues[itemFieldValue.ref_item_field] = itemFieldValue;
  });

  const removeField = async (e: SyntheticEvent, itemField: ItemField, itemFieldValue: ItemFieldValue) => {
    e.preventDefault();

    fetch('/api/itemFieldValue/' + itemFieldValue.id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id: itemFieldValue.id})
    }).then((response) => response.json()).then((itemFieldValue) => {
      
      fetch('/api/itemField/' + itemField.id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: itemField.id})
      }).then((response) => response.json()).then((itemField) => {
        setItemFields(itemFields.filter(object => object.id !== itemField.id));
        setItemFieldsValues(itemFieldsValues.filter(object => object.id !== itemFieldValue.id));
      });
    });
  }

  const addField = async (e: SyntheticEvent) => {
    e.preventDefault();

    const newItemField = {
      ref_item_type: props.itemType ? props.itemType.id : null,
      label: ''
    };

    await fetch('/api/itemField', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItemField),
    }).then((response) =>
      response.json()
    ).then((itemField) => {
      
      const newItemFieldValue = {
        value: '',
        ref_item_field: itemField.id
      };

      fetch('/api/itemFieldValue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItemFieldValue),
      }).then((response) => response.json()).then((itemFieldValue) => {
        setItemFieldsValues([...itemFieldsValues, itemFieldValue]);
        setItemFields([...itemFields, itemField]);
      });
    });
  }

  const onChangeCategory = (event: SelectChangeEvent<number>) => {
    setCategory(event.target.value as number);
  }

  const onChangeActive = (event: SelectChangeEvent<boolean>) => {
    setActive(event.target.value as boolean);
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { id, name, info, active, ref_category: itemTypeCategory };
      const method = props.itemType ? 'PUT' : 'POST';

      await fetch('/api/itemType', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await Router.push('/itemTypes');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card>
      <CardHeader title='Tipos de itens' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
                fullWidth
                label='Nome do tipo de item'
                placeholder='Ex.: Vidro' />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Categoria</InputLabel>
                <Select
                  value={itemTypeCategory ? itemTypeCategory : ''}
                  onChange={onChangeCategory}
                  required={true}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Categoria' id='category' />}
                >
                  {
                    props.categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                required={false}
                fullWidth
                label='Descrição'
                placeholder='Digite aqui' />
            </Grid>
            <Grid item xs={6}>
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

            {/* CAMPOS DOS ITENS */}

            <Grid item xs={12}>
              <CardHeader title='Campos customizáveis' titleTypographyProps={{ variant: 'h6' }} />
            </Grid>

            {
              itemFields != undefined &&
              itemFields.map((itemField) => (
                <>
                  <Grid item xs={6}>
                    <TextField
                      key={itemField.id}
                      value={indexedFields[String(itemField.id)].label}
                      onChange={(e) => setInfo(e.target.value)}
                      required={false}
                      fullWidth
                      label='Campo'
                      placeholder='Digite aqui'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      key={indexedFieldsValues[String(itemField.id)].value}
                      value={indexedFieldsValues[String(itemField.id)].value}
                      onChange={(e) => setInfo(e.target.value)}
                      required={false}
                      fullWidth
                      label='Valor'
                      placeholder='Digite aqui'
                    />
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex', justifyContent: 'right' }}>
                    <Button onClick={(event) => removeField(event, itemField, indexedFieldsValues[String(itemField.id)])} type='button' variant='outlined' size='small' style={{ color: 'red' }}>
                      Remover
                    </Button>
                  </Grid>
                </>
              ))
            }

            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'right' }}>
              <Button onClick={addField} type='button' variant='outlined' size='small'>
                Adicionar
              </Button>
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

export default ItemTypeForm
