import procedure from "../models/procedures_model.js";
// Retrieve procedures from the database.
export function loadProc(add, res) {
    if (add === void 0) { add = 0; }
    procedure.getAllproc(add, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving procedures."
            });
        else if (data.length != 0) {
            res.json({ success: true, data: data });
        }
        else {
            res.json({ success: false, data: data });
        }
    });
}
// Find a single procedure with an id
export function findOneProc(id, res) {
    procedure.getProcById(id, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving procedure."
            });
        else if (data.length != 0) {
            res.json({ success: true, data: data });
        }
        else {
            res.json({ success: false, data: data });
        }
    });
}
// Update a procedure identified by the id in the request
export function updateProc(proc, res) {
    procedure.updateProcById(proc, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while updating procedure."
            });
        else {
            res.json({ success: true, data: data });
        }
    });
}
// Create a procedure 
export function createProc(proc, res) {
    procedure.createProc(proc, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating procedure."
            });
        else {
            res.json({ success: true, data: data });
        }
    });
}
// Delete a procedure with the specified id in the request
export function deleteProc(id, res) {
    procedure.deleteProcById(id, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while deleting procedure."
            });
        else {
            res.json({ success: true, data: id });
        }
    });
}
;
//# sourceMappingURL=procedures_controller.js.map