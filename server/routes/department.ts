import express, { Router, Request, Response } from "express";
import { QueryError } from "mysql2";
import { getDepartments } from "../utils/department";
import Department from "../model/Department";

let departmentRouter: Router = express.Router();

departmentRouter.get("/", async (req: Request, res: Response) => {
  getDepartments((error: QueryError | null, departments?: Department[]) => {
    if (error) {
      console.error("Error fetching users:", error);
      return;
    }
    if (departments) {
      res.status(200).send(departments);
    } else {
      res.status(404).send("No employees found");
    }
  });
});

export default departmentRouter;