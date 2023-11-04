// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Button from '@mui/material/Button';

import { Provider } from '@prisma/client'

interface Column {
  id: 'id' | 'name' | 'legal_name' | 'email' | 'identity' | 'info' | 'cep' | 'uf' | 'address' | 'city' | 'phone' | 'country' | 'company_owner' | 'company_owner_cpf'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Nome', minWidth: 130 },
  { id: 'legal_name', label: 'Nome Legal', minWidth: 130 },
  { id: 'identity', label: 'CNPJ', minWidth: 100 },
  { id: 'email', label: 'E-mail', minWidth: 100 },
  { id: 'phone', label: 'Telefone', minWidth: 120 },
  { id: 'cep', label: 'Cep', minWidth: 120 },
  { id: 'country', label: 'País', minWidth: 100 },
  { id: 'uf', label: 'Uf', minWidth: 80 },
  { id: 'city', label: 'Cidade', minWidth: 120 },
  { id: 'address', label: 'Endereço', minWidth: 120 },
  { id: 'company_owner', label: 'Responsável', minWidth: 120 },
  { id: 'company_owner_cpf', label: 'CPF responsável', minWidth: 120 },
  { id: 'info', label: 'Info', minWidth: 120 }
]

interface Data {
  id: number,
  name: string,
  email: string,
  identity: string,
  info: string,
  cep: string,
  uf: string,
  address: string,
  city: string,
  phone: string,
  company_owner: string,
  company_owner_cpf: string,
  country: string
}

type Props = {
  providers: Provider[];
}

function createData(id: number, name: string, legal_name: string, email: string, identity: string, info: string, cep: string, uf: string, address: string, city: string, phone: string, country: string, company_owner: string, company_owner_cpf: string): Data {
  return { id, name, email, identity, info, cep, uf, address, city, phone, country, company_owner, company_owner_cpf, legal_name }
}

const ProvidersTable: React.FC<Props> = (props) => {
  // ** States
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const rows: Data[] = [];

  if (props.providers) {
    props.providers.forEach(provider => {
      rows.push(createData(provider.id, provider.name, provider.legal_name, provider.email, provider.identity, provider.info, provider.cep, provider.uf, provider.address, provider.city, provider.phone, provider.country, provider.company_owner, provider.company_owner_cpf));
    });
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.identity}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                  <TableCell>
                    <Button color='primary' variant='text' href={'/providers/' + row.id}>
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default ProvidersTable
