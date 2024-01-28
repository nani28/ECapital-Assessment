import express, { type Express } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import employeeRouter from './server/routes/employee'
import departmentRouter from './server/routes/department'

import cors from 'cors'

export const app: Express = express()

app.use(express.json())
// for encoding the URL
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

dotenv.config()

// app.get("/", (req: Request, res: Response) => {
//   res.redirect("")
// });

app.use('/employees', employeeRouter)
app.use('/departments', departmentRouter)
