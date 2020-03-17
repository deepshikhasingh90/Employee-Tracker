/*  To populate the choices.  */ 

const roleTitleChoices = () => {
    return `SELECT role.id,role.title FROM role`
}

const employeeList = () => {
    return `SELECT DISTINCT CONCAT(employee.first_name, ' ', employee.last_name) as name, id
            FROM employee
            ORDER BY name ASC;`
}

const deptList =() => {
    return `SELECT * FROM department;`
}

const viewEmployees = () => {
    return `SELECT employee.first_name, employee.last_name, role.title,department.name As department,
            role.salary ,CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee
            INNER JOIN role ON employee.role_id = role.id
            INNER JOIN department ON role.department_id = department.id
            LEFT JOIN employee AS manager ON employee.manager_id = manager.id; `
};

const viewEmployeeByDept = () => {
    return `SELECT  department.name AS department,role.title,employee.first_name,employee.last_name FROM employee 
            JOIN role ON employee.role_id = role.id
            JOIN Department  ON department.id = role.department_id
            ORDER BY department.name;`
}

const addEmployee = (firstName,lastName,roleID,managerID) =>{
    return `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ('${firstName}', '${lastName}', ${roleID}, ${managerID});`
}

const removeEmployee = (employeeName) => {
    return `DELETE FROM employee WHERE CONCAT(employee.first_name, ' ', employee.last_name) = '${employeeName}';`
}

const updateEmployeeRole = (newRoleID,employeeName) => {
    return `UPDATE Employee
            SET role_id = ${newRoleID}
            WHERE  CONCAT(employee.first_name, ' ', employee.last_name) = '${employeeName}'`
}

const updateEmployeeManager = (managerID,employeeName) => {
    return `UPDATE Employee
    SET manager_id = ${managerID}
    WHERE  CONCAT(employee.first_name, ' ', employee.last_name) = '${employeeName}' `
}

const viewAllRoles = () => {
    return `SELECT  role.id , role.title  FROM role`
}

const addRoles = (title,salary,department) => {
    return `INSERT INTO role (title, salary, department_id) 
    VALUES ('${title}', ${salary}, ${department});`
}

const removeRoles = (title) =>{
    return `DELETE FROM role WHERE title ="${title}";`
}

const viewAllDept =() => {
    return `SELECT name FROM department;`
}

const addDept =(dept) => {
    return` INSERT INTO department (name) 
             VALUES ('${dept}');`
 }

module.exports={
viewEmployees,
viewEmployeeByDept,
roleTitleChoices,
 employeeList,
 addEmployee,
removeEmployee,
updateEmployeeRole,
updateEmployeeManager,
viewAllRoles,
 addRoles,
deptList,
removeRoles,
 viewAllDept,
addDept
}