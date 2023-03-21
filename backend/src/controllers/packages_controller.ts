import package_p from "../models/packages_model.js";
import { join } from "path";

// Retrieve packages from the database.
export function loadPack(req, res) {
  package_p.getAllpack((err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while retrieving packages.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `No packages found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}
// Find a single package by an id
export function findOnePack(id: number, res) {
  package_p.getPackById(id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while retrieving package.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `package with id ${id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Update a packages identified by the id in the request
export function updatePack(
  pack: {
    id: number;
    name: string;
    procedure_id: number;
    price: number;
    amount: number;
  },
  res
) {
  package_p.updatePackById(pack, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while updating package_p.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `package with id ${pack.id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Create a package
export function createPack(
  pack: {
    name: string;
    procedure_id: number;
    price: number;
    amount: number;
  },
  res
) {
  package_p.createPack(pack, (err, data) => {
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
export function deletePack(id: number, res) {
  package_p.deletePackById(id, (err, data) => {
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
  export function buyPackages(
    client_id: number,
    packages: [{
      package_id: number;
      amount_bought: number;
    }],
    res
  ) {
    package_p.buyPackages(client_id, packages, (err, data) => {
      if (err)
        res.status(500).json({
          success: false,
          message: err.message || "Some error occurred while buying packages.",
        });
      else {
        //TODO: send email to client with promocodes //
        res.json({ success: true, data: data });
      }
    });
}