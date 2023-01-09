import procedure from "../models/procedures_model.js";
import { join } from "path";

// Retrieve procedures from the database.
export function loadProc(add = 0, res) {
  procedure.getAllproc(add, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while retrieving procedures.",
      });
    else if (data.length == 0) {
      switch (add) {
        case 0:
          res.status(404).json({
            success: false,
            message: `No main procedures found.`,
          });
          break;
        case 1:
          res.status(404).json({
            success: true,
            message: `No additional procedures found.`,
          });
          break;
      }
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Find a single procedure with an id
export function findOneProc(id: number, res) {
  procedure.getProcById(id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while retrieving procedure.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `Procedure with id ${id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Update a procedure identified by the id in the request
export function updateProc(
  proc: {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    additional: number;
  },
  res
) {
  procedure.updateProcById(proc, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while updating procedure.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `Procedure with id ${proc.id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Create a procedure
export function createProc(
  proc: {
    name: string;
    description: string;
    price: number;
    duration: number;
    additional: number;
  },
  res
) {
  procedure.createProc(proc, (err, data) => {
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
export function deleteProc(id: number, res) {
  procedure.deleteProcById(id, (err, data) => {
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
