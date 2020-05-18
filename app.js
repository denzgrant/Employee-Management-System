const mysql = require("mysql2/promise");
var inquirer = require("inquirer");


const main = async () => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "password",
            database: "icecream_db"
        });

        console.log(`Connected to database with id ${connection.threadId}`);

        connection.end();
    } catch (err) {
        console.log(err)
    }
};