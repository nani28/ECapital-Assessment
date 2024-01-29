import React from "react";
import { Employee } from "../../types/Employee";
import TableRowComponent from "./TableRow";

const TableComponent: React.FC<{
  employees: Employee[];
  deleteEmployee: (id: number) => void;
}> = (props) => {
  return (
    <table className="table table-bordered">
      <thead className="text-center ">
        <tr>
          <th> First Name </th>
          <th> Last Name </th>
          <th> Department </th>
          <th> Salary </th>
          <th> Actions </th>
        </tr>
      </thead>
      <tbody>
        {props.employees.map((employee) => (
          <TableRowComponent
            key={employee.id}
            employee={employee}
            deleteEmployee={props.deleteEmployee}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
