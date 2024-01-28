import { type OkPacket, type QueryError, type RowDataPacket } from 'mysql2'
import { connection } from '../db/connection'
import type Employee from '../model/Employee'

async function getAllEmployees (): Promise<Employee[]> {
  return await new Promise<Employee[]>((resolve, reject) => {
    const query = `
            SELECT
                Employee.id AS id,
                Employee.firstName as firstName,
                Employee.lastName as  lastName,
                Department.name AS department,
                Employee.salary as salary
            FROM 
                Department
            INNER JOIN 
                Employee ON Department.id = Employee.departmentId;
        `
    connection.query(query, (error, results) => {
      if (error) {
        reject(error)
        return
      }

      const rows = results as RowDataPacket[]
      const employees: Employee[] = rows.map((row: any) => ({
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        department: row.department,
        salary: row.salary
      }))
      resolve(employees)
    })
  })
}

export async function getEmployees (
  callback: (error: QueryError | null, employees?: Employee[]) => void
) {
  try {
    const employees = await getAllEmployees()
    callback(null, employees)
  } catch (error: any) {
    callback(error)
  }
}

async function updateEmployee (
  employeeData: Employee,
  departmentId: number,
  employeeId: number
): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    connection.query(
      'UPDATE EMPLOYEE SET ? WHERE id = ?',
      [
        {
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
          salary: employeeData.salary,
          departmentId
        },
        employeeId
      ],
      (error) => {
        if (error) {
          reject(error)
          return
        }
        resolve() // Update successful
      }
    )
  })
}
export async function editEmployee (
  employeeId: number,
  employeeData: Employee,
  callback: (error: QueryError | null) => void
) {
  try {
    const departmentId: number = await getDepartmentId(employeeData.department)
    await updateEmployee(employeeData, departmentId, employeeId)
    callback(null)
  } catch (error: any) {
    callback(error)
  }
}

async function deleteEmployeeById (employeeId: number): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    connection.query(
      'DELETE FROM Employee WHERE id = ?',
      employeeId,
      (error) => {
        if (error) {
          reject(error)
          return
        }
        resolve() // Deletion successful
      }
    )
  })
}

async function getEmployeeById (employeeId: number): Promise<Employee | null> {
  return await new Promise<Employee | null>((resolve, reject) => {
    const query = `
            SELECT
                Employee.id AS id,
                Employee.firstName as firstName,
                Employee.lastName as  lastName,
                Department.name AS department,
                Employee.salary as salary
            FROM 
                Department
            INNER JOIN 
                Employee ON Department.id = Employee.departmentId
            WHERE 
                Employee.id = ?;
        `
    connection.query(query, employeeId, (error, results) => {
      if (error) {
        reject(error)
        return
      }

      const rows = results as RowDataPacket[]
      if (rows.length === 0) {
        resolve(null) // Employee not found
      } else {
        const employee: Employee = {
          id: rows[0].id,
          firstName: rows[0].firstName,
          lastName: rows[0].lastName,
          department: rows[0].department,
          salary: rows[0].salary
        }
        resolve(employee)
      }
    })
  })
}
export async function fetchEmployeeById (
  employeeId: number,
  callback: (error: QueryError | null, employee: Employee | null) => void
) {
  try {
    const employee = await getEmployeeById(employeeId)
    callback(null, employee)
  } catch (error: any) {
    callback(error, null)
  }
}

export async function deleteEmployee (
  employeeId: number,
  callback: (error: QueryError | null) => void
) {
  try {
    const employee = await getEmployeeById(employeeId)
    if (employee) {
      await deleteEmployeeById(employeeId)
    } else {
      console.log('Employee with id ' + employeeId + ' doesnot exists')
    }
    callback(null)
  } catch (error: any) {
    callback(error)
  }
}

async function getDepartmentId (departmentName: string): Promise<number> {
  return await new Promise<number>((resolve, reject) => {
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
        }
      }
    )
  })
}

async function insertEmployee (
  employeeData: Employee,
  departmentId: number
): Promise<number> {
  return await new Promise<number>((resolve, reject) => {
    connection.query(
      'INSERT INTO Employee SET ?',
      {
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        salary: employeeData.salary,
        departmentId
      },
      (error, results) => {
        if (error) {
          reject(error)
          return
        }
        const rows = results as OkPacket

        resolve(rows.insertId) // Pass the inserted id back
      }
    )
  })
}

// Create New Employee
export async function createEmployee (
  employeeData: Employee,
  callback: (error: QueryError | null, insertedId?: number) => void
) {
  try {
    const departmentId: number = await getDepartmentId(employeeData.department)
    const insertedId = await insertEmployee(employeeData, departmentId)
    callback(null, insertedId)
  } catch (error: any) {
    callback(error)
  }
}
