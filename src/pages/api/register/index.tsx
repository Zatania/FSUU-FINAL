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

    return rows[0] || null
  } catch (error) {
    console.log(error)
  }
}

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  const { username, email, password } = req.body

  try {
    const user = await insertUser(username, email, password)

    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).json({ message: 'Username or Password is invalid' })
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    } else {
      return res.status(500).json({ message: 'Something went wrong' })
    }
  }
}

export default handler
