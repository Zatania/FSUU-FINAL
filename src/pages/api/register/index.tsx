import { NextApiRequest, NextApiResponse } from 'next/types'
import { RowDataPacket } from 'mysql2/promise'
import db from '../../db'

interface User {
  id: number
  username: string
  email: string
  password: string
}

interface NextApiRequestWithUser extends NextApiRequest {
  body: User
}

const insertUser = async (username: string, email: string, password: string) => {
  try {
    const [rows] = (await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
      username,
      email,
      password
    ])) as RowDataPacket[]

    const userId = rows.insertId

    // Add the role to the user_roles table
    await db.query('INSERT INTO users_roles (user_id, role_id) VALUES (?, ?)', [userId, 1])

    return rows[0] || null
  } catch (error) {
    console.log(error)
  }
}

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  const { username, email, password } = req.body

  try {
    await insertUser(username, email, password)

    return res.status(200).json({ message: 'User created successfully' })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    } else {
      return res.status(500).json({ message: 'Something went wrong' })
    }
  }
}

export default handler
