import { NextApiResponse, NextApiRequest } from 'next/types'
import { RowDataPacket } from 'mysql2/promise'
import db from '../../db'

const getUser = async (username: string, password: string) => {
  try {
    const [rows] = (await db.query(
      'SELECT users.*, roles.name AS role_name FROM users ' +
        'JOIN users_roles ON users.id = users_roles.user_id ' +
        'JOIN roles ON users_roles.role_id = roles.id ' +
        'WHERE username = ? AND password = ?',
      [username, password]
    )) as RowDataPacket[]

    return rows[0] || null
  } catch (error) {
    console.log(error)
  }
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body

  try {
    const user = await getUser(username, password)

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    return res.status(200).json(user)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    } else {
      return res.status(500).json({ message: 'Something went wrong' })
    }
  }
}

export default handler
