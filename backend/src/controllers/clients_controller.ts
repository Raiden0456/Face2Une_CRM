import client from "../models/clients_model.js";
import { join } from "path";

// Retrieve clients from the database with filter.
export function loadClients(url_params, res) {
  client.getClients(url_params, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while retrieving client.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `No clients found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Update a client identified by the id in the request
export function updateClient(
  _client: {
    id: number;
    full_name: string;
    phone: string;
    email: string;
    user_id: number;
  },
  res
) {
  client.updateClientById(_client, (err, data) => {
    if (err)
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while updating client.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `client with id ${_client.id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Create a client
export function createClient(
  _client: {
    full_name: string;
    phone: string;
    email: string;
    user_id: number;
  },
  res
) {
  client.createClient(_client, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while creating client.",
      });
    else {
      res.json({ success: true, data: data });
    }
  });
}

// Delete a client with the specified id in the request
export function deleteClient(id: number, res) {
  client.deleteClientById(id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while deleting client.",
      });
    // else if (data == null) {
    //   res.status(404).json({
    //     success: false,
    //     message: `client with id ${id} not found.`
    //   });
    // }
    else {
      res.json({
        success: true,
        message: "deleted client with id: " + id + ", successfully!",
      });
    }
  });
}
