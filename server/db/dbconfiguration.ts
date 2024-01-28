import fs from 'fs'
import {
  type QueryError,
  type ResultSetHeader,
  type RowDataPacket
} from 'mysql2'
import { connection } from './connection'
import path from 'path'

async function connectToDatabase (): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    connection.connect((err: QueryError | null) => {
      if (err) {
        console.error('Error connecting to database:', err)
        reject(err)
      } else {
        console.log('Connected to the database')
        resolve()
      }
    })
  })
}

async function createTables (): Promise<void> {
  const sqlScript = `

        DROP TABLE IF EXISTS Employee;
        DROP TABLE IF EXISTS Department;

        CREATE TABLE IF NOT EXISTS Department (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL UNIQUE
        ) AUTO_INCREMENT = 1;

        CREATE TABLE IF NOT EXISTS Employee (
            id INT PRIMARY KEY AUTO_INCREMENT,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            salary INT NOT NULL,
            departmentId INT,
            FOREIGN KEY (departmentId) REFERENCES Department(id)
        ) AUTO_INCREMENT = 1;`

  await new Promise<void>((resolve, reject) => {
    connection.query(sqlScript, (error, results, fields) => {
      if (error) {
        console.error('Error initializing database:', error)
        reject(error)
      } else {
        console.log('Database initialized successfully')
        resolve()
      }
    })
  })
}

async function insertData (): Promise<void> {
  // Read data from data.json
  const file = path.join('data.json')
  const jsonData = fs.readFileSync(file, 'utf-8')
  const data = JSON.parse(jsonData)

  // Insert departments first
  const departmentSet = new Set<string>() // Set to store department names
  const departmentMap = new Map<string, number>() // Map to store department names and IDs

  data.employees.forEach((employee: any) => {
    departmentSet.add(employee.department)
  })

  for (const department of departmentSet) {
    await new Promise<void>((resolve, reject) => {
      connection.query(
        `INSERT INTO Department (name) VALUES ('${department}')`,
        (err, result) => {
          if (err) {
            console.error('Error inserting department: ' + err.message)
            reject(err)
          } else {
            const row = result as ResultSetHeader
            departmentMap.set(department, row.insertId)
            resolve()
          }
        }
      )
    })
  }

  console.log('Departments inserted successfully')

  async function insertEmployees (): Promise<void> {
    for (const employee of data.employees) {
      const departmentId = await getDepartmentId(employee.department)
      if (departmentId !== null) {
        const { firstName, lastName, salary } = employee
        const sql = `INSERT INTO Employee (firstName, lastName, salary, departmentId) VALUES ('${firstName}', '${lastName}', ${salary}, ${departmentId})`

        // Execute the SQL query
        await new Promise<void>((resolve, reject) => {
          connection.query(sql, (err, result) => {
            if (err) {
              console.error('Error inserting employee: ' + err.message)
              reject(err)
            } else {
              const row = result as ResultSetHeader
              console.log('Inserted employee with ID ' + row.insertId)
              resolve()
            }
          })
        })
      }
    }
  }

  await insertEmployees()
}

export async function main () {
  try {
    await connectToDatabase()
    await createTables()
    await insertData()
  } catch (error) {
    console.error('Error:', error)
  }
}

async function getDepartmentId (departmentName: string): Promise<number | null> {
  return await new Promise<number | null>((resolve, reject) => {
    connection.query(
      `SELECT id FROM Department WHERE name = '${departmentName}'`,
      (err, result) => {
        if (err) {
          console.error('Error checking existing department: ' + err.message)
          reject(err)
          return
        }
        const rows = result as RowDataPacket[]
        if (rows.length > 0) {
          resolve(rows[0].id)
        } else {
          resolve(null) // Department not found
        }
      }
    )
  })
}
