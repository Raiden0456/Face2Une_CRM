var express = require('express');
var router = express.Router();

const index_controller = require('../controllers/index_controller');

//Routing for the home page//

//Retrieve all procedures
//get a function return and then render with the data
router.get('/', function(req, res){
    index_controller.findAll(req, res);
});
 // Create a new Tutorial
 //router.post("/", procedure.create);

module.exports = router;
