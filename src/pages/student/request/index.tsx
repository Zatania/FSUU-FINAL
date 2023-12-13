// ** React Imports
import { Ref, useState, forwardRef, ReactElement } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Select from '@mui/material/Select'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hooks
import useBgColor from 'src/@core/hooks/useBgColor'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DialogAddAddress = () => {
  // ** States
  const [show, setShow] = useState<boolean>(true)

  // ** Hooks
  const bgColors = useBgColor()
  const router = useRouter()

  const handleClose = () => {
    // Set show to false
    setShow(false)

    // Redirect to the main index
    router.push('/')
  }

  return (
    <Dialog
      fullWidth
      open={show}
      maxWidth='md'
      scroll='body'
      onClose={handleClose}
      TransitionComponent={Transition}
      onBackdropClick={handleClose}
    >
      <DialogContent
        sx={{
          position: 'relative',
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ mb: 3 }}>
            Request Credentials
          </Typography>
          <Typography variant='body2'>
            Only fill the number of copies of the credentials yoou wanted to request.
          </Typography>
        </Box>
        <Grid container spacing={6}>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='First Name' placeholder='John' />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='Last Name' placeholder='Doe' />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id='country-select'>Country</InputLabel>
              <Select fullWidth placeholder='UK' label='Country' labelId='country-select' defaultValue='Select Country'>
                <MenuItem value='Select Country'>Select Country</MenuItem>
                <MenuItem value='France'>France</MenuItem>
                <MenuItem value='Russia'>Russia</MenuItem>
                <MenuItem value='China'>China</MenuItem>
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='US'>US</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label='Address Line 1' placeholder='12, Business Park' />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label='Address Line 2' placeholder='Mall Road' />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label='Town' placeholder='Los Angeles' />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='State / Province' placeholder='California' />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='Zip Code' placeholder='99950' />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Switch defaultChecked />} label='Make this default shipping address' />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant='contained' sx={{ mr: 1 }} onClick={() => setShow(false)}>
          Submit
        </Button>
        <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
DialogAddAddress.acl = {
  action: 'read',
  subject: 'request-page'
}
export default DialogAddAddress
