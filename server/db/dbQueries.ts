class Queries {
  // SQL script to create a new tables in the database
  SQL_SCRIPT = `
        DROP TABLE IF EXISTS Employee;
        DROP TABLE IF EXISTS Department;

        CREATE TABLE IF NOT EXISTS Department (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL UNIQUE
        ) AUTO_INCREMENT = 1;

        CREATE TABLE IF NOT EXISTS Employee (
            id INT PRIMARY KEY AUTO_INCREMENT,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            salary INT NOT NULL,
            departmentId INT,
            FOREIGN KEY (departmentId) REFERENCES Department(id)
        ) AUTO_INCREMENT = 1;`
}

const queries = new Queries()
export default queries
