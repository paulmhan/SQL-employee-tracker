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
                    "Exit"
                ]
            }
        ])
        .then(function (answer) {
            switch (answer.action) {
                case "Add Department":
                    promptAddDepartment();
                    break;
                case "Add Role":
                    promptAddRole();
                    break;
                case "Add Employee":
                    promptAddEmployee();
                    controller.addEmployee();
                    break;
                case "View All Departments":
                    controller.viewDepartments(function (res) {
                        console.table(res)
                        promptUser();
                    });
                    break;
                case "View All Roles":
                    controller.viewRoles(function (res) {
                        console.table(res)
                        promptUser();
                    });
                    break;
                case "View All Employees":
                    controller.viewEmployees(function (res) {
                        console.table(res)
                        promptUser();
                    });
                    break;
                case "Update Employee Role":
                    controller.updateEmployee();
                    break;
                case "Exit":
                    process.exit(-1);
                    return;
            };
        })
}


function promptAddDepartment() {
    inquirer.prompt(
        [
            {
                type: "input",
                name: "department",
                message: "What is the name of the department you would like to add?"
            }
        ])
        .then(function (answer) {
            let departmentName = answer.department;
            controller.addDepartment(departmentName, function (res) {
                console.table(res);
                promptUser();
            });
        });
}

function promptAddRole() {
    controller.viewDepartments(function (res) {
        let departmentNames = res.map(dept => dept.name);
        inquirer.prompt(
            [
                {
                    type: "input",
                    name: "role",
                    message: "What is the title of this role?"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary for this role?"
                },
                {
                    type: "list",
                    name: "department",
                    message: "Which department is this role in?",
                    choices: departmentNames
                },
            ])
            .then(function (answer) {
                let newRole = [answer.role, answer.salary, answer.department];
                controller.addRole(newRole, function (res) {
                    console.table(res);
                    promptUser();
                });
            });
    });
}










promptUser();