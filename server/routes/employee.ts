/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Router, type Request, type Response } from 'express'
import {
  getEmployees,
  editEmployee,
  createEmployee,
  deleteEmployee,
  fetchEmployeeById
} from '../utils/employee'
import type Employee from '../model/Employee'
import { type QueryError } from 'mysql2'

const employeeRouter: Router = express.Router()

employeeRouter.get('/', async (_req: Request, res: Response, _next) => {
  void getEmployees((error: QueryError | null, employees?: Employee[]) => {
    if (error) {
      console.error('Error fetching users:', error)
      return
    }
    if (employees) {
      res.status(200).send(employees)
    } else {
      res.status(404).send({ message: 'No employees found' })
    }
  })
})

employeeRouter.get('/:id', async (req: Request, res: Response) => {
  void fetchEmployeeById(
    parseInt(req.params.id),
    (error: QueryError | null, employee: Employee | null) => {
      if (error) {
        console.error('Error fetching users:', error)
        return
      }
      if (employee) {
        res.status(200).send(employee)
      } else {
        res.status(404).send({ message: 'Employee not found' })
      }
    }
  )
})

employeeRouter.put('/:id', async (req: Request, res: Response) => {
  void editEmployee(parseInt(req.params.id), req.body, (error) => {
    if (error) {
      console.error('Error updating employee:', error)
      return
    }
    res.status(200).send({ message: 'Employee updated successfully' })
  })
})

employeeRouter.post('/', async (req: Request, res: Response) => {
  void createEmployee(req.body, (error, _insertedId) => {
    if (error) {
      console.error('Error creating employee:', error)
      return
    }
    res.status(201).send({ message: 'Employee created successfully' })
  })
})

employeeRouter.delete('/:id', async (req: Request, res: Response) => {
  void deleteEmployee(parseInt(req.params.id), (error) => {
    if (error) {
      console.error('Error deleting employee:', error)
      return
    }
    res.status(200).send({ message: 'Employee deleted successfully' })
  })
})

export default employeeRouter
