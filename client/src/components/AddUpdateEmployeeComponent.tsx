import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import { Department } from "../types/Department";

const AddUpdateEmployeeComponent: React.FC<{}> = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);
  const [listDepartments, setListDepartments] = useState<Department[]>([]);

  const { id } = useParams();
  const employeeId = id ? parseInt(id) : null;

  const saveOrUpdateEmployee = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (employeeId) {
      EmployeeService.updateEmployee(employeeId, {
        id: employeeId,
        firstName,
        lastName,
        department,
        salary,
      })
        .then((response: any) => {
          console.log(response);
          window.location.href = "/employees";
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      EmployeeService.createEmployee({
        id: null,
        firstName,
        lastName,
        department,
        salary,
      })
        .then((response: any) => {
          console.log(response.data);
          window.location.href = "/employees";
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    EmployeeService.getAllDepartments().then((response: any) => {
      setListDepartments(response.data);
    });
    if (employeeId) {
      EmployeeService.getEmployeeById(employeeId)
        .then((response: any) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setDepartment(response.data.department);
          setSalary(response.data.salary);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [employeeId]);
  const title = () => {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> First Name :</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Last Name :</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Department</label>
                  <select
                    name="department"
                    className="form-control"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}>
                    {listDepartments.map((departmentOption, index) => (
                      <option key={index} value={departmentOption.name}>
                        {departmentOption.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Salary</label>
                  <input
                    type="number"
                    placeholder="Enter Salary"
                    name="salary"
                    className="form-control"
                    value={salary}
                    onChange={(e) =>
                      setSalary(parseInt(e.target.value))
                    }></input>
                </div>

                <button
                  className="btn btn-success"
                  onClick={saveOrUpdateEmployee}>
                  Submit{" "}
                </button>
                <Link to="/employees" className="btn btn-danger">
                  {" "}
                  Cancel{" "}
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateEmployeeComponent;
