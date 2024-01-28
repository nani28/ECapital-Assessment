/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Router, type Request, type Response } from 'express'
import { type QueryError } from 'mysql2'
import { getDepartments } from '../utils/department'
import type Department from '../model/Department'

const departmentRouter: Router = express.Router()

departmentRouter.get('/', async (_req: Request, res: Response) => {
  void getDepartments((error: QueryError | null, departments?: Department[]) => {
    if (error) {
      console.error('Error fetching users:', error)
      return
    }
    if (departments) {
      res.status(200).send(departments)
    } else {
      res.status(404).send('No employees found')
    }
  })
})

export default departmentRouter
