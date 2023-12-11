// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Dashboard',
    path: '/dashboard/admin',
    action: 'read',
    subject: 'admin-page',
    icon: 'mdi:home-outline'
  },
  {
    title: 'Dashboard',
    path: '/dashboard/student',
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
    path: '/acl',
    action: 'read',
    subject: 'acl-page',
    title: 'Access Control',
    icon: 'mdi:shield-outline'
  }
]

export default navigation
