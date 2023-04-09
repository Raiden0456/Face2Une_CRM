import saloon from "../models/saloons_model.js";
import { join } from "path";

// Retrieve saloons from the database.
export function loadSaloon(res) {
  saloon.getAllSal((err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while retrieving saloons.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `No saloons found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Find a single saloon with an id
export function findOneSaloon(id: number, res) {
  saloon.getSalById(id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while retrieving saloon.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `No saloon found with id ${id}.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Create and Save a new saloon
export function createSaloon(
  sal: {
    country: string;
    city: string;
    address: string;
    index: string;
    image_src: string;
  },
  res
) {
  saloon.createSal(sal, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while creating the saloon.",
      });
    else res.json({ success: true, data: data });
  });
}

// Update a saloon identified by the id in the request
export function updateSaloon(
    sal: {
        id: number;
        country: string;
        city: string;
        address: string;
        index: string;
        image_src: string;
    },
    res
) {
    saloon.updateSalById(sal, (err, data) => {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while updating saloon.",
            });
        else if (data.length == 0) {
            res.status(404).json({
                success: true,
                message: `Saloon with id ${sal.id} not found.`,
            });
        } else {
            res.json({success: true, data: data});
        }
    });
}

// Delete a saloon with the specified id in the request
export function deleteSaloon(id: number, res) {
    saloon.deleteSalById(id, (err, data) => {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while deleting saloon.",
            });
        else if (data.length == 0) {
            res.status(404).json({
                success: true,
                message: `Saloon with id ${id} not found.`,
            });
        } else {
            res.json({success: true, data: data});
        }
    });
}
