
var mysql = require('mysql2');
var multer = require("multer");
const fs = require('fs');
var nodemailer = require("nodemailer")
var sgTransport = require('nodemailer-sendgrid-transport');

// connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'flatpacksdb'
// });
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

//GET users from the backenduser table
exports.getusers = async (req, res) => {
    connection.query('SELECT Id, Name, Phone, Email, IsActive, UserRole, CreatedDate FROM backendUser ORDER BY Name ASC', function (err, rows) {
        if (!err) {
			
            if (rows.length != 0) {
                res.send(rows)
            } else {
                res.send(rows)
            }
        }
        else {
            res.status(400).send(err);
        }
    });
};

//GET product by id from the product table
exports.getuserbyId = async (req, res) => {
    var id = req.params.id;
    connection.query('SELECT Id, Name, Phone, Email, IsActive, UserRole, CreatedDate FROM backendUser WHERE Id = ?', [id], function (err, rows) {
        if (!err) {
            if (rows.length != 0) {
                res.send(rows)
            } else {
                res.send(rows)
            }
        }
        else {
            res.status(400).send(err);
        }
    });
};

//Post new user
exports.addUser = async (req, res) => {
	//check if email exists

    var Email = req.body.Email;
    var Name = req.body.Name;
    var Phone = req.body.Phone;
    var Password = req.body.Password;
    var IsActive = req.body.Status;
    var UserRole = req.body.UserRole;
	
    connection.query('INSERT INTO backendUser (Email, Name, Phone, Password, IsActive, UserRole) VALUES (?, ?, ?, ?, ?, ?)',
        [Email, Name, Phone, Password, IsActive, UserRole],
            function (err, result) {
                if (!err) {
                    if (result.affectedRows != 0) {
                        res.send({
                            "code": 200,
                            "success": "User Added",
                            response: result
                        }); 
                    }
                } else {
                    res.status(400).send(err);
                }
            });
			
};

exports.getUserbyEmail = async (req, res) => {
	var email = req.params.email;
    connection.query('SELECT Email FROM backendUser WHERE Email = ? LIMIT 0, 1', [email], function (err, rows) {
        if (!err) {
            if (rows.length != 0) {
                res.send(rows)
            } else {
                res.send(rows)
            }
        }
        else {
            res.status(400).send(err);
        }
    });	
}

//update user
exports.updateUser= async (req, res) => {
					
    var userid = req.body.Id;
    var Email = req.body.Email;
    var Name = req.body.Name;
    var Phone = req.body.Phone;
    var Password = req.body.Password;
    var IsActive = req.body.Status;
    var UserRole = req.body.UserRole;
	
    connection.query('UPDATE backendUser SET Email = ?, Name = ?, Phone = ?, IsActive = ?, UserRole = ?  WHERE Id = ?',
        [Email, Name, Phone, IsActive, UserRole, userid],
        function (err, result) {
            if (!err) {
                if (result.affectedRows != 0) {
                    console.log("result",result)
                    res.send({
                        "success": "true",
                        response: result
                    });
                }
            } else {
                res.status(400).send(err);
            }
        })
};
