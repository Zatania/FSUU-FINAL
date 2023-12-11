// ** Next Imports
import { NextApiResponse, NextApiRequest } from 'next/types'

// ** Fake user data and data type
// ** Please remove below user data and data type in production and verify user with Real Database
export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
}
const users: UserDataType[] = [
  {
    id: 1,
    role: 'admin',
    password: 'admin',
    username: 'johndoe',
    fullName: 'John Doe',
    email: 'admin@materio.com'
  },
  {
    id: 2,
    role: 'student',
    password: 'client',
    username: 'nathandoe',
    fullName: 'Nathan Doe',
    email: 'client@materio.com'
  }
]

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body

  const user = users.find(u => u.username === username && u.password === password)

  if (user) {
    return res.status(200).json(user)
  } else {
    return res.status(404).json({ message: 'Username or Password is invalid' })
  }
}

export default handler
