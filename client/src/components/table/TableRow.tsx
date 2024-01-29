import React from "react";
import ButtonComponent from "../ui/Button";
import { Employee } from "../../types/Employee";

const TableRowComponent: React.FC<{
  employee: Employee;
  deleteEmployee: (id: number) => void;
}> = (props) => {
  return (
    <tr key={props.employee.id}>
      <td> {props.employee.firstName} </td>
      <td>{props.employee.lastName}</td>
      <td>{props.employee.department}</td>
      <td>${props.employee.salary.toLocaleString()}</td>
      <td>
        <div className="btn-group align-center gap-2 d-md-flex justify-content-md-center">
          <div>
            <ButtonComponent
              to={`/edit-employee/${props.employee.id}`}
              classes="btn btn-warning"
              content="Edit"
            />
          </div>
          <div>
            <ButtonComponent
              to={`/`}
              classes="btn btn-danger"
              content="Delete"
              onClick={() => props.deleteEmployee(props.employee.id!)}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TableRowComponent;
