import { NextApiRequest, NextApiResponse } from 'next/types'
import db from '../../../db'
import { RowDataPacket } from 'mysql2'

interface Student {
  id: number
  username: string
  password: string
  studentNumber: string
  firstName: string
  middleName: string
  lastName: string
  department: string
  course: string
  major: string
  graduateCheck: string
  graduationDate: string
  academicHonor: string
  yearLevel: string
  schoolYear: string
  semester: string
  homeAddress: string
  contactNumber: string
  emailAddress: string
  birthDate: string
  birthPlace: string
  religion: string
  citizenship: string
  sex: string
  fatherName: string
  motherName: string
  guardianName: string
  elementary: string
  elementaryGraduated: string
  secondary: string
  secondaryGraduated: string
  juniorHigh: string
  juniorHighGraduated: string
  seniorHigh: string
  seniorHighGraduated: string
  tertiary: string
  tertiaryGraduated: string
  employedAt: string
  position: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.body
  try {
    const [result] = (await db.query(
      `SELECT users.*, department.name
    FROM users
    LEFT JOIN department ON users.department = department.id
    WHERE users.id = ?`,
      [id]
    )) as RowDataPacket[]
    if (!result) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Extract the department name from the result
    const { name, ...userData } = result[0]

    // Replace the department ID with the department name in the result
    const resultWithDepartmentName = {
      ...userData,
      department: name
    }

    res.status(200).json(resultWithDepartmentName)
  } catch (error) {
    console.error('Error fetching transaction details:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default handler
