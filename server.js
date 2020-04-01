const inquirer = require("inquirer");
const cTable = require('console.table');
const controller = require("./controllers/index.js")

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
                    controller.addDepartment();
                    break;
                case "Add Role":
                    controller.addRole();
                    break;
                case "Add Employee":
                    controller.addEmployee();
                    break;
                case "View All Departments":
                    controller.viewDepartments();
                    break;
                case "View All Roles":
                    controller.viewRoles();
                    break;
                case "View All Employees":
                    controller.viewEmployees();
                    break;
                case "Update Employee Role":
                    controller.updateEmployee();
                    break;
                case "Exit":
                    return;
            };
        })
}

promptUser();