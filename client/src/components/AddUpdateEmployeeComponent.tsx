/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import { Department } from "../types/Department";
import FormInput from "./ui/FormInput";
import ButtonComponent from "./ui/Button";

const AddUpdateEmployeeComponent: React.FC<{}> = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);
  const [listDepartments, setListDepartments] = useState<Department[]>([]);
  const [errors, setErrors] = useState<any>({
    firstName: null,
    lastName: null,
    salary: null,
  });

  const [touchedFields, setTouchedFields] = useState<any>({
    firstName: false,
    lastName: false,
    salary: false,
  });

  const { id } = useParams();
  const employeeId = id ? parseInt(id) : null;

  const saveOrUpdateEmployee = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateForm()) {
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
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: any = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }

    if (salary <= 0) {
      newErrors.salary = "Salary must be greater than 0";
      isValid = false;
    } else if (salary >= 2147483647) {
      newErrors.salary = "Please enter valid Salary";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field: string) => {
    setTouchedFields({ ...touchedFields, [field]: true });
  };
  useEffect(() => {
    validateForm();
  }, [firstName, lastName, department, salary, listDepartments]);

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
                <FormInput
                  label="First Name :"
                  type="text"
                  classes="form-control mb-2"
                  placeholder="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value!)}
                  error={touchedFields.firstName && errors.firstName}
                  onBlur={() => handleBlur("firstName")}
                />

                <FormInput
                  label="Last Name :"
                  type="text"
                  classes="form-control mb-2"
                  placeholder="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value!)}
                  onBlur={() => handleBlur("lastName")}
                  error={touchedFields.lastName && errors.lastName}
                />

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

                <FormInput
                  label="Salary"
                  type="number"
                  classes="form-control mb-2"
                  placeholder="Salary"
                  name="salary"
                  value={salary.toString()}
                  onChange={(e) => setSalary(parseInt(e.target.value))}
                  onBlur={() => handleBlur("salary")}
                  error={touchedFields.salary && errors.salary}
                />
                <div className="btn-group align-center gap-2 d-md-flex justify-content-md-center">
                  <button
                    className="btn btn-success"
                    disabled={
                      errors.firstName ||
                      errors.lastName ||
                      errors.department ||
                      errors.salary
                    }
                    onClick={saveOrUpdateEmployee}>
                    Submit{" "}
                  </button>
                  <ButtonComponent
                    to="/employees"
                    classes="btn btn-danger"
                    content="Cancel"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateEmployeeComponent;
