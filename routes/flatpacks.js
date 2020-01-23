
const express = require('express');
const router = express.Router();

const jobController = require('../controllers/jobController');
const userController = require('../controllers/userController');
const customerController = require('../controllers/customerController');
const { catchErrors } = require('../errorhandlers');

router.get('/getproductbyId/:id', catchErrors(jobController.getproductbyId));
router.get('/getproducts/:id', catchErrors(jobController.getproducts));
router.get('/getcategory', catchErrors(jobController.getcategory));
router.get('/getsubcategory/:id', catchErrors(jobController.getsubcategory));
router.get('/getmaterial/:id', catchErrors(jobController.getmaterial));
router.get('/getmaterialtype', catchErrors(jobController.getmaterialtype));
router.get('/getdoorstyle', catchErrors(jobController.getdoorstyle));
router.get('/getdoorhinge', catchErrors(jobController.getdoorhinge));
router.get('/getshelves', catchErrors(jobController.getshelves));
router.get('/getbrand', catchErrors(jobController.getbrand));
router.get('/gethardware', catchErrors(jobController.gethardware));
router.get('/getcolour/:id', catchErrors(jobController.getcolour));
router.get('/getfinish/:id', catchErrors(jobController.getfinish));
router.get('/getroomslist/:id', catchErrors(jobController.getroomslist));
router.get('/getproductsinroom/:id', catchErrors(jobController.getproductsinroom));
router.get('/getsubstrate', catchErrors(jobController.getsubstrate));
router.get('/getrooms', catchErrors(jobController.getrooms));
router.get('/getstockcodes', catchErrors(jobController.getProductStockCodes));
router.post('/addJob', catchErrors(jobController.addJob));
router.post('/addroom', catchErrors(jobController.addroom));
router.post('/addjobproduct', catchErrors(jobController.addjobproduct));
router.get('/getProductListOfSelectedJob/:id', catchErrors(jobController.getProductListOfSelectedJob));
router.get('/getMaterialListOfSelectedProduct/:id', catchErrors(jobController.getMaterialListOfSelectedProduct));
router.post('/updateproductinroom/:id', catchErrors(jobController.updateproductinroom));
router.post('/geteditproduct', catchErrors(jobController.geteditproduct));

router.get('/getjoblist', catchErrors(jobController.getJobsList));
router.get('/getcustomerjob/:id', catchErrors(jobController.getCustomerJob));

router.get('/getJobProducts/:id', catchErrors(jobController.getJobProducts));

router.get('/getJobMaterials/:id', catchErrors(jobController.getJobProducts));
router.get('/getJobDoors/:id', catchErrors(jobController.getJobDoors));
router.get('/getJobHinges/:id', catchErrors(jobController.getJobHinges));
router.get('/getJobShelves/:id', catchErrors(jobController.getJobShelves));
router.get('/getJobHardwares/:id', catchErrors(jobController.getJobHardwares));

router.post('/updateJobProduct', catchErrors(jobController.updateJobProduct));

router.post('/updatejob/:id', catchErrors(jobController.updatejob));
router.post('/addquotationupload', catchErrors(jobController.addquotationupload));
router.post('/resendquotation', catchErrors(jobController.resendQuotation));
router.get('/getgst', catchErrors(jobController.getgst));
router.get('/getallsubcategories', catchErrors(jobController.getAllSubCategories));
router.get('/getallproducts', catchErrors(jobController.getAllProducts));
router.get('/getusers', catchErrors(userController.getusers));
router.get('/getuser/:id', catchErrors(userController.getuserbyId));
router.post('/adduser', catchErrors(userController.addUser));
router.post('/updateuser', catchErrors(userController.updateUser));
router.get('/getuserbyemail/:email', catchErrors(userController.getUserbyEmail));
router.post('/userlogin', catchErrors(userController.userLogin));
router.post('/changepassword', catchErrors(userController.userChangePassword));

router.post('/login', catchErrors(customerController.login));
router.post('/register', catchErrors(customerController.register));
router.post('/getcustomer', catchErrors(customerController.getCustomer));
router.post('/updatecustomer', catchErrors(userController.updateCustomer));

module.exports = router;


