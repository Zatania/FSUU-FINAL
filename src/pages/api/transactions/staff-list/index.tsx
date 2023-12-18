import { NextApiResponse, NextApiRequest } from 'next/types'
import { RowDataPacket } from 'mysql2/promise'
import db from '../../../db'

interface Transaction {
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { staff_id } = req.body
    const query = `
    SELECT t.*
    FROM transactions t
    JOIN users u ON t.user_id = u.id
    JOIN staffs_departments sd ON u.department = sd.department_id
    WHERE sd.staff_id = ?
  `

    const queryParams: any[] = [staff_id]

    const results = (await db.query(query, queryParams)) as RowDataPacket

    const rows = results[0].map((row: Transaction) => ({
      id: row.id,
      user_id: row.user_id,
      dateFilled: row.dateFilled,
      transcriptCopies: row.transcriptCopies,
      transcriptAmount: row.transcriptAmount,
      dismissalCopies: row.dismissalCopies,
      dismissalAmount: row.dismissalAmount,
      moralCharacterCopies: row.moralCharacterCopies,
      moralCharacterAmount: row.moralCharacterAmount,
      diplomaCopies: row.diplomaCopies,
      diplomaAmount: row.diplomaAmount,
      authenticationCopies: row.authenticationCopies,
      authenticationAmount: row.authenticationAmount,
      courseDescriptionCopies: row.courseDescriptionCopies,
      courseDescriptionAmount: row.courseDescriptionAmount,
      certificationType: row.certificationType,
      certificationCopies: row.certificationCopies,
      certificationAmount: row.certificationAmount,
      cavRedRibbonCopies: row.cavRedRibbonCopies,
      cavRedRibbonAmount: row.cavRedRibbonAmount,
      totalAmount: row.totalAmount,
      purpose: row.purpose,
      status: row.status
    }))

    res.status(200).json(rows)
  } catch (error) {
    console.error('Error in API route:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default handler
