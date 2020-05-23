var inquirer = require("inquirer");
const connection = require("../db/connection");
const first = require("../server");

function addData() {
    inquirer
        .prompt({
            name: "add",
            type: "list",
            message: "What do you want to add?",
            choices: ["department", "role", "employee", "go back to main menu"]
        }).then(function (answer) {
            if (answer.add === "department") {
                addDepartment();
            }
            else if (answer.add === "role") {
                addRole();
            } else if (answer.add === "employee") {
                addEmployee();

            } else if (answer.add === "go back to main menu") {
                first.firstDecision();

            } else {
                connection.end();
            }
        });
}
function addDepartment() {
    inquirer
        .prompt({
            name: "addDepartment",
            type: "input",
            message: "What name do you want for this department?",
        }).then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    department_name: answer.addDepartment
                },
                function (err, results) {
                    if (err) throw err;
                    console.table("New Department has been added!", results)
                }
            );
        })
}
function addRole() {
    inquirer
        .prompt({
            name: "addRole",
            type: "input",
            message: "What name do you want for this role?",
        }).then(function (answer) {
            console.log(answer);
            connection.query(
                "INSERT INTO role SET ?",
                {
                    role_title: answer.addRole
                },
                function (err, results) {
                    if (err) throw err;
                    console.log("New Role has been added!");
                }
            );
        })
}
function addEmployee() {
    inquirer
        .prompt([{
            name: "addEmployeeFirstName",
            type: "input",
            message: "What the first name of the employee?",
        },
        {
            name: "addEmployeeLastName",
            type: "input",
            message: "What's the last name of the employee?",
        },
        {
            name: "addEmployeeRole",
            type: "input",
            message: "What is the employee's role?",
        },
        ]).then(function (answer) {
            console.log(answer);
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.addEmployeeFirstName
                },
                {
                    last_name: answer.addEmployeeLastName
                },
                {
                    role_id: answer.addEmployeeRole
                },
                function (err, results) {
                    if (err) throw err;
                    console.log("New employee's first and last name has been added!", results);
                }
            );
        })
}
module.exports = { addData }