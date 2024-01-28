import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const file = process.env.DATABASE_URL
export const connection = mysql.createConnection(file!)
