import express, { Router, Request, Response } from "express";
import {
  getEmployees,
  editEmployee,
  createEmployee,
  deleteEmployee,
  fetchEmployeeById
} from "../utils/employee";
import Employee from "../model/Employee";
import { QueryError } from "mysql2";

let employeeRouter: Router = express.Router();

employeeRouter.get("/", async (req: Request, res: Response) => {
  getEmployees((error: QueryError | null, employees?: Employee[]) => {
    if (error) {
      console.error("Error fetching users:", error);
      return;
    }
    if (employees) {
    res.status(200).send(employees);
    } else {
      res.status(404).send("No employees found");
    }
  });
});

employeeRouter.get("/:id", async (req: Request, res: Response) => {
  fetchEmployeeById(parseInt(req.params.id),(error: QueryError | null, employee: Employee | null) => {
    if (error) {
      console.error("Error fetching users:", error);
      return;
    }
    if(employee){
    res.status(200).send(employee);}
    else{
      res.status(404).send("Employee not found");
    }
  });
});

employeeRouter.put("/:id", async (req: Request, res: Response) => {
  editEmployee(parseInt(req.params.id), req.body, (error) => {
    if (error) {
      console.error("Error updating employee:", error);
      return;
    }
    res.status(200).send("Employee updated successfully");
  });
});

employeeRouter.post("/", async (req: Request, res: Response) => {
  createEmployee(req.body, (error, insertedId) => {
    if (error) {
      console.error("Error creating employee:", error);
      return;
    }
    res.status(201).send("Employee created successfully");
  });
});

employeeRouter.delete("/:id", async (req: Request, res: Response) => {
  deleteEmployee(parseInt(req.params.id), (error) => {
    if (error) {
      console.error("Error deleting employee:", error);
      return;
    }
    res.status(200).send("Employee deleted successfully");
  });
});

export default employeeRouter;
