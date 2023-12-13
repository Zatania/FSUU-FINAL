// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      path: '/dashboard/admin',
      action: 'read',
      subject: 'admin-page',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Dashboard',
      path: '/student/dashboard',
      action: 'read',
      subject: 'student-page',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Dashboard',
      path: '/dashboard/staff',
      action: 'read',
      subject: 'staff-page',
      icon: 'mdi:home-outline'
    },
    {
      path: '/student/request',
      title: 'Request Credentials',
      action: 'read',
      subject: 'request-page',
      icon: 'mdi:shield-outline'
    }
  ]
}

export default navigation
