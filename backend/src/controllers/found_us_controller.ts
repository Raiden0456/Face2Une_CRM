import Source from "../models/found_us_model.js";

// Retrieve found_us from the database.
export async function loadSources(res) {
  try {
    const data = await Source.getAllSources();
    if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `No sources found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while retrieving sources.",
    });
  }
}

// Find a single source with an id
export async function findOneSource(id: number, res) {
  try {
    const data = await Source.getSourceById(id);
    if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `Source with id ${id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while retrieving source.",
    });
  }
}

// Update a source identified by the id in the request
export async function updateSource(source: {id: number, source: string}, res) {
  try {
    const data = await Source.updateSourceById(source.id, source.source);
    if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `Source with id ${source.id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while updating source.",
    });
  }
}

// Delete a source with the specified id in the request
export async function deleteSource(id: number, res) {
  try {
    await Source.deleteSourceById(id);
    res.json({
      success: true,
      message: "deleted found us source with id: " + id + ", successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while deleting source.",
    });
  }
}

// Create and Save a new source
export async function createSource(source: {id: number, source: string}, res) {
  try {
    const data = await Source.createSource(source.source);
    res.json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while creating source.",
    });
  }
}

// Add weight to a source identified by the id in the request
export async function addWeight(sourceid: {id: number}, res) {
  try {
    const data = await Source.addWeight(sourceid);
    if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `Source with id ${sourceid.id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while adding weight.",
    });
  }
}
