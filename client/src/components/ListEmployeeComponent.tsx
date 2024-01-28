import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import { Employee } from "../types/Employee";

const ListEmployeeComponent: React.FC<{}> = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {
    EmployeeService.getAllEmployees()
      .then((response) => {
        setEmployees(response.data);
        console.log(response.data);
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
      <h2 className="text-center"> List Employees </h2>
      <Link to="/add-employee" className="btn btn-primary mb-2">
        {" "}
        Add Employee{" "}
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <th> Employee Id </th>
          <th> Employee First Name </th>
          <th> Employee Last Name </th>
          <th> Employee Department </th>
          <th> Employee Salary </th>
          <th> Actions </th>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td> {employee.id} </td>
              <td> {employee.firstName} </td>
              <td>{employee.lastName}</td>
              <td>{employee.department}</td>
              <td>$ {employee.salary.toLocaleString()}</td>
              <td>
                <Link
                  className="btn btn-info"
                  to={`/edit-employee/${employee.id}`}>
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEmployee(employee.id!)}
                  style={{ marginLeft: "10px" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
