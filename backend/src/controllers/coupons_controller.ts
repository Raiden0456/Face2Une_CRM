import coupons from "../models/coupons_model.js";
import { join } from "path";

// Retrieve coupons from the database.
export function loadCoupon(url_params, res) {
  coupons.getAllcoupon(url_params, (err, data, total) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while retrieving coupons.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: false,
        message: `No coupons found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Update a coupon identified by the id in the request
export function updateCoupon(
  coupon: {
    id: number;
    name: string;
    code: string;
    procedure_ids: number[];
    discount: number;
    expiry_date: Date;
  },
  res
) {
  coupons.updateCouponById(coupon, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while updating coupons.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `Coupon with id ${coupon.id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Create a Coupon
export function createCoupon(
  coupon: {
    name: string;
    code: string;
    procedure_ids: number[];
    discount: number;
    expiry_date: Date;
  },
  res
) {
  coupons.createCoupon(coupon, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while creating coupon.",
      });
    else {
      res.json({ success: true, data: data });
    }
  });
}

// Delete a coupon with the specified id in the request
export function deleteCoupon(id: number, res) {
  coupons.deleteCouponById(id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while deleting coupon.",
      });
    else {
      res.json({
        success: true,
        message: "deleted coupon with id: " + id + ", successfully!",
      });
    }
  });
}
