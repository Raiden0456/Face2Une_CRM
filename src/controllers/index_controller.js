const procedure = require("../models/index_model.js");
const path = require('path');
// Create and Save a new procedure
exports.create = (req, res) => {
  
};

// Retrieve all procedures from the database.
exports.findAll = (req, res) => {
  //function from index_model to get all procedures
    procedure.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else {
        //here data is array of procedures that we get from the database
        var main_procedures = [];
        var additional_procedures = [];
        data.forEach(element => {
          //where element.additional is false add to main_procedure array
          if(element.additional == false){
            main_procedures.push(element);
          }
          //where element.additional is true add to additional_procedure array
          else{
            additional_procedures.push(element);
          }
        });
        //render the index page with the data
        res.render(path.join('..', 'views', 'pages', 'index.ejs'), {main_procedures: main_procedures, additional_procedures: additional_procedures});
      }
    });
};

// Find a single procedure with a id
exports.findOne = (req, res) => {
  
};


// Update a procedure identified by the id in the request
exports.update = (req, res) => {
  
};

// Delete a procedure with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all procedure from the database.
exports.deleteAll = (req, res) => {
  
};
