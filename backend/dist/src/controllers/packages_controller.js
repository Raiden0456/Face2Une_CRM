import package_p from "../models/packages_model.js";
// Retrieve packages from the database.
export function loadPack(req, res) {
    package_p.getAllpack(function (err, data) {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while retrieving packages.",
            });
        else if (data.length == 0) {
            res.status(404).json({
                success: false,
                message: "No packages found.",
            });
        }
        else {
            res.json({ success: true, data: data });
        }
    });
}
// Find a single package by an id
export function findOnePack(id, res) {
    package_p.getPackById(id, function (err, data) {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while retrieving package.",
            });
        else if (data.length == 0) {
            res.status(404).json({
                success: true,
                message: "package with id ".concat(id, " not found."),
            });
        }
        else {
            res.json({ success: true, data: data });
        }
    });
}
// Update a packages identified by the id in the request
export function updatePack(pack, res) {
    package_p.updatePackById(pack, function (err, data) {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while updating package_p.",
            });
        else if (data.length == 0) {
            res.status(404).json({
                success: true,
                message: "package with id ".concat(pack.id, " not found."),
            });
        }
        else {
            res.json({ success: true, data: data });
        }
    });
}
// Create a package
export function createPack(pack, res) {
    package_p.createPack(pack, function (err, data) {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while creating package.",
            });
        else {
            res.json({ success: true, data: data });
        }
    });
}
// Delete a packages with the specified id in the request
export function deletePack(id, res) {
    package_p.deletePackById(id, function (err, data) {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while deleting package.",
            });
        // else if (data == null) {
        //   res.status(404).json({
        //     success: false,
        //     message: `package_p with id ${id} not found.`
        //   });
        // }
        else {
            res.json({
                success: true,
                message: "deleted package with id: " + id + ", successfully!",
            });
        }
    });
}
// Buy packages //
export function buyPackages(client_id, packages, res) {
    package_p.buyPackages(client_id, packages, function (err, data) {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while buying packages.",
            });
        else {
            res.json({ success: true, data: data });
        }
    });
}
// Use packages //
export function usePackage(client_id, promocode, res) {
    package_p.usePackage(client_id, promocode, function (err, data) {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while using package.",
            });
        else {
            res.json({ success: true, data: data });
        }
    });
}
//# sourceMappingURL=packages_controller.js.map