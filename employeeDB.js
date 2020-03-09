const mysql = require("mysql");
const inquirer = require("inquirer");
let cTable = require("console.table");
let sqlQuery = require("./sql");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Deepshikha",
    database: "Employee_Tracker"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});
/* query and fetch all the role titles and create an array of titles */
var roleList = [];
var roleListObj = {};
function roleTitleChoices() {
    connection.query(sqlQuery.roleTitleChoices(), function (err, results) {
        if (err) throw err;
        for (let i = 0; i < results.length; i++) {
            roleList.push(results[i].title);
        }
        roleListObj = results
    });
}

/* run query to find role-id from role-title  */
function findRoleID(role, arrayObj) {
    for (let i = 0; i < arrayObj.length; i++) {
        if (role === arrayObj[i].title) {
            return arrayObj[i].id;
        }
    }
}

/* query and fetch all the Employee's names and create an array of names */
var employeeNames = ["None"];
var employeeNamesObj = {};
function employeeList() {
    connection.query(sqlQuery.employeeList(), function (err, results) {
        if (err) throw err;
        for (let i = 0; i < results.length; i++) {
            employeeNames.push(results[i].name);
        }
        employeeNamesObj = results;
    });
}

/* query to find manager ID from manager name */
function findManagerID(manager, objArray) {
    for (let j = 0; j < objArray.length; j++) {
        if (manager === objArray[j].name) {
            return objArray[j].id
        }
    }
}

/* query and fetch all the department's names and create an array of names */
var departmentList = [];
var departmentListObj = {};
function deptList() {
    connection.query(sqlQuery.deptList(), function (err, results) {
        if (err) throw err;
        for (let i = 0; i < results.length; i++) {
            departmentList.push(results[i].name);
        }
        departmentListObj = results;
    })
}

/* Query to find department id from department name  */
function findDeptID(department, objArray) {
    for (let i = 0; i < objArray.length; i++) {
        if (department === objArray[i].name) {
            return objArray[i].id
        }
    }
}
roleTitleChoices();
employeeList();
deptList();

function start() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: " What do you want to do?",
        choices: ["View All Employees",
            "View all employees By Department",
            "Add Employee",
            "Remove Employee",
            "Update Employee Roles",
            "Update Employee Manager",
            "View all roles",
            "Add role",
            "Remove Role",
            "View All Department",
            "Add Department",
            "exit"]
    }).then(function (answer) {
        switch (answer.action) {
            case "View All Employees":
                viewEmployee();
                break;

            case "View all employees By Department":
                viewEmployeeByDept();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Remove Employee":
                removeEmployee();
                break;

            case "Update Employee Roles":
                updateEmployeeRoles();
                break;

            case "Update Employee Manager":
                updateEmployeeManager();
                break;

            case "View all roles":
                viewAllRoles();
                break;

            case "Add role":
                addRoles();
                break;

            case "Remove Role":
                removeRoles();
                break;

            case "View All Department":
                viewAllDept();
                break;

            case "Add Department":
                addDept();
                break;

            case "exit":
                connection.end();
                break;
        }

    })
};

function viewEmployee() {
    connection.query(sqlQuery.viewEmployees(), function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });

};

function viewEmployeeByDept() {
    connection.query(sqlQuery.viewEmployeeByDept(), function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
};

function addEmployee() {
    inquirer.prompt([{
        name: "firstName",
        type: "input",
        message: "Please enter the First-Name of the Employee!",
        validate: answer => {
            if (answer != "") {
                return true;
            }
            return "Please enter a valid name.";
        }
    },
    {
        name: "lastName",
        type: "input",
        message: "Please enter the Last-Name of the Employee!",
        validate: answer => {
            if (answer != "") {
                return true;
            }
            return "Please enter a valid last-name.";
        }
    },
    {
        name: "role",
        type: "list",
        message: "Please enter the role of the employee!",
        choices: function () {
            const choice = roleList
            return choice;
        }
    },
    {
        name: "manager",
        type: "list",
        message: "Please choose a employee manager!",
        choices: employeeNames
    }
    ]).then(function (answer) {
        var newFirstName = answer.firstName;
        var newLastName = answer.lastName;
        var newRole = answer.role;
        var newManager = answer.manager;
        var roleID
        var managerID;

        var roleID = findRoleID(newRole, roleListObj)
        var managerID = (findManagerID(newManager, employeeNamesObj)) ? findManagerID(newManager, employeeNamesObj):null

        connection.query(sqlQuery.addEmployee(newFirstName, newLastName, roleID, managerID), function (err, results) {
            if (err) throw err;
            console.log(`Added employee  ${newFirstName} ${newLastName} in the record.`)
            start();
        });
    });

}

function removeEmployee() {
    inquirer.prompt({
        name: "deleteEmployee",
        type: "list",
        message: "Please choose the employee you want to delete",
        choices: employeeNames
    }).then(function (answer) {
        if (answer.deleteEmployee === 'None') {
            start();
        }
        else {
            connection.query(sqlQuery.removeEmployee(answer.deleteEmployee), function (err, results) {
                if (err) throw err;
                console.log(`Deleted Employee ${answer.deleteEmployee} from the record`);
                start();
            })
        }
    })
}

function updateEmployeeRoles() {
    inquirer.prompt([{
        name: "employee",
        type: "list",
        message: "Please select the employee you want to change role of",
        choices: employeeNames
    },
    {
        name: "newRole",
        type: "list",
        message: "Please select the new Role",
        choices: roleList
    }
    ]).then(function (answer) {
        if (answer.employee === 'None') {
            start();
        }
        else {
        var newRole = answer.newRole;
        var employeeName = answer.employee;
        var updatedRoleID = findRoleID(newRole, roleListObj);
        connection.query(sqlQuery.updateEmployeeRole(updatedRoleID, employeeName), function (err, results) {
            if (err) throw err;
            console.log("Record Updated!")
            start();
        })
    }
    })
}

function updateEmployeeManager() {

    inquirer.prompt([{
        name: "employee",
        type: "list",
        message: "Please select the employee you want to change Manager of",
        choices: employeeNames
    },
    {
        name: "Manager",
        type: "list",
        message: "Please select the new Role",
        choices: employeeNames
    }
    ]).then(function (answer) {

        var newManager = answer.Manager;
        var employeeName = answer.employee;
        var updatedManagerID = findManagerID(newManager, employeeNamesObj);

        connection.query(sqlQuery.updateEmployeeManager(updatedManagerID, employeeName), function (err, results) {
            if (err) throw err;
            console.log("Record Updated!");
            start();
        })
    })
}

function viewAllRoles() {
    connection.query(sqlQuery.viewAllRoles(), function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    })
}

function addRoles() {
    inquirer.prompt([{
        name: "title",
        type: "input",
        message: "Please enter the new role title",
    },
    {
        name: "salary",
        type: "input",
        message: "Please select the new salary",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    },
    {
        name: "department",
        type: "list",
        message: "Please select the department",
        choices: departmentList
    }
    ]).then(function (answer) {
        var title = answer.title;
        var salary = answer.salary;
        var department = answer.department;

        var departmmentID = findDeptID(department, departmentListObj);

        connection.query(sqlQuery.addRoles(title, salary, departmmentID), function (err, results) {
            if (err) throw err;
            console.log(`Created new Role ${title}! successfully`)
            start();
        })

    })

}

function removeRoles() {
    inquirer.prompt({
        name: "deleteRole",
        type: "list",
        message: "Please choose the Role you want to delete",
        choices: roleList
    }).then(function (answer) {
        connection.query(sqlQuery.removeRoles(answer.deleteRole), function (err, results) {
            if (err) throw err;
            console.log(`Deleted Employee ${answer.deleteRole} from the record`);
            start();
        })
    })
}

function viewAllDept() {
    connection.query(sqlQuery.viewAllDept(), function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    })
}

function addDept() {
    inquirer.prompt({
        name: "newDept",
        type: "input",
        message: "please eneter the new department"
    }).then(function (answer) {
        connection.query(sqlQuery.addDept(answer.newDept), function (err, results) {
            if (err) throw err;
            console.log('New Department was created successfully!');
            start();
        })
    })
}