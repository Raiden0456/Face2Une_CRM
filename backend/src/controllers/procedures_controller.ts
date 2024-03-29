import Procedure from "../models/procedures_model.js";
import { join } from "path";

// Retrieve procedures from the database.
export function loadProc(add = 0, saloon_id, res) {
  Procedure.getAllproc(add, saloon_id, (err, data) => {
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
            success: true,
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
      // Change price_gbp to price if applicable //
      data = data.map((item) => {
        if (item.price_gbp) {
          const { price_gbp, ...otherProps } = item;
          return { price: price_gbp, ...otherProps };
        }
        return item;
      });      
      res.json({ success: true, data: data });
    }
  });
}

// Get total cost of procedures by array of their ids
export function totalCost(proc_ids: number[], saloon_id: number, res) {
  if (!saloon_id) saloon_id = 1;
  Procedure.getTotalCost(proc_ids, saloon_id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while counting total cost.",
      });
    else {
    res.json({ success: true, data: data });
    }
  });
}

// Find a single procedure with an id
export function findOneProc(id: number, res) {
  Procedure.getProcById(id, (err, data) => {
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
    price_gbp: number;
    duration: number;
    additional: number;
    saloon_ids: number[];
  },
  res
) {
  Procedure.updateProcById(proc, (err, data) => {
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
    price_gbp: number;
    duration: number;
    additional: number;
    saloon_ids: number[];
  },
  res
) {
  Procedure.createProc(proc, (err, data) => {
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
  Procedure.deleteProcById(id, (err, data) => {
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
