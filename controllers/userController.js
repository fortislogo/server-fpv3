var db = require('../dbWrapper');

//GET users from the backenduser table
exports.getusers = async (req, res) => {
    db.query('SELECT Id, Name, Phone, Email, Password, IsActive, UserRole, CreatedDate FROM backendUser ORDER BY Name ASC', function (err, rows) {
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
    db.query('SELECT Id, Name, Phone, Email, Password, IsActive, UserRole, CreatedDate FROM backendUser WHERE Id = ?', [id], function (err, rows) {
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

    var Email = req.body.Email;
    var Name = req.body.Name;
    var Phone = req.body.Phone;
    var Password = req.body.Password;
    var IsActive = req.body.Status;
    var UserRole = req.body.UserRole;
	
    db.query('INSERT INTO backendUser (Email, Name, Phone, Password, IsActive, UserRole) VALUES (?, ?, ?, ?, ?, ?)',
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
    db.query('SELECT Id, Email FROM backendUser WHERE Email = ? LIMIT 0, 1', [email], function (err, rows) {
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
	var editProfile = req.body.editProfile;
	if (editProfile == 1) {	
			db.query('UPDATE backendUser SET Email = ?, Name = ?, Phone = ? WHERE Id = ?',
			[Email, Name, Phone, userid],
			function (err, result) {
				if (!err) {
					if (result.affectedRows != 0) {
						res.send({
							"success": "true",
							response: result
						});
					}
				} else {
					res.status(400).send(err);
				}
			});
	}else{
			db.query('UPDATE backendUser SET Email = ?, Name = ?, Phone = ?, Password = ?, IsActive = ?, UserRole = ?  WHERE Id = ?',
			[Email, Name, Phone, Password, IsActive, UserRole, userid],
			function (err, result) {
				if (!err) {
					if (result.affectedRows != 0) {
						res.send({
							"success": "true",
							response: result
						});
					}
				} else {
					res.status(400).send(err);
				}
			});		
	}
};

//user login
exports.userLogin = async (req, res) => {
    var Email = req.body.Email;
    var Password = req.body.Password;

    db.query('SELECT Id, Name, Phone, Email, IsActive, UserRole FROM backendUser WHERE Email = ? AND Password = ? AND IsActive = 1 LIMIT 0, 1', 
        [Email, Password],
            function (err, result) {
				if (!err) {
					if (result.length != 0) {
						res.send(result)
					} else {
						res.send(result)
					}
				}
				else {
					res.status(400).send(err);
				}
	})
};

exports.userChangePassword = async (req, res) => {
    var userid = req.body.Id;
    var Password = req.body.Password;
	
    db.query('UPDATE backendUser SET Password = ? WHERE Id = ?',
        [Password, userid],
        function (err, result) {
            if (!err) {
                if (result.affectedRows != 0) {
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
