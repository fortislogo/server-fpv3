var mysql = require('mysql2');

/*connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     database: 'flatpacks'
});

connection.connect(function (err) {
    if (!err) {
        console.log("Local Database is connected to local db");
    } else {
        console.log("Error connecting Local database local db", err);
    }
});*/

connection = mysql.createConnection({
    host: 'arfo8ynm6olw6vpn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'h64g4u33wukzkbi5',
    password: 'ioqqzjqjadtzaegr',
    database: 'vndr65p9ujtwnrcx'
});

connection.connect(function (err) {
    if (!err) {
        console.log("Local Database is connected to flatpacksdb");
    } else {
        console.log("Error connecting Local database flatpacksdb", err);
    }
});

module.exports = connection;
