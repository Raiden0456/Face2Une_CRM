import appointment from "../models/appointments_model.js";
import { join } from 'path';

// Retrieve appointments from the database.
export function loadAppoint(res) {
    appointment.getAllappoint((err, data) => {
      if (err)
        res.status(500).json({
          success: false, 
          message: err.message || "Some error occurred while retrieving appointments."
        });
      else if (data.length == 0) {
        res.status(404).json({
          success: false, 
          message: `No appointments found.`
        });
      }
      else {
        res.json({success: true, data: data});
      }
    });
}

// Find a single appointment with an id
export function findOneAppoint(id: number, res) {
  appointment.getAppointById(id, (err, data) => {
    if (err)
      res.status(500).json({
          success: false, 
          message: err.message || "Some error occurred while retrieving appointment."
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true, 
        message: `appointment with id ${id} not found.`
      });
    }
    else {
      res.json({success: true, data: data});
    }
  });
}

// Find all appointments by client_id
export function findAppointsByClient_id(id: number, res) {
  appointment.getAppointsByClient_Id(id, (err, data) => {
    if (err)
      res.status(500).json({
          success: false, 
          message: err.message || "Some error occurred while retrieving appointment."
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true, 
        message: `appointments with client_id ${id} not found.`
      });
    }
    else {
      res.json({success: true, data: data});
    }
  });
}


// Update an appointment identified by the id in the request
export function updateAppoint(
  appoint: 
  {
    id: number,
    procedure_id: number, 
    additional_ids: [], 
    reservation_date: string, 
    reservation_time: string, 
    client_id: number,
    master_id: number,
    total_price: number,
    saloon_name: string, 
  }, res) {
  appointment.updateAppointById(appoint, (err, data) => {
    if (err)
      res.status(500).json({
        success: false, 
        message: err.message || "Some error occurred while updating appointment."
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true, 
        message: `appointment with id ${appoint.id} not found.`
      });
    }
    else {
      res.json({success: true, data: data});
    }
  });
}

// Create an appointment 
export function createAppoint(
  appoint: 
  {
    procedure_id: number, 
    additional_ids: [], 
    reservation_date: string, 
    reservation_time: string, 
    client_id: number,
    master_id: number,
    total_price: number,
    saloon_name: string, 
  }, res) {
  appointment.createAppoint(appoint, (err, data) => {
    if (err)
      res.status(500).json({
        success: false, 
        message: err.message || "Some error occurred while creating appointment."
      });
    else {
      res.json({success: true, data: data});
    }
  });
}

// Delete an appointment with the specified id in the request
export function deleteAppoint(id: number, res) {
  appointment.deleteAppointById(id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false, 
        message: err.message || "Some error occurred while deleting appointment."      
      });
    // else if (data == null) {
    //   res.status(404).json({
    //     success: false, 
    //     message: `appointment with id ${id} not found.`
    //   });
    // }
    else {
      res.json({success: true, message: "deleted appointment with id: "+ id +", successfully!"});
    }
  });
};
