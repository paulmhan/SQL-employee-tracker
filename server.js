const inquirer = require("inquirer");
const cTable = require('console.table');
const orm = require("./models/orm.js")



promptUser = () => {
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
        .then(answer => {
            switch (answer.action) {
                case "Add Department":
                    promptAddDepartment();
                    break;
                case "Add Role":
                    promptAddRole();
                    break;
                case "Add Employee":
                    promptAddEmployee();
                    break;
                case "View All Departments":
                    orm.all("department", res => {
                        console.table(res)
                        process.exit(-1);
                    });
                    break;
                case "View All Roles":
                    orm.all("role", res => {
                        console.table(res)
                        process.exit(-1);
                    });
                    break;
                case "View All Employees":
                    orm.all("employee", res => {
                        console.table(res)
                        process.exit(-1);
                    });
                    break;
                case "Update Employee Role":
                    promptUpdateEmployee();
                    break;
                case "Exit":
                    process.exit(-1);
                    return;
            };
        })
}


promptAddDepartment = () => {
    inquirer.prompt(
        [
            {
                type: "input",
                name: "department",
                message: "What is the name of the department you would like to add?"
            }
        ])
        .then(answer => {
            let departmentName = answer.department;
            orm.addDepartment(departmentName, res => {
                console.log(`${departmentName} was added!`);
                process.exit(-1);
            });
        });
}

promptAddRole = () => {
    orm.all("department", res => {
        let departmentNames = res.map(dept => dept.name);
        inquirer.prompt(
            [
                {
                    type: "input",
                    name: "role",
                    message: "What is the title of this role?"
                },
                {
                    type: "number",
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
            .then(answer => {
                let departmentIndex = departmentNames.indexOf(answer.department) + 1;
                orm.addRole(answer.role, answer.salary, departmentIndex, res => {
                    console.log(`${answer.role} was added!`);
                    process.exit(-1);
                });
            });
    });
}

promptAddEmployee = () => {
    orm.all("role", res => {
        let roleNames = res.map(role => role.title);
        inquirer.prompt(
            [
                {
                    type: "input",
                    name: "fName",
                    message: "What is the employee's first name?"
                },
                {
                    type: "input",
                    name: "lName",
                    message: "What is the employee's last name?"
                },
                {
                    type: "list",
                    name: "role",
                    message: "What is the employee's role?",
                    choices: roleNames
                },
            ])
            .then(answer => {
                let roleIndex = roleNames.indexOf(answer.role) + 1;
                orm.addEmployee(answer.fName, answer.lName, roleIndex, res => {
                    console.log(`${answer.fName} was added!`);
                    process.exit(-1);
                });
            });
    })
}

promptUpdateEmployee = () => {
    orm.all("employee", res => {
        let employeeNames = res.map(employee => employee.first_name);
        inquirer.prompt(
            [
                {
                    type: "list",
                    name: "name",
                    message: "What is this employee's name?",
                    choices: employeeNames
                },
                {
                    type: "input",
                    name: "role",
                    message: "Which role would you like to move them to?"
                },
            ])
            .then(answer => {
                let roleIndex = roleNames.indexOf(answer.role) + 1;
                orm.addEmployee(answer.fName, answer.lName, roleIndex, res => {
                    console.log(`${answer.fName} was added!`);
                    process.exit(-1);
                });
            });
    })}











promptUser();