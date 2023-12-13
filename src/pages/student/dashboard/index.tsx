// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const DashboardStudent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Ongoing'></CardHeader>
          <CardContent>
            <Typography>This is still ongoing.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

DashboardStudent.acl = {
  action: 'read',
  subject: 'student-page'
}

export default DashboardStudent
