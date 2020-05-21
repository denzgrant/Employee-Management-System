module.exports =() => {

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
};