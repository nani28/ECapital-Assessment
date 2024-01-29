import React, { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";
import { Employee } from "../types/Employee";
import ButtonComponent from "./ui/Button";
import TableComponent from "./TableComponent";

const ListEmployeeComponent: React.FC<{}> = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {
    EmployeeService.getAllEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteEmployee = (employeeId: number) => {
    EmployeeService.deleteEmployee(employeeId)
      .then((response) => {
        getAllEmployees();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-start">
          <h2 className="text-start"> List of Employees </h2>
        </div>
        <div className="d-flex justify-content-end">
          <ButtonComponent
            to="/add-employee"
            classes="btn btn-primary mb-2 mt-2 text-end"
            content="Add Employee"
          />
        </div>
      </div>
      <div>
        <TableComponent employees={employees} deleteEmployee={deleteEmployee} />
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
