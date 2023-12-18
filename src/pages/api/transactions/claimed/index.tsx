import { NextApiResponse, NextApiRequest } from 'next/types'
import db from '../../../db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.body

    if (!id) {
      return res.status(400).json({ error: 'Missing ID in request' })
    }

    await db.query('UPDATE transactions SET status = "Claimed" WHERE id = ?', [id])

    res.status(200).json({ message: 'Success' })
  } catch (error) {
    console.error('Error fetching transaction details:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default handler
