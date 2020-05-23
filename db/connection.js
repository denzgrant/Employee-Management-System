const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "characters_db"
});

connection.connect(function (error) {
    if (error) {
        throw error;
    }
    // console.log(`Connected to database as id ${connection.threadId}`);
});
// Needed for SQL One 
connection.query = util.promisify(connection.query);

module.exports = connection;