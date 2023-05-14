import client from "../models/clients_model.js";
import { buyPackages } from "./packages_controller.js";
import { buyCertificates } from "./certificates_controller.js";
import { join } from "path";

// Retrieve clients from the database with filter.
export async function loadClients(url_params, res) {
  try {
    const allData = await client.getClients(url_params);
    if (allData.data.length === 0) {
      res.status(404).json({
        success: true,
        message: `No clients found.`,
      });
    } else {
      res.json({ success: true, data: allData.data, total: allData.total });
    }
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.message || "Some error occurred while retrieving clients.",
    });
  }
}

// Update a client identified by the id in the request
export async function updateClient(
  _client: {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    user_id: number;
  },
  res
) {
  try {
    const data = await client.updateClientById(_client);
    if (data.length === 0) {
      res.status(404).json({
        success: true,
        message: `client with id ${_client.id} not found.`,
      });
    }
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.message || "Some error occurred while updating client.",
    });
  }
}

// Create a client
export async function createClient(
  _client: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    user_id: number;
  },
  res
) {
  try {
    const data = await client.createClient(_client);
    if (data.length === 0) {
      res.status(404).json({
        success: true,
        message: `client not created.`,
      });
    }
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.message || "Some error occurred while creating client.",
    });
  }
}

// Delete a client with the specified id in the request
export async function deleteClient(id: number, res) {
  try {
    const data = await client.deleteClientById(id);
    res.json({ success: true, message: "client deleted successfully!"});
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.message || "Some error occurred while deleting client.",
    });
  }
}
// manual order of client //

export function addOrder(
  client_id: number,
  email: string,
  package_id: number,
  certificate_id: number,
  saloon_id: number,
  res
) {
  try {
    if (package_id != null) {
      buyPackages(client_id, [{package_id: package_id, amount_bought: 1}], res);
    }
    else if (certificate_id != null) {
      buyCertificates(client_id, certificate_id, saloon_id, res);
    }
    else {
      res.status(500).json({
        success: false,
        message: "Package and certificate id is null.",
      });
    }
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.message || "Some error occurred while adding order.",
    });
  }
}