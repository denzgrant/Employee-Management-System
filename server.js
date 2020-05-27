const connection = require("./db/connection");
const add = require("./add/add");
const view = require("./view/view");
const deletD = require("./delete/delete");
const up = require("./update/update")
var inquirer = require("inquirer");
var figlet = require('figlet');
const chalk = require('chalk');

const cTable = require('console.table');



console.log(
    chalk.greenBright.bgBlackBright(
        figlet.textSync('Characters \n Inc', { horizontalLayout: 'full', verticalLayout: 'full' })
    )
);

function firstDecision() {
    inquirer
        .prompt({
            name: "first",
            type: "list",
            message: "Hello, what is your inquiry?",
            choices: ["ADD", "VIEW", "UPDATE", "DELETE", "EXIT"]
        }).then(function (answer) {
            if (answer.first === "ADD") {
                add.addData();
            }
            else if (answer.first === "VIEW") {
                view.viewData();
            }
            else if (answer.first === "UPDATE") {
                up.updateData();

            }
            else if (answer.first === "DELETE") {
                deletD.deleteData();

            }
            else {
                console.table("Goodbye!")
                connection.end();
            }
        });
}
//Adding a department, role, or employee

exports.firstDecision = firstDecision;
firstDecision();