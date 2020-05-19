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
        })
}
// const read = async (connection) => {
//     const sqlQuery = "SELECT * FROM products";
//     // array destructuring 
//     const [rows, fields] = await connection.query(sqlQuery);

//     console.log(rows);

// }
main();