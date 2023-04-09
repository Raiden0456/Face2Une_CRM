import certificate from "../models/certificates_model.js";
import { join } from "path";

// Retrieve certificates from the database.
export function loadCert(saloon_id: number, res) {
  certificate.getAllcert(saloon_id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while retrieving certificates.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `No certificates found.`,
      });
    } else {
      // Change price_gbp to price if applicable //
      data = data.map((item) => {
        if (item.price_gbp) {
          const { price_gbp, ...otherProps } = item;
          return { price: price_gbp, ...otherProps };
        }
        return item;
      });
      data = data.filter((item) => {
        if(item.price_gbp !== null && item.price !== null)
          return item;
      });
           
      res.json({ success: true, data: data });
    }
  });
}
// Find a single certificate by an id
export function findOneCert(id: number, res) {
  certificate.getCertById(id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while retrieving certificate.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `certificate with id ${id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Update a certificates identified by the id in the request
export function updateCert(
  cert: {
    id: number;
    name: string;
    price: number;
    price_gbp: number;
  },
  res
) {
  certificate.updateCertById(cert, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while updating certificate.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `certificate with id ${cert.id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Create a certificate
export function createCert(
  cert: {
    name: string;
    price: number;
    price_gbp: number;
  },
  res
) {
  certificate.createCert(cert, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while creating certificate.",
      });
    else {
      res.json({ success: true, data: data });
    }
  });
}

// Delete a certificates with the specified id in the request
export function deleteCert(id: number, res) {
  certificate.deleteCertById(id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while deleting certificate.",
      });
    else {
      res.json({
        success: true,
        message: "deleted certificate with id: " + id + ", successfully!",
      });
    }
  });
}
// Buy certificates //
export function buyCertages(
  client_id: number,
  certificate_id: number,
  res
) {
  certificate.buyCertificate(
    client_id,
    certificate_id,
    (err, data) => {
      if (err)
        res.status(500).json({
          success: false,
          message:
            err.message || "Some error occurred while buying certificate.",
        });
      else {
        //TODO: send email to client with promocode //
        res.json({ success: true, data: data });
      }
    }
  );
}
