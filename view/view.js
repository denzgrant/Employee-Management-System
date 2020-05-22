var inquirer = require("inquirer");
const connection = require("../db/connection");
const first = require("../server");
const cTable = require('console.table');

function viewData() {
    inquirer
        .prompt({
            name: "view",
            type: "list",
            message: "What do you want to view?",
            choices: ["View all employees", "View Employees by Department", "View all Employees by Manager", "go back to main menu"]
        }).then(function (answer) {
            if (answer.view === "View all employees") {
                viewAllEmployees();
            }
            else if (answer.view === "View Employees by Department") {
                viewEmployeesByDepart();
            } else if (answer.view === "View all Employees by Manager") {
                viewEmployeeByManager();

            } else if (answer.view === "go back to main menu") {
                first.firstDecision();

            } else {
                connection.end();
            }
        });
}
const viewAllEmployees = async (connection) => {
    const [rows, fields] = await connection.query("SELECT * FROM employee");
    console.table(rows);
      
}
const viewEmployeesByDepart = async (connection) => {
    const [rows, fields] = await connection.query("SELECT * FROM employee ORDER BY role_id DESC");
    console.table(rows);
      
}
const viewEmployeeByManager = async (connection) => {
    const [rows, fields] = await connection.query("SELECT * FROM employee ORDER BY manager_id DESC");
    console.table(rows);
      
}
module.exports = { viewData }