import Saloon from "../models/saloons_model.js";
import { join } from "path";

// Retrieve saloons from the database.
export async function loadSaloon(res) {
  try{
    const data = await Saloon.getAllSal();
    if (data.length === 0) {
      res.status(404).json({
        success: true,
        message: `No saloons found.`,
      });
    }
    else {
      res.json({ success: true, data: data });
    }
  } 
  catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.message || "Some error occurred while retrieving saloons.",
    });
  }
}

// Find a single saloon with an id
export async function findOneSaloon(id: number, res) {
  try{
    const data = await Saloon.getSalById(id);
    if (data.length === 0) {
      res.status(404).json({
        success: true,
        message: `saloon with id ${id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }

  }
  catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.message || "Some error occurred while retrieving saloon.",
    });
  }
}

// Create and Save a new saloon
export async function createSaloon(
  sal: {
    country: string;
    city: string;
    address: string;
    index: string;
    image_src: string;
  },
  res
) {
  try {
    const data = await Saloon.createSal(sal);
    res.json({ success: true, data: data });
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.message || "Some error occurred while creating the saloon.",
    });
  }
}
// Update a saloon identified by the id in the request
export async function updateSaloon(
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
  try {
    const data = await Saloon.updateSalById(sal);
    if (data.length === 0) {
      res.status(404).json({
        success: true,
        message: `Saloon with id ${sal.id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.message || "Some error occurred while updating saloon.",
    });
  }
}

// Delete a saloon with the specified id in the request
export async function deleteSaloon(id: number, res) {
  try {
    const data = await Saloon.deleteSalById(id);
    res.json({ success: true, message: `studio with id ${id} was deleted` });
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.message || "Some error occurred while deleting saloon.",
    });
  }
}
