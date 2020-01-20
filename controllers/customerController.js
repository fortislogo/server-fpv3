var mysql = require('mysql2');
var multer = require("multer");
const fs = require('fs');
var nodemailer = require("nodemailer")
var sgTransport = require('nodemailer-sendgrid-transport');

/*connection = mysql.createConnection({
     host    : 'localhost',
     user    : 'root',
     database: 'flatpacks',
     password: ''
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

exports.login = async(req, res) => {
  var email = req.body.email;
  var mobile = req.body.mobile;
  connection.query('SELECT * FROM customer WHERE Email = ? AND MobileNumber = ?', [email, mobile], function(err, rows) {
    if (!err) {
      if (rows.length > 0) {
          res.send({
              "code": 200,
              "success": "Customer Login",
              response: rows
          }); 
      } else {
        res.send({
          "code": 400,
          "error": "Invalid Login"
        }); 
      }
    } else {
      res.status(400).send(err);
    }
  });
};

exports.register = async(req, res) => {
  var email = req.body.email;
  var mobile = req.body.mobile;
  var name = req.body.name;  

  connection.query("SELECT * FROM customer WHERE email = ?", [email], function(err, rows) {
    if (!err) {
      if (rows.length > 0) {
        res.send({
          "code": 400,
          "error": "Email already registered",
        });
      } else {

        connection.query("INSERT INTO customer (Name, Email, MobileNumber, CreatedDate) VALUES (?, ?, ?, NOW())", [name, email, mobile], function(err, rows) {

          if (!err) {
            res.send({
              "code": 200,
              "success": "Registration Success",
              "response": rows
            });
          }

        });
      }
    }
  });
};

exports.getCustomer = async(req, res) => {
  var customerId = req.body.id; 

  connection.query("SELECT * FROM customer WHERE CustomerId = ?", [customerId], function(err, rows) {
    if (!err) {
      if (rows.length > 0) {
        res.send({
          "code": 200,
          "response": rows
        });
      } 
    }
  });
};