var inquirer = require("inquirer");
const connection = require("../db/connection");
const first = require("../server");
const cTable = require('console.table');

function updateData() {
    inquirer
        .prompt({
            name: "add",
            type: "list",
            message: "What do you want to update?",
            choices: ["Department", "Role", "Employee", "Go Back to Main Menu"]
        }).then(function (answer) {
            if (answer.add === "Department") {
                updateDepart();
            }
            else if (answer.add === "Role") {
                updateRole();
            } else if (answer.add === "Employee") {
                updateEmploy();

            } else if (answer.add === "Go Back to Main Menu") {
                first.firstDecision();

            } else {
                connection.end();
            }
        });
}
//fix uppdate part 
function updateDepart() {
    connection.query(`
        SELECT d.department_name, e.first_name, e.last_name, e.id AS employee_id, r.salary, r.role_title
        FROM employee e
        LEFT JOIN employee em ON e.manager_id = em.id
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        ORDER BY r.role_title;`, function (err, res) {
        if (err) throw err;
        console.table(res);
        inquirer
            .prompt([{
                name: "updateEmployee",
                type: "list",
                choices: function () {
                    var employArr = [];
                    for (var i = 0; i < res.length; i++) {
                        employArr.push(res[i].iemployee_id);
                    }
                    return employArr;
                },
                message: "What employee's role do you want to update?",
            },
            {
                name: "addRole",
                type: "input",
                message: "What role are you seeking to change it to?",
                choices: function () {
                    var roleArr = [];
                    for (let roleArr of res.length) {
                        roleArr.push(res[i].role_title);
                    }
                    
                    return roleArr;
                }
            }]).then(function (answer) {
            connection.query(
                "UPDATE role SET role_title ?",
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


module.exports = { updateData }
