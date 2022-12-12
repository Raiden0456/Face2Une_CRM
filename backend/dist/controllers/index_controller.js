import procedure from "../models/index_model.js";
// Create and Save a new procedure
export function create(req, res) {
}
// Retrieve procedures from the database.
export function loadProc(add, res) {
    if (add === void 0) { add = 0; }
    //function from index_model to get procedures
    procedure.getAllproc(add, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving procedures."
            });
        else {
            res.json(data.rows);
        }
    });
}
// Find a single procedure with an id
export function findOne(id, req, res) {
    procedure.getProcById(id, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving procedure."
            });
        else {
            res.json(data.rows);
        }
    });
}
// Update a procedure identified by the id in the request
export function update(id, _name, desc, price, dur, add, req, res) {
    procedure.updateProcById(id, _name, desc, price, dur, add, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while updating procedure."
            });
        else {
            res.send(true);
        }
    });
}
// Delete a procedure with the specified id in the request
var _delete = function (id, req, res) {
    procedure.deleteProcById(id, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while deleting procedure."
            });
        else {
            res.send(true);
        }
    });
};
export { _delete as delete };
//# sourceMappingURL=index_controller.js.map