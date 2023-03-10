import promocodes from "../models/promocodes_model.js";
import { join } from "path";

// Retrieve promocodes from the database.
export function loadPromo(req, res) {
  promocodes.getAllpromo((err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while retrieving promocodes.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: false,
        message: `No promocodes found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}
// Find a single promocode by an id
export function findOnePromo(id: number, res) {
  promocodes.getPromoById(id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while retrieving promocode.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `Promocode with id ${id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Update a promocodes identified by the id in the request
export function updatePromo(
  promo: {
    id: number;
    name: string;
    code: string;
    procedure_ids: [number];
    discount: number;
    expiry_date: Date;
  },
  res
) {
  promocodes.updatePromoById(promo, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while updating promocodes.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `Promocode with id ${promo.id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Create a Promoage
export function createPromo(
  promo: {
    name: string;
    code: string;
    procedure_ids: [number];
    discount: number;
    expiry_date: Date;
  },
  res
) {
  promocodes.createPromo(promo, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while creating promocode.",
      });
    else {
      res.json({ success: true, data: data });
    }
  });
}

// Delete a promocodes with the specified id in the request
export function deletePromo(id: number, res) {
  promocodes.deletePromoById(id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while deleting promocode.",
      });
    else {
      res.json({
        success: true,
        message: "deleted promocode with id: " + id + ", successfully!",
      });
    }
  });
}
