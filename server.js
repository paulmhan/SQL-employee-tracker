const inquirer = require("inquirer");
const cTable = require('console.table');

function promptUser() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "action",
                choices: [
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "Update Employee Role",
                    // "Remove employee",
                    // "View all employees by department",
                    // "View all employees by manager",
                    "Exit"
                ]
            }
        ])
        .then(function (answer) {
            switch (answer.action) {
                case "Add Department":
                    orm.addDepartment();
                    break;
                case "Add Role":
                    orm.addRole();
                    break;
                case "Add Employee":
                    orm.addEmployee();
                    break;
                case "View All Departments":
                    orm.viewDepartments();
                    break;
                case "View All Roles":
                    orm.viewRoles();
                    break;
                case "View All Employees":
                    orm.viewEmployees();
                    break;
                case "Update Employee Role":
                    orm.updateEmployee();
                    break;
                case "Exit":
                    return;
            };
        })
}

promptUser();