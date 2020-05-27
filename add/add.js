var inquirer = require("inquirer");
const connection = require("../db/connection");
const first = require("../server");

function addData() {
    inquirer
        .prompt({
            name: "add",
            type: "list",
            message: "What do you want to add?",
            choices: ["Department", "Role", "Employee", "Go Back to Main Menu"]
        }).then(function (answer) {
            if (answer.add === "Department") {
                addDepartment();
            }
            else if (answer.add === "Role") {
                addRole();
            } else if (answer.add === "Employee") {
                addEmployee();

            } else if (answer.add === "Go Back to Main Menu") {
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
                `INSERT INTO department SET ?`,
                {
                    department_name: answer.addDepartment
                },
                function (err, results) {
                    if (err) throw err;
                    console.table("New Department has been added!", results)
                    addData();
                }
            );
        })
}
function addRole() {
    connection.query(`SELECT * FROM department`, function (err, res) {
        if (err) throw err;
        console.table(res);
        inquirer
            .prompt([{
                name: "addDepart",
                type: "list",
                choices: function () {
                    var departArray = [];
                    for (var i = 0; i < res.length; i++) {
                        departArray.push(res[i].id);
                    }
                    return departArray;
                },
                message: "What department does this role belong to?",
            },
            {
                name: "addRole",
                type: "input",
                message: "What name do you want for this role?",
            },
            {
                name: "addSalary",
                type: "input",
                message: "What is the salary?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            ]).then(function (answer) {
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        role_title: answer.addRole,
                        salary: answer.addSalary,
                        department_id: answer.addDepart
                    },
                    function (err, results) {
                        if (err) throw err;
                        console.log("New Role has been added!");
                        addData();
                    }
                );
            })
    })
}
function addEmployee() {
    connection.query(
        `SELECT e.first_name, e.last_name, e.id AS employee_id, r.id AS role_id, r.role_title, d.department_name
        FROM employee e
        LEFT JOIN employee em ON e.manager_id = em.id
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        ORDER BY e.id`,
        function (err, res) {
            console.table(res);
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
                    type: "list",
                    message: "What is the employee's role?",
                    choices: function () {
                        var roleArray = [];
                        for (var i = 0; i < res.length; i++) {
                            roleArray.push(res[i].role_id);
                        }
                        let removeDups = new Set(roleArray)
                        let newRoleArr = [...removeDups]; 
                        return newRoleArr;
                    },
                },
                ]).then(function (answer) {
                    connection.query(
                        "INSERT INTO employee SET ?",
                        {
                            first_name: answer.addEmployeeFirstName,
                            last_name: answer.addEmployeeLastName,
                            role_id: answer.addEmployeeRole,
                        },
                        function (err, results) {
                            if (err) throw err;
                            console.log("New employee has been added!");
                            addData();
                        }
                    );
                })
        }
    )
}
module.exports = { addData }

