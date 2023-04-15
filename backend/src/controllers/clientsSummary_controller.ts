import clientSum from "../models/clientsSummary_model.js";

// Retrieve clients from the database with filter.

export function loadSummary(url_params, res) {
  clientSum.getSum(url_params, (err, data, total) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while retrieving client.",
      });
    else if (data.length == 0) {
      res.status(200).json({
        success: true,
        message: `No clients found.`,
      });
    } else {
      res.json({ success: true, total: total, data: data });
    }
  });
}
