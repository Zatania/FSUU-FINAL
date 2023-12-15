// ** React Imports
import { ChangeEvent, Ref, useState, forwardRef, ReactElement, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Divider from '@mui/material/Divider'
import { FormControlLabel, FormGroup, Checkbox } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Hooks Imports
import { useSession } from 'next-auth/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})
interface DataGridRowType {
  id: number
  user_id: number
  dateFilled: string
  transcriptCopies: number
  transcriptAmount: number
  dismissalCopies: number
  dismissalAmount: number
  moralCharacterCopies: number
  moralCharacterAmount: number
  diplomaCopies: number
  diplomaAmount: number
  authenticationCopies: number
  authenticationAmount: number
  courseDescriptionCopies: number
  courseDescriptionAmount: number
  certificationType: string
  certificationCopies: number
  certificationAmount: number
  cavRedRibbonCopies: number
  cavRedRibbonAmount: number
  totalAmount: number
  purpose: string
  status: string
}
interface StatusObj {
  [key: string]: {
    title: string
    color: ThemeColor
  }
}

const statusObj: StatusObj = {
  Submitted: { title: 'Submitted', color: 'primary' },
  Claimed: { title: 'Claimed', color: 'success' },
  Rejected: { title: 'Rejected', color: 'error' },
  Resigned: { title: 'Resigned', color: 'warning' },
  Scheduled: { title: 'Scheduled', color: 'info' }
}

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const DashboardStudent = () => {
  // ** States
  const [data, setData] = useState<DataGridRowType[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<DataGridRowType | null>(null)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<DataGridRowType[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [show, setShow] = useState<boolean>(false)

  const columns: GridColDef[] = [
    {
      flex: 0.2,
      type: 'date',
      minWidth: 120,
      headerName: 'Date',
      field: 'dateFilled',
      valueGetter: params => new Date(params.value),
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {dayjs(params.row.dateFilled).format('MM/DD/YYYY')}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'totalAmount',
      headerName: 'Total Amount',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.totalAmount}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams) => {
        const status = statusObj[params.row.status]

        return (
          <CustomChip
            size='small'
            skin='light'
            color={status.color}
            label={status.title}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 140,
      field: 'action',
      headerName: 'Actions',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <Button variant='contained' onClick={() => handleViewDetails(params.row.id as number)}>
              View
            </Button>

            {/* Dialog */}
            <Dialog
              fullWidth
              open={show}
              maxWidth='md'
              scroll='body'
              onClose={handleClose}
              TransitionComponent={Transition}
              onBackdropClick={handleClose}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent
                  sx={{
                    position: 'relative',
                    pb: theme => `${theme.spacing(8)} !important`,
                    px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                    pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                  }}
                >
                  <IconButton
                    size='small'
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                  >
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
                    {params.row && (
                      <>
                        <Controller
                          name='id'
                          control={control}
                          defaultValue={params.row.id}
                          render={({ field }) => <TextField {...field} type='hidden' />}
                        />
                        {params.row.transcriptCopies !== 0 && (
                          <>
                            <Grid item sm={12} xs={12}>
                              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                                Transcript of Records
                              </Typography>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <Controller
                                name='transcriptCopies'
                                control={control}
                                defaultValue={params.row.transcriptCopies}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    fullWidth
                                    label='Number of Copy'
                                    error={!!errors.transcriptCopies}
                                    helperText={errors.transcriptCopies?.message}
                                  />
                                )}
                              />
                              <Controller
                                name='transcriptAmount'
                                control={control}
                                defaultValue={params.row.transcriptAmount}
                                render={({ field }) => <TextField {...field} type='hidden' />}
                              />
                            </Grid>
                          </>
                        )}
                        {params.row.dismissalCopies !== 0 && (
                          <>
                            <Grid item sm={12} xs={12}>
                              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                                Honorable Dismissal
                              </Typography>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <Controller
                                name='dismissalCopies'
                                control={control}
                                defaultValue={params.row.dismissalCopies}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    fullWidth
                                    label='Number of Copy'
                                    error={!!errors.dismissalCopies}
                                    helperText={errors.dismissalCopies?.message}
                                  />
                                )}
                              />
                              <Controller
                                name='dismissalAmount'
                                control={control}
                                defaultValue={params.row.dismissalAmount}
                                render={({ field }) => <TextField {...field} type='hidden' />}
                              />
                            </Grid>
                          </>
                        )}
                        {params.row.moralCharacterCopies !== 0 && (
                          <>
                            <Grid item sm={12} xs={12}>
                              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                                Good Moral Character
                              </Typography>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <Controller
                                name='moralCharacterCopies'
                                control={control}
                                defaultValue={params.row.moralCharacterCopies}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    fullWidth
                                    label='Number of Copy'
                                    error={!!errors.moralCharacterCopies}
                                    helperText={errors.moralCharacterCopies?.message}
                                  />
                                )}
                              />
                              <Controller
                                name='moralCharacterAmount'
                                control={control}
                                defaultValue={params.row.moralCharacterAmount}
                                render={({ field }) => <TextField {...field} type='hidden' />}
                              />
                            </Grid>
                          </>
                        )}
                        {params.row.diplomaCopies !== 0 && (
                          <>
                            <Grid item sm={12} xs={12}>
                              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                                Diploma
                              </Typography>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <Controller
                                name='diplomaCopies'
                                control={control}
                                defaultValue={params.row.diplomaCopies}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    fullWidth
                                    label='Number of Copy'
                                    error={!!errors.diplomaCopies}
                                    helperText={errors.diplomaCopies?.message}
                                  />
                                )}
                              />
                              <Controller
                                name='diplomaAmount'
                                control={control}
                                defaultValue={params.row.diplomaAmount}
                                render={({ field }) => <TextField {...field} type='hidden' />}
                              />
                            </Grid>
                          </>
                        )}
                        {params.row.authenticationCopies !== 0 && (
                          <>
                            <Grid item sm={12} xs={12}>
                              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                                Authentication
                              </Typography>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <Controller
                                name='authenticationCopies'
                                control={control}
                                defaultValue={params.row.authenticationCopies}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    fullWidth
                                    label='Number of Copy'
                                    error={!!errors.authenticationCopies}
                                    helperText={errors.authenticationCopies?.message}
                                  />
                                )}
                              />
                              <Controller
                                name='authenticationAmount'
                                control={control}
                                defaultValue={params.row.authenticationAmount}
                                render={({ field }) => <TextField {...field} type='hidden' />}
                              />
                            </Grid>
                          </>
                        )}
                        {params.row.courseDescriptionCopies !== 0 && (
                          <>
                            <Grid item sm={12} xs={12}>
                              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                                Course Description / Outline
                              </Typography>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <Controller
                                name='courseDescriptionCopies'
                                control={control}
                                defaultValue={params.row.courseDescriptionCopies}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    fullWidth
                                    label='Number of Copy'
                                    error={!!errors.courseDescriptionCopies}
                                    helperText={errors.courseDescriptionCopies?.message}
                                  />
                                )}
                              />
                              <Controller
                                name='courseDescriptionAmount'
                                control={control}
                                defaultValue={params.row.courseDescriptionAmount}
                                render={({ field }) => <TextField {...field} type='hidden' />}
                              />
                            </Grid>
                          </>
                        )}
                        {params.row.certificationCopies !== 0 && (
                          <>
                            <Grid item sm={12} xs={12}>
                              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                                Certification
                              </Typography>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                              <Controller
                                name='certificationType'
                                control={control}
                                defaultValue={params.row.certificationType}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    fullWidth
                                    label='Type of Certification'
                                    error={!!errors.certificationType}
                                    helperText={errors.certificationType?.message}
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                              <Controller
                                name='certificationCopies'
                                control={control}
                                defaultValue={params.row.certificationCopies}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    fullWidth
                                    label='Number of Copy'
                                    error={!!errors.certificationCopies}
                                    helperText={errors.certificationCopies?.message}
                                  />
                                )}
                              />
                              <Controller
                                name='certificationAmount'
                                control={control}
                                defaultValue={params.row.certificationAmount}
                                render={({ field }) => <TextField {...field} type='hidden' />}
                              />
                            </Grid>
                          </>
                        )}
                        {params.row.cavRedRibbonCopies !== 0 && (
                          <>
                            <Grid item sm={12} xs={12}>
                              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                                CAV / Red Ribbon
                              </Typography>
                            </Grid>
                            <Grid item sm={12} xs={12}>
                              <Controller
                                name='cavRedRibbonCopies'
                                control={control}
                                defaultValue={params.row.cavRedRibbonCopies}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    fullWidth
                                    label='Number of Copy'
                                    error={!!errors.cavRedRibbonCopies}
                                    helperText={errors.cavRedRibbonCopies?.message}
                                  />
                                )}
                              />
                              <Controller
                                name='cavRedRibbonAmount'
                                control={control}
                                defaultValue={params.row.cavRedRibbonAmount}
                                render={({ field }) => <TextField {...field} type='hidden' />}
                              />
                            </Grid>
                          </>
                        )}
                        <Grid item sm={12} xs={12}>
                          <Divider sx={{ mb: '0 !important' }} />
                        </Grid>
                        {params.row.purpose !== '' && (
                          <Grid item sm={12} xs={12}>
                            <Controller
                              name='purpose'
                              control={control}
                              defaultValue={params.row.purpose}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label='Purpose of Request'
                                  error={!!errors.purpose}
                                  helperText={errors.purpose?.message}
                                />
                              )}
                            />
                          </Grid>
                        )}
                        <Controller
                          name='totalAmount'
                          control={control}
                          defaultValue={params.row.totalAmount}
                          render={({ field }) => <TextField {...field} type='hidden' />}
                        />
                      </>
                    )}
                  </Grid>
                </DialogContent>
                <DialogActions
                  sx={{
                    justifyContent: 'center',
                    px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                    pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                  }}
                >
                  <Button variant='contained' sx={{ mr: 1 }} type='submit'>
                    Submit
                  </Button>
                  <Button variant='outlined' color='secondary' onClick={handleClose}>
                    Cancel
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </>
        )
      }
    }
  ]

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<DataGridRowType>({
    mode: 'onBlur'
  })

  const handleClose = () => {
    // Set show to false
    setShow(false)
  }

  const handleViewDetails = async (id: number) => {
    try {
      const response = await fetch(`/api/transactions/${id}`)
      const transactionDetails = await response.json()

      setSelectedTransaction(transactionDetails)
      setShow(true)
      toast.success('Transaction details fetched')
    } catch (error) {
      console.error('Error fetching transaction details:', error)
    }
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/transactions/list`)
        const transactionList = await response.json()
        setData(transactionList) // Assuming the API response is an array of transactions
      } catch (error) {
        console.error('Error fetching transactions:', error)
      }
    }

    fetchTransactions()
  }, [selectedTransaction])

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const onSubmit = async (data: DataGridRowType) => {
    console.log(data)
    try {
      const response = await fetch(`/api/transactions/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.status === 200) {
        toast.success('Transaction updated successfully')
        handleClose()
      }
    } catch (error) {
      console.error('Error updating transaction:', error)
    }
  }

  return (
    <Card>
      <CardHeader title='Transactions' />
      <DataGrid
        autoHeight
        columns={columns}
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        slots={{ toolbar: QuickSearchToolbar }}
        onPaginationModelChange={setPaginationModel}
        rows={filteredData.length ? filteredData : data}
        slotProps={{
          baseButton: {
            variant: 'outlined'
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
          }
        }}
      />
    </Card>
  )
}

DashboardStudent.acl = {
  action: 'read',
  subject: 'student-page'
}

export default DashboardStudent
