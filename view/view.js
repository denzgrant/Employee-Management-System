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
            choices: ["View all Employees",
                "View Employees by Department",
                "View Departments",
                "View Positions",
                "Go Back To The Main Menu"]
        }).then(function (answer) {
            if (answer.view === "View all Employees") {
                viewAllEmployees();
            }
            else if (answer.view === "View Employees by Department") {
                viewEmployeesByDepart();
            } else if (answer.view === "View Departments") {
                viewDepartments();

            } else if (answer.view === "View Positions") {
                viewPositions();

            } else if (answer.view === "Go Back To The Main Menu") {
                first.firstDecision();

            } else {
                connection.end();
            }
        });
}
const viewAllEmployees = () => {
    connection.query(
        `SELECT e.first_name AS First_Name, e.last_name AS Last_Name, e.id AS Employee_ID, r.salary AS Salary, r.role_title AS Position, d.department_name AS Department_Name
        FROM employee e LEFT JOIN employee m ON e.manager_id = m.id 
        INNER JOIN role r ON e.role_id = r.id 
        INNER JOIN department d ON r.department_id = d.id 
        ORDER BY e.id`,
        function (err, results) {
            if (err) throw err;

            console.table(results, "Warning: Milton Waddams technically isn't employed by Characters Inc");
            viewData();
        }
    );
}
const viewEmployeesByDepart = () => {
    connection.query(
        `SELECT d.department_name, e.first_name, e.last_name, e.id AS employee_id, r.salary, r.role_title 
        FROM employee e 
        LEFT JOIN employee em ON e.manager_id = em.id 
        INNER JOIN role r ON e.role_id = r.id 
        INNER JOIN department d ON r.department_id = d.id 
        ORDER BY d.department_name`,
        function (err, results) {
            if (err) throw err;
            console.table(results);
            viewData();
        }
    )
}
const viewDepartments = () => {
    connection.query(
        `SELECT d.department_name AS Department, r.role_title AS Postion, r.salary AS Salary
        FROM department d
        RIGHT JOIN role r ON r.department_id = d.id
        ORDER BY d.department_name`,
        function (err, results) {
            if (err) throw err;
            console.table(results);
            viewData();
        }
    )
}
const viewPositions = () => {
    connection.query(
        `SELECT role_title, salary FROM role
         ORDER BY role_title `,
        function (err, results) {
            if (err) throw err;
            console.table(results);
            viewData();
        }
    )
}
module.exports = { viewData }