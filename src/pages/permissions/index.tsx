// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormPermission from 'src/views/defaults/form-layouts/FormPermission'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const FormLayouts = () => {
  return (
    <DatePickerWrapper>
      <Grid container >
        <Grid item xs={12}>
          <FormPermission />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
