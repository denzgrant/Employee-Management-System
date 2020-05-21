const mysql = require("mysql2/promise");
var inquirer = require("inquirer");
var figlet = require('figlet');
const chalk = require('chalk');

const cTable = require('console.table');

console.log(
    chalk.greenBright.bgBlackBright(
        figlet.textSync('Characters \n Inc', { horizontalLayout: 'full', verticalLayout: 'full' })
    )
);
const main = async () => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "password",
            database: "characters_db"
        });

        console.log(`Connected to database with id ${connection.threadId}`);
        start();
        connection.end();
    } catch (err) {
        console.log(err)
    }
};
function start() {
    inquirer
        .prompt({
            name: "firstDecision",
            type: "list",
            message: "Hello, what is your inquiry?",
            choices: ["ADD", "VIEW", "UPDATE"]
        }).then(function (answer) {
            if (answer.firstDecision === "ADD") {
                add();
            }
            else if (answer.firstDecision === "VIEW") {
                view();
            } else if (answer.firstDecision === "UPDATE") {
                update();

            } else {
                connection.end();
            }
        });
}
//Adding a department, role, or employee
function add() {
    inquirer
        .prompt({
            name: "add",
            type: "list",
            message: "What do you want to add?",
            choices: ["department", "role", "employee"]
        }).then(function (answer) {
            if (answer.add === "department") {
                addDepartment();
            }
            else if (answer.add === "role") {
                addRole();
            } else if (answer.add === "employee") {
                addEmployee();

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
            console.log(answer);
            // const showRock = async (answer) => {
            //     const sqlQuery = "INSERT INTO department ?";
            //     const params = [answer];
            //     // array destructuring 
            //     const [rows, fields] = await answer.query(sqlQuery, params);
            
            //     console.log(rows);
            
            // }

        })
    }
    
// const read = async (connection) => {
//     const sqlQuery = "SELECT * FROM products";
//     // array destructuring 
//     const [rows, fields] = await connection.query(sqlQuery);

//     console.log(rows);

// }
main();
