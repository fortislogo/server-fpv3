var mysql = require('mysql2');
var multer = require("multer");
const fs = require('fs');
var nodemailer = require("nodemailer")
var sgTransport = require('nodemailer-sendgrid-transport');
/*
 connection = mysql.createConnection({
     host    : 'localhost',
     user    : 'root',
     database: 'flatpacks',
     password: ''
 });
*/
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

exports.getAllProducts = async(req, res) => {
    connection.query('SELECT * FROM product', function(err, rows) {
        if (!err) {
            res.send(rows);
        } else {
            res.status(400).sender(err)
        }
    });
};

exports.getAllSubCategories = async(req, res) => {
    connection.query('SELECT * FROM productsubcategory', function(err, rows) {
        if (!err) {
            res.send(rows);
        } else {
            res.status(400).sender(err)
        }
    });
};

//GET product category from the product category table
exports.getcategory = async (req, res) => {
    connection.query('SELECT * FROM productcategory', function (err, rows) {
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

//GET gst  from the default table
exports.getgst = async (req, res) => {
    connection.query('SELECT * FROM `default`', function (err, rows) {
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

//GET product category from the product category table
exports.getsubcategory = async (req, res) => {
    var id = req.params.id;
    connection.query('SELECT * FROM productsubcategory WHERE ProductCategoryId = ?', [id], function (err, rows) {
        if (!err) {
            if (rows.length != 0) {
                res.send(rows)
            } else {
                console.log("get subcategory " + id)
                connection.query('SELECT * FROM product WHERE ProductCategoryId = ?', [id], function (err, products) {
                    if (!err) {
                        if (products.length != 0) {
                            res.send(products)
                        }
                        else {
                            res.send(products)
                        }
                    }
                })
            }
        }
        else {
            res.status(400).send(err);
        }
    });
};

//GET products from the product table
exports.getproducts = async (req, res) => {
    var id = req.params.id;
    console.log("sub cat id:::", id)
    connection.query('SELECT product.ProductName,product.ProductId FROM product INNER JOIN productsubcategory ON product.ProductSubCategoryId=productsubcategory.ProductSubCategoryId where productsubcategory.ProductSubCategoryId=?', [id], function (err, rows) {
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
exports.getproductbyId = async (req, res) => {
    var id = req.params.id;
    connection.query('SELECT * FROM product WHERE ProductId = ?', [id], function (err, rows) {
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

//GET material from the sections table
exports.getmaterial = async (req, res) => {
    var id = req.params.id;
    connection.query('SELECT section.Section, productsection.SectionId,productsection.ProductSectionId FROM section INNER JOIN productsection ON section.SectionId = productsection.SectionId where productsection.ProductId = ?', [id], function (err, rows) {
        if (!err) {
            if (rows.length !=0) {
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

//GET material types from the material type table
exports.getmaterialtype = async (req, res) => {
    connection.query('SELECT * FROM materialtype', function (err, rows) {
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

//GET door style from the door table
exports.getdoorstyle = async (req, res) => {
    connection.query('SELECT * FROM door', function (err, rows) {
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

//GET brand from the brand table
exports.getbrand = async (req, res) => {
    connection.query('SELECT * FROM brand', function (err, rows) {
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

//GET colour by brand id from the colour table
exports.getcolour = async (req, res) => {
    var id = req.params.id;
    connection.query('SELECT * FROM colour WHERE BrandId = ?', [id], function (err, rows) {
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

//GET finish by brand id from the finish table
exports.getfinish = async (req, res) => {
    var id = req.params.id;
    connection.query('SELECT * FROM finish WHERE BrandId = ?', [id], function (err, rows) {
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

//GET substrate from the brand table
exports.getsubstrate = async (req, res) => {
    connection.query('SELECT * FROM substrate', function (err, rows) {
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

//GET door hinge from the hinge table
exports.getdoorhinge = async (req, res) => {
    connection.query('SELECT * FROM hinge', function (err, rows) {
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

//GET shelve from the shelve table
exports.getshelves = async (req, res) => {
    connection.query('SELECT * FROM shelve', function (err, rows) {
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

//GET hardware from the shelve table
exports.gethardware = async (req, res) => {
    connection.query('SELECT * FROM hardware', function (err, rows) {
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

//Post new job
exports.addJob = async (req, res) => {
    var jobProduct=req.body.jobProductData
    var jobMaterial = req.body.materialData;
    var jobDoor = req.body.doorData
    var hinge = req.body.hingeData
    var shelve = req.body.shelveData
    var hardware = req.body.hardwareData
    var clientname=req.body.jobname
    var jobemail=req.body.email
    var jobcontactnumber=req.body.contactnumber
    var status="Pending"
    var orderDate=new Date();
    var TotalCost=req.body.TotalCost
    connection.query('INSERT INTO job(ClientName, email, ContactNo, Status, OrderDate,TotalCost ) VALUES (?,?,?,?,?,?)',
        [clientname, jobemail, jobcontactnumber,status,orderDate,TotalCost],
            function (err, result) {
                if (!err) {
                    if (result.affectedRows != 0) {
                        addjobproduct(jobProduct,jobMaterial,jobDoor,hinge,shelve,hardware,result.insertId,res)
                        res.send({
                            "code": 200,
                            "success": "Job Product Added",
                            response: result
                        }
                        ); 
                    }
                } else {
                    res.status(400).send(err);
                }
            });
};
//Post job product
addjobproduct = (jobProduct,jobMaterial,jobDoor,hinge,shelve,hardware,jobId,res) => {
    var count = jobProduct.length
    var jobId = jobId // Job ID from the add job
    var jobProduct = jobProduct; 
    var jobMaterial = jobMaterial; 
    var jobDoor = jobDoor
    var hinge = hinge
    var shelve = shelve
    var hardware = hardware
   console.log("job",jobProduct)
    jobProduct.map((product,key) => {
    if (
        typeof jobId !== undefined &&
        typeof product.productId !== undefined &&
        typeof product.width !== undefined &&
        typeof product.height !== undefined &&
        typeof product.depth !== undefined &&
        typeof product.elevation !== undefined &&
        typeof product.soffitHeight !== undefined &&
        typeof product.toeHeight !== undefined &&
        typeof product.toeRecess !== undefined &&
        typeof product.roomId !== undefined) {
        connection.query('INSERT INTO jobproduct( JobId, ProductId, Width, Height, Depth, Elevation, SoffitHeight, ToeHeight, ToeRecess,RoomId,StockCode,StockCodeStatusFlag,MaterialCost,DoorsCost,HardwareCost,ShelvesCost,Price) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [jobId, product.ProductId, product.Width, product.Height, product.Depth, product.Elevation, product.SoffitHeight, product.ToeHeight, product.ToeRecess, product.roomData,product.productStockCode,product.productStockFlag,product.MaterialCost,product.DoorsCost,product.HardwareCost,product.ShelvesCost,product.Price],
            function (err, result) {
                if (!err) {
                        if (result.affectedRows != 0) {
                            addjobmaterial(jobMaterial[key], result.insertId)
                            addDoor(jobDoor[key], result.insertId)
                            addHinge(hinge[key], result.insertId)
                            addShelve(shelve[key], result.insertId)
                            addHardware(hardware[key], result.insertId)
                        }
                } 
                else {
                    res.status(400).send(err);
                }
            });
        }
    })
};

//Post job material
addjobmaterial = (jobMaterial, jobProductId) => {
    var count = jobMaterial?jobMaterial.length:-1
    console.log("materials",count)
        jobMaterial.map((jobmaterial,key) => {
                    if (typeof jobProductId !== 'undefined' &&
                typeof jobmaterial.productSectionId !== 'undefined' &&
                typeof jobmaterial.materialId !== 'undefined' &&
                typeof jobmaterial.brandId !== 'undefined' &&
                typeof jobmaterial.finishId !== 'undefined' &&
                typeof jobmaterial.substrateId !== 'undefined' &&
                typeof jobmaterial.colourId !== 'undefined') {
                connection.query('INSERT INTO jobproductmaterialparams( JobProductId, ProductSectionId, MaterialId, BrandId, FinishId, SubstrateId, ColourId) VALUES (?,?,?,?,?,?,?)',
                    [jobProductId, jobmaterial.productSectionId, jobmaterial.materialId, jobmaterial.brandId, jobmaterial.finishId, jobmaterial.substrateId, jobmaterial.colourId],
    
                    function (err, result) {
                        if(!err){
                            // console.log("result",result)
                        }
                        
                    });
            }
                })


};

//Post Door 
addDoor = (jobDoor, jobProductId) => {
    if (typeof jobProductId !== 'undefined' &&
        typeof jobDoor.doorId !== 'undefined' &&
        typeof jobDoor.gapTop !== 'undefined' &&
        typeof jobDoor.gapBottom !== 'undefined' &&
        typeof jobDoor.gapLeft !== 'undefined' &&
        typeof jobDoor.gapRight !== 'undefined') {
        connection.query('INSERT INTO jobproductdoor( DoorId, JobProductId, GapTop, GapBottom, GapLeft, GapRight, Cost) VALUES (?,?,?,?,?,?,?)',
            [jobDoor.doorId, jobProductId, jobDoor.gapTop, jobDoor.gapBottom, jobDoor.gapLeft, jobDoor.gapRight,jobDoor.doorsCost],
            function (err, result) {               
                console.log("door product")
            });
    }

};

//Post Hinge 
addHinge = (hinge, jobProductId) => {
    if (typeof jobProductId !== 'undefined' &&
        typeof hinge.hingeId !== 'undefined') {
        connection.query('INSERT INTO jobproducthinge( JobProductId, HingeId) VALUES (?,?)',
            [jobProductId, hinge.hingeId],
            function (err, result) {
                console.log("hinge success")
            });
    }

};

//Post Shelve 
addShelve = (shelve, jobProductId) => {
    if (typeof jobProductId !== 'undefined' &&
        typeof shelve.shelveId !== 'undefined' &&
        typeof shelve.noOfShelves !== 'undefined') {
        connection.query('INSERT INTO jobproductshelve( JobProductId, ShelveId, NoOfShelves, Cost) VALUES (?,?,?,?)',
            [jobProductId, shelve.shelveId, shelve.noOfShelves,shelve.shelvesCost],
            function (err, result) {
                console.log("shelves success")
            });
    }
};

//Post Hardware 
addHardware = (hardware, jobProductId) => {
    if (typeof jobProductId !== 'undefined' &&
        typeof hardware.hardwareId !== 'undefined') {
        connection.query('INSERT INTO jobproducthardware( JobProductId, HardwareId) VALUES (?,?)',
            [jobProductId, hardware.hardwareId],
            function (err, result) {
                console.log("hardware success")
            });
    }
};


// Product List of a selected Job 
exports.getProductListOfSelectedJob = async (req, res) => {
    var id=req.params.id
    var plQuery = "SELECT jp.JobProductId , p.ProductName , jp.Width ,jp.Height, jp.Depth ,jp.StockCode,jp.StockCodeStatusFlag,jp.Price,jp.MaterialCost,jp.DoorsCost,jp.HardwareCost,jp.ShelvesCost,d.DoorName ,h.HingeType ,pc.Category ,s.ShelveName , jps.NoOfShelves ,hd.HardwareName,jpd.GapTop,jpd.GapBottom,jpd.GapLeft,jpd.GapRight FROM jobproduct jp LEFT JOIN product p ON jp.ProductId = p.ProductId LEFT JOIN jobproductdoor jpd ON jp.JobProductId = jpd.JobProductId LEFT JOIN door d ON jpd.DoorId = d.DoorId LEFT JOIN jobproducthinge jph ON jp.JobProductId = jph.JobproductId LEFT JOIN hinge h ON jph.HingeId = h.HingeId LEFT JOIN productcategory pc ON p.ProductCategoryId = pc.ProductCategoryId LEFT JOIN jobproductshelve jps ON jp.JobProductId = jps.JobProductId LEFT JOIN shelve s ON jps.ShelveId = s.ShelveId LEFT JOIN jobproducthardware jphd ON jp.JobProductId = jphd.JobproductId LEFT JOIN hardware hd ON jphd.HardwareId = hd.HardwareId WHERE jp.JobId = ?  ORDER BY jp.JobProductId DESC"
    connection.query(plQuery,[id], function (err, rows) {
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


// Show details of materials of each section of the selected product
exports.getMaterialListOfSelectedProduct = async (req, res) => {
    var id = req.params.id;
    var plQuery = "SELECT s.Section , mt.materialtype, b.BrandName ,f.FinishName ,st.SubstrateName ,c.ColourName FROM jobproduct jp LEFT JOIN jobproductmaterialparams jpmp ON jp.JobProductId = jpmp.JobProductId LEFT JOIN productsection ps ON jpmp.ProductSectionId= ps.ProductSectionId LEFT JOIN section s ON ps.SectionId = s.SectionId  LEFT JOIN brand b ON jpmp.BrandId = b.BrandId LEFT JOIN finish f ON jpmp.FinishId = f.FinishId LEFT JOIN substrate st ON jpmp.SubstrateId = st.SubstrateId LEFT JOIN colour c ON jpmp.ColourId = c.ColourId LEFT JOIN materialtype mt ON jpmp.MaterialId = mt.MaterialTypeId WHERE jp.JobProductId = ?"

    connection.query(plQuery, [id], function (err, rows) {
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

//Post new room
exports.addroom = async (req, res) => {
    console.log("roomdata",req.body)
    var roomName = req.body.roomName
    if (typeof roomName !== 'undefined') {
        connection.query('INSERT INTO room (RoomName) VALUES (?)',
            [roomName],
            function (err, result) {
                if (!err) {
                    if (result.affectedRows != 0) {
                        res.send({
                            "code": 200,
                            "success": "Room Added",
                            response: result
                        });
                    }
                } else {
                    res.status(400).send(err);
                }
            });
    }
};

//GET rooms from the room table
exports.getrooms = async (req, res) => {
    connection.query('SELECT * FROM room', function (err, rows) {
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

//GET rooms by jobproductId from the room table
exports.getroomslist = async (req, res) => {
    var id = req.params.id;
    connection.query('SELECT room.RoomId, room.RoomName FROM jobproduct INNER JOIN room ON jobproduct.RoomId= room.RoomId where jobproduct.JobId=1 GROUP BY room.RoomId',[id],  function (err, rows) {
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

//GET rooms by jobproductId from the room table
exports.getproductsinroom = async (req, res) => {
    var id = req.params.id;
    connection.query('SELECT jp.JobProductId , p.ProductName, p.ProductId , jp.Width ,jp.Height, jp.Depth,jp.ToeRecess, jp.ToeHeight,jp.Elevation,jp.SoffitHeight ,d.DoorName ,h.HingeType,h.HingeId ,pc.Category ,s.ShelveName , jps.NoOfShelves ,hd.HardwareName FROM jobproduct jp LEFT JOIN product p ON jp.ProductId = p.ProductId LEFT JOIN jobproductdoor jpd ON jp.JobProductId = jpd.DoorId LEFT JOIN door d ON jpd.DoorId = d.DoorId LEFT JOIN jobproducthinge jph ON jp.JobProductId = jph.JobproductId LEFT JOIN hinge h ON jph.HingeId = h.HingeId LEFT JOIN productcategory pc ON p.ProductCategoryId = pc.ProductCategoryId LEFT JOIN jobproductshelve jps ON jp.JobProductId = jps.JobProductId LEFT JOIN shelve s ON jps.ShelveId = s.ShelveId LEFT JOIN jobproducthardware jphd ON jp.JobProductId = jphd.JobproductId LEFT JOIN hardware hd ON jphd.HardwareId = hd.HardwareId WHERE jp.JobId = ? AND jp.IsDeleted=0',[id],  function (err, rows) {
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

//GET jobList 
exports.getJobsList = async (req, res) => {
    connection.query('SELECT * FROM job  ORDER BY JobId DESC',  function (err, rows) {
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

//Delete product in room
exports.updateproductinroom= async(req,res)=>{
    console.log("id:::"+req.params.id)
    var id = req.params.id;
    var isDeleted = req.body.productKey
    console.log("isDeleted:::"+isDeleted)
    if (typeof isDeleted !== 'undefined') {
        connection.query('UPDATE jobproduct SET IsDeleted = ? WHERE JobProductId = ?',
            [isDeleted, id],
            function(err, result) {
                if (!err){
 
                    if (result.affectedRows != 0) {
                        res.status(200).send({
                            "success":"product updated"
                        });
                    } else {
                        res.status(400).send(err);
                    }
                }
            });
 
    }
};

//update job status
exports.updatejob = async (req, res) => {
    var id = req.params.id;
    var jobstatus = req.body.jobstatus
    var remark = req.body.remark
    console.log('api called', id, jobstatus, remark)
    connection.query('UPDATE job SET Status = ?  WHERE JobId = ?',
        [jobstatus, id],
        function (err, result) {
            if (!err) {
                if (result.affectedRows != 0) {
                    console.log("result",result)
                    addremark(remark,id)
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


//post remark
addremark = (remark, jobId) => {
    console.log(remark,jobId)
    var remark = remark
    var jobid=jobId
    connection.query('INSERT INTO remark(Remark, JobId) VALUES (?,?)',
        [remark, jobid],
        function (err, result) {
            if (!err) {
                if (result.affectedRows != 0) {
                   console.log("remark added")
                }
            } else {
                res.status(400).send(err);
            }
        })
};

//upload quotation
exports.addquotationupload = async (req, res) => {
    upload(req, res, function (err) {
        var fileName =  req.file ? req.file.filename : ""
        // local path
        // let exactPath = __dirname.split('Server/')[0]+'Server/public/quotations/'
        // FTP path
        let exactPath = __dirname.split('app/')[0]+'app/public/quotations/'
        let filePath = exactPath + fileName;
        console.log("filePath", filePath)
        var remark=req.body.remark;
        var jobid=req.body.jobId;
        let toMail = req.body.email;
        let name = req.body.name;
        var date=new Date();
        var status="Quotation Generated"
        console.log(req.body)
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        } else { 
            connection.query('INSERT INTO jobquotation(JobId,Remark, FilePath,UploadedDate,Status) VALUES (?,?,?,?,?)',
        [jobid,remark, filePath,date,status],
        function (err, result) {
            if (!err) {
                if (result.affectedRows != 0) {
                    updateJobStatus(jobid,status)
                    var options = {
                        auth: {
                            api_key: "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"
                        }
                    }
                    var smtpTransport = nodemailer.createTransport(sgTransport(options));
                    var mailOptions = {
                        to:"",
                        from:"basanth@stellentsoft.com",
                        subject: "Quotation - Flat Packs WA",
                        html: '<div>Good day <b>'+name+'</b>,<br/><div>Thank you for your interest in our solutions at <b>Flat Packs WA.</b></div><br/><div>Kindly find attached our quotation for the selected  products.</div><br/><div>Regards,</div><div>Flat Packs WA</div><br/>',
                        attachments: [
                            {   
                                path: filePath,
                                filename: fileName
                            },
                        ],
                    };
                    smtpTransport.sendMail(mailOptions, function (err) {
                        console.log("err is " + err);
                        res.send({
                            status: 'success',
                            "success": "true",
                            response: result
                        });
                    });
                }
            } else {
                res.status(400).send(err);
            }
        });
        }
    })
    
 };

 updateJobStatus = (jobId,status) => {
    var jobstatus = status
    var jobid=jobId
    connection.query('UPDATE job SET Status = ?  WHERE JobId = ?',
    [jobstatus, jobid],
        function (err, result) {
            if (!err) {
                if (result.affectedRows != 0) {
                   console.log("status updated")
                }
            } else {
                res.status(400).send(err);
            }
        })
 };

 // Creating a multer instance and setting the destination folder.
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // local dir
        // let dir = __dirname.split('Server/')[0]+'Server/public/quotations'
        // FTP dir
        let dir = __dirname.split('app/')[0]+'app/public/quotations'
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const newFilename = `${file.originalname}`;
        // const newFilename = (moment().format("DDMMYYYYhhmmss") + "-" + `${file.originalname}`;
        cb(null, newFilename);
    }
});

// Creating an upload instance and receive a single file
var upload = multer({ storage: storage }).single('file') // single file

//Resend quotation
exports.resendQuotation = async (req, res) => {
    let job = req.body.job;
    console.log('job::', job)
    let id = job.JobId;
    let to = job.Email;
    connection.query('SELECT * FROM jobquotation jq INNER JOIN job j ON jq.JobId=j.JobId WHERE jq.JobId= ?', [id], function (err, rows) {
        if (!err) {
            if (rows.length != 0) {
                // res.send(rows)
                let latestQuotation = rows.sort((a, b) => b.QuotationId - a.QuotationId)[0]
                console.log('latestQuotation', latestQuotation)
                let name = latestQuotation.ClientName ? latestQuotation.ClientName : ''
                let toMail = latestQuotation.Email
                let exactPath = latestQuotation.FilePath
                let fileName = exactPath.split('/public/quotations/')[1]
                var options = {
                    auth: {
                        api_key: "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"
                    }
                }
                var smtpTransport = nodemailer.createTransport(sgTransport(options));
                var mailOptions = {
                    to: toMail,
                    from:"basanth@stellentsoft.com",
                    subject: "Quotation - Flat Packs WA",
                    html: '<div>Good day <b>'+name+'</b>,<br/><div>Thank you for your interest in our solutions at <b>Flat Packs WA.</b></div><br/><div>Kindly find attached our quotation for the selected  products.</div><br/><div>Regards,</div><div>Flat Packs WA</div><br/>',
                    attachments: [
                        { 
                            path: exactPath,
                            filename: fileName
                        },
                    ],
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                        console.log("err is " + err);
                        res.send({ status: 'success' });
                });
            } else {
                console.log('no quotations found')
                res.send(rows)
            }
        }
        else {
            res.status(400).send(err);
        }
    });
};


//GET ProductStockCodes from the product category table
exports.getProductStockCodes = async (req, res) => {
    connection.query('SELECT * FROM ProductStockCode', function (err, rows) {
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