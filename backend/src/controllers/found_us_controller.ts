import procedure from "../models/found_us_model.js";
import { join } from "path";

// Make a controller base on the model found_us_model.ts//
// Retrieve found_us from the database.
export function loadSources(res) {
  procedure.getAllSources((err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while retrieving sources.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `No sources found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Find a single source with an id
export function findOneSource(id: number, res) {
  procedure.getSourceById(id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while retrieving source.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `Source with id ${id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Update a source identified by the id in the request
export function updateSource(
  source: {
    id: number;
    source: string;
  },
  res
) {
  procedure.updateSourceById(source, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while updating source.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `Source with id ${source.id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Delete a source with the specified id in the request
export function deleteSource(id: number, res) {
  procedure.deleteSourceById(id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while deleting source.",
      });
    else {
      res.json({
        success: true,
        message: "deleted found us source with id: " + id + ", successfully!",
      });
    }
  });
}

// Create and Save a new source
export function createSource(
  source: {
    source: string;
  },
  res
) {
  procedure.createSource(source, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while creating source.",
      });
    else {
      res.json({ success: true, data: data });
    }
  });
}

// Add weight to a source identified by the id in the request
export function addWeight(id: number, res) {
  procedure.addWeight(id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while adding weight.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `Source with id ${id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}
