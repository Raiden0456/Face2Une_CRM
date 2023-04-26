import Appointment from "../models/appointments_model.js";
import { getTotalCost } from "../utils/totalPrice_procs.js";
import { join } from "path";
// Retrieve appointments from the database.
export function loadAppoint(url_params, res) {
  Appointment.getAppointments(url_params, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while retrieving appointments.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `No appointments found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Update an appointment identified by the id in the request
export async function updateAppoint(
  appoint: {
    id: number;
    procedure_id: number;
    additional_ids: [];
    reservation_date_time: Date;
    client_id: number;
    total_price: any;
    total_price_gbp: any;
    saloon_id: number;
  },
  res
) {
  // Get total price of appointment and add it to appoint object //
  appoint.total_price = await getTotalCost([appoint.procedure_id, ...appoint.additional_ids], 1);
  appoint.total_price_gbp = await getTotalCost([appoint.procedure_id, ...appoint.additional_ids], 3);
  
  Appointment.updateAppointById(appoint, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while updating appointment.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `appointment with id ${appoint.id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Create an appointment //
export async function createAppoint(
  appoint: {
    procedure_id: number;
    additional_ids: [];
    reservation_date_time: Date;
    client_id: number;
    total_price: any;
    total_price_gbp: any;
    saloon_id: number;
    new_client: boolean;
  },
  res
) {
  // Get total price of appointment and add it to appoint object //
  appoint.total_price = await getTotalCost([appoint.procedure_id, ...appoint.additional_ids], 1);
  appoint.total_price_gbp = await getTotalCost([appoint.procedure_id, ...appoint.additional_ids], 3);
  Appointment.createAppoint(appoint, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while creating appointment.",
      });
    else {
      res.json({ success: true, data: data });
    }
  });
}

// Delete an appointment with the specified id in the request
export function deleteAppoint(id: number, res) {
  Appointment.deleteAppointById(id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while deleting appointment.",
      });
    // else if (data == null) {
    //   res.status(404).json({
    //     success: false,
    //    message: `appointment with id ${id} not found.`
    //   });
    // }
    else {
      res.json({
        success: true,
        message: "deleted appointment with id: " + id + ", successfully!",
      });
    }
  });
}
