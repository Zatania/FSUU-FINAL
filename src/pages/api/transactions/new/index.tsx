import { NextApiResponse, NextApiRequest } from 'next/types'
import { RowDataPacket } from 'mysql2/promise'
import db from '../../../db'

interface TransactionData {
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
}

const insertTransaction = async (transaction: TransactionData) => {
  const {
    user_id,
    dateFilled,
    transcriptCopies,
    transcriptAmount,
    dismissalCopies,
    dismissalAmount,
    moralCharacterCopies,
    moralCharacterAmount,
    diplomaCopies,
    diplomaAmount,
    authenticationCopies,
    authenticationAmount,
    courseDescriptionCopies,
    courseDescriptionAmount,
    certificationType,
    certificationCopies,
    certificationAmount,
    cavRedRibbonCopies,
    cavRedRibbonAmount,
    totalAmount,
    purpose
  } = transaction

  try {
    const [rows] = (await db.query(
      'INSERT INTO transactions (user_id, dateFilled, transcriptCopies, transcriptAmount, dismissalCopies, dismissalAmount, moralCharacterCopies, moralCharacterAmount, diplomaCopies, diplomaAmount, authenticationCopies, authenticationAmount, courseDescriptionCopies, courseDescriptionAmount, certificationType, certificationCopies, certificationAmount, cavRedRibbonCopies, cavRedRibbonAmount, totalAmount, status, purpose) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        user_id,
        dateFilled,
        transcriptCopies,
        transcriptAmount,
        dismissalCopies,
        dismissalAmount,
        moralCharacterCopies,
        moralCharacterAmount,
        diplomaCopies,
        diplomaAmount,
        authenticationCopies,
        authenticationAmount,
        courseDescriptionCopies,
        courseDescriptionAmount,
        certificationType,
        certificationCopies,
        certificationAmount,
        cavRedRibbonCopies,
        cavRedRibbonAmount,
        totalAmount,
        'Submitted',
        purpose
      ]
    )) as RowDataPacket[]

    return rows[0] || null
  } catch (error) {
    console.log(error)
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body

  try {
    const transaction = await insertTransaction(data)

    return res.status(200).json(transaction)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    } else {
      return res.status(500).json({ message: 'Something went wrong' })
    }
  }
}

export default handler
