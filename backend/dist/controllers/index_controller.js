import procedure from "../models/index_model.js";
// Create and Save a new procedure
export function create(req, res) {
}
// Retrieve all procedures from the database.
export function loadAllproc(req, res) {
    //function from index_model to get all procedures
    procedure.getAll(function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        else {
            //here data is array of procedures that we get from the database
            // var main_procedures = [];
            // var additional_procedures = [];
            // data.forEach(element => {
            //   //where element.additional is false add to main_procedure array
            //   if(element.additional == false){
            //     main_procedures.push(element);
            //   }
            //   //where element.additional is true add to additional_procedure array
            //   else{
            //     additional_procedures.push(element);
            //   }
            // });
            //render the index page with the data
            res.send(data.rows);
        }
    });
}
// Find a single procedure with a id
export function findOne(req, res) {
}
// Update a procedure identified by the id in the request
export function update(req, res) {
}
// Delete a procedure with the specified id in the request
var _delete = function (req, res) {
};
export { _delete as delete };
// Delete all procedure from the database.
export function deleteAll(req, res) {
}
//# sourceMappingURL=index_controller.js.map