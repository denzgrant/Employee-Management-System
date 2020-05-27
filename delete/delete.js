var inquirer = require("inquirer");
const connection = require("../db/connection");
const first = require("../server");

function deleteData() {
    inquirer
        .prompt({
            name: "add",
            type: "list",
            message: "What do you want to delete?",
            choices: ["Department", "Role", "Employee", "Go Back to Main Menu"]
        }).then(function (answer) {
            if (answer.add === "Department") {
                deletDepart();
            }
            else if (answer.add === "Role") {
                deletRole();
            } else if (answer.add === "Employee") {
                deletEmployee();

            } else if (answer.add === "Go Back to Main Menu") {
                first.firstDecision();

            } else {
                connection.end();
            }
        });
}
function deletDepart() {
    connection.query(`SELECT * FROM department`, function (err, res) {
        if (err) throw err;
        console.table(res);
        inquirer
            .prompt([{
                name: "deletDepart",
                type: "list",
                choices: function () {
                    var departArray = [];
                    for (var i = 0; i < res.length; i++) {
                        departArray.push(res[i].department_name);
                    }
                    return departArray;
                },
                message: "What department do you want to delete?",
            }]).then(function (answer) {
                connection.query(
                    "DELETE FROM department WHERE ?",
                    {
                        department_name: answer.deletDepart
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log(answer.deletDepart + " was deleted!\n");
                        deleteData();
                    }
                )
            });

    });
};
function deletRole() {
    connection.query(`SELECT * FROM role`, function (err, res) {
        if (err) throw err;
        console.table(res);
        inquirer
            .prompt([{
                name: "deletRole",
                type: "list",
                choices: function () {
                    var emArray = [];
                    for (var i = 0; i < res.length; i++) {
                        emArray.push(res[i].role_title);
                    }
                    return emArray;
                },
                message: "What role do you want to delete?",
            }]).then(function (answer) {
                connection.query(
                    "DELETE FROM role WHERE ?",
                    {
                        role_title: answer.deletRole
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log(answer.deletRole + " was deleted!\n");
                        deleteData();
                    }
                )
            });

    });
};
function deletEmployee() {
    connection.query(`SELECT * FROM employee`, function (err, res) {
        if (err) throw err;
        console.table(res);
        inquirer
            .prompt([{
                name: "deletEmployee",
                type: "list",
                choices: function () {
                    var emArray = [];
                    for (var i = 0; i < res.length; i++) {
                        emArray.push(res[i].id);
                    }
                    return emArray;
                },
                message: "What employee do you want to delete? Select their ID number to delete",
            }]).then(function (answer) {
                connection.query(
                    "DELETE FROM employee WHERE ?",
                    {
                        id: answer.deletEmployee
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log(`Employee number ${answer.deletEmployee} was deleted!\n`);
                        deleteData();
                    }
                )
            });

    });
};
module.exports = { deleteData }