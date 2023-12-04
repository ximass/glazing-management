// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

interface RowType {
  cliente: string
  pedido: string
  data: string
  status: string
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const rows: RowType[] = [
  {
    status: 'aguardando',
    data: '09/27/2018',
    cliente: 'Alberto Rocha',
    pedido: '#103258',
  },
  {
    data: '09/23/2016',
    cliente: 'Valdemir dos Santos',
    status: 'rejeitado',
    pedido: '#103242',
  },
  {
    data: '10/15/2017',
    cliente: 'Minnie Roy',
    status: 'aceitado',
    pedido: '#230132'
  },
  {
    data: '06/12/2018',
    status: 'pausado',
    cliente: 'Ralph Leonard',
    pedido: '#123652'
  },
  {
    status: 'aceitado',
    data: '03/24/2018',
    cliente: 'Annie Martin',
    pedido: '#738293'
  },
  {
    data: '08/25/2017',
    cliente: 'Adeline Day',
    status: 'aceitado',
    pedido: '#217234'
  },
  {
    status: 'aguardando',
    data: '06/01/2017',
    cliente: 'Lora Jackson',
    pedido: '#093283'
  },
  {
    data: '12/03/2017',
    cliente: 'Rodney Sharp',
    status: 'aceitado',
    pedido: '#329123'
  }
]

const statusObj: StatusObj = {
  rejeitado: { color: 'error' },
  aguardando: { color: 'secondary' },
  pausado: { color: 'warning' },
  aceitado: { color: 'success' }
}

const DashboardTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: RowType) => (
              <TableRow hover key={row.cliente} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.pedido}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.cliente}</TableCell>

                <TableCell>{row.data}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable