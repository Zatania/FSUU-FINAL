/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'student') return '/dashboard/student'
  else if (role === 'staff') return '/dashboard/staff'
  else if (role === 'admin') return '/dashboard/admin'
  else return '/login'
}

export default getHomeRoute
