import axios from "axios";
import { Employee } from "../types/Employee";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employees";

class EmployeeService {
  getAllEmployees() {
    return axios.get(EMPLOYEE_API_BASE_URL);
  }

  createEmployee(employee:Employee) {
    return axios.post(EMPLOYEE_API_BASE_URL, employee);
  }

  getEmployeeById(employeeId:number) {
    return axios.get(EMPLOYEE_API_BASE_URL + "/" + employeeId);
  }

  updateEmployee(employeeId:number, employee:Employee) {
    return axios.put(EMPLOYEE_API_BASE_URL + "/" + employeeId, employee);
  }

  deleteEmployee(employeeId:number) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + employeeId);
  }
}

const employeeService: EmployeeService = new EmployeeService();
export default employeeService;
