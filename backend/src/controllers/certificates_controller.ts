import Certificate from "../models/certificates_model.js";
import { join } from "path";

// Retrieve certificates from the database.
export async function loadCert(saloon_id: number, res) {
  try {
    const data = await Certificate.getAllcert(saloon_id);
    if (data.length === 0) {
      res.status(404).json({
        success: true,
        message: `No certificates found.`,
      });
    } else {
      const certificates = data
        .map((item: { id: any; name: any; price?: any; price_gbp?: any }) => {
          if (item.price_gbp) {
            const { price_gbp, ...otherProps } = item;
            return { price: price_gbp, ...otherProps };
          }
          return item;
        })
        .filter((item) => {
          if (item.price_gbp !== null && item.price !== null) return item;
        });
      res.json({ success: true, data: certificates });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.message || "Some error occurred while retrieving certificates.",
    });
  }
}
// Find a single certificate by an id
export async function findOneCert(id: number, res) {
  try {
    const data = await Certificate.getCertById(id);
    if (data.length === 0) {
      res.status(404).json({
        success: true,
        message: `certificate with id ${id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.message || "Some error occurred while retrieving certificate.",
    });
  }
}

// Update a certificates identified by the id in the request
export async function updateCert(
  cert: {
    id: number;
    name: string;
    price: number;
    price_gbp: number;
  },
  res
) {
  try {
    const data = await Certificate.updateCertById(cert);
    if (data.length === 0) {
      res.status(404).json({
        success: true,
        message: `certificate with id ${cert.id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while updating certificate.",
    });
  }
}

// Create a certificate
export async function createCert(
  cert: {
    name: string;
    price: number;
    price_gbp: number;
  },
  res
) {
  try {
    const data = await Certificate.createCert(cert);
    res.json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while creating certificate.",
    });
  }
}

// Delete a certificates with the specified id in the request
export async function deleteCert(id: number, res) {
  try {
    const data = await Certificate.deleteCertById(id);
    res.json({
      success: true,
      message: "deleted certificate with id: " + id + ", successfully!",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while deleting certificate.",
    });
  }
}
// Buy certificates //
export async function buyCertificates(
  client_id: number,
  certificate_id: number,
  saloon_id: number,
  res
) {
  try {
    const data = await Certificate.buyCertificate(
      client_id,
      certificate_id,
      saloon_id
    );
    if (data.length === 0) {
      res.status(404).json({
        success: true,
        message: `certificate with id ${certificate_id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while buying certificate.",
    });
  }
}
