import procedure from "../models/procedures_model.js";
// Retrieve procedures from the database.
export function loadProc(add, res) {
    if (add === void 0) { add = 0; }
    procedure.getAllproc(add, function (err, data) {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while retrieving procedures.",
            });
        else if (data.length == 0) {
            switch (add) {
                case 0:
                    res.status(404).json({
                        success: false,
                        message: "No main procedures found.",
                    });
                    break;
                case 1:
                    res.status(404).json({
                        success: true,
                        message: "No additional procedures found.",
                    });
                    break;
            }
        }
        else {
            res.json({ success: true, data: data });
        }
    });
}
// Get total cost of procedures by array of their ids
export function totalCost(proc_ids, res) {
    procedure.getTotalCost(proc_ids, function (data) {
        // if (err)
        //   res.status(500).json({
        //     success: false,
        //     message:
        //       err.message || "Some error occurred while counting total cost.",
        //   });
        // else {
        res.json({ success: true, data: data });
        // }
    });
}
// Find a single procedure with an id
export function findOneProc(id, res) {
    procedure.getProcById(id, function (err, data) {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while retrieving procedure.",
            });
        else if (data.length == 0) {
            res.status(404).json({
                success: true,
                message: "Procedure with id ".concat(id, " not found."),
            });
        }
        else {
            res.json({ success: true, data: data });
        }
    });
}
// Update a procedure identified by the id in the request
export function updateProc(proc, res) {
    procedure.updateProcById(proc, function (err, data) {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while updating procedure.",
            });
        else if (data.length == 0) {
            res.status(404).json({
                success: true,
                message: "Procedure with id ".concat(proc.id, " not found."),
            });
        }
        else {
            res.json({ success: true, data: data });
        }
    });
}
// Create a procedure
export function createProc(proc, res) {
    procedure.createProc(proc, function (err, data) {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while creating procedure.",
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
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while deleting procedure.",
            });
        // else if (data == null) {
        //   res.status(404).json({
        //     success: false,
        //     message: `Procedure with id ${id} not found.`
        //   });
        // }
        else {
            res.json({
                success: true,
                message: "deleted procedure with id: " + id + ", successfully!",
            });
        }
    });
}
//# sourceMappingURL=procedures_controller.js.map