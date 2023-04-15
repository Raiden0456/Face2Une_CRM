import Coupon, { CouponData } from "../models/coupons_model.js";
import { Request, Response } from "express";


// Retrieve coupons from the database.
export async function loadCoupon(req: Request, res: Response){
  try {
    const { data, total } = await Coupon.getAllcoupon(req);
    res.json({ success: true, data, total });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Some error occurred while retrieving coupons.",
    });
  }
}

// Update a coupon identified by the id in the request
export async function updateCoupon(req: Request, res: Response) {
  try {
    const updatedCoupon = await Coupon.updateCouponById(req);
    res.json({ success: true, data: updatedCoupon });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Some error occurred while updating coupons.",
    });
  }
}

// Create a Coupon
export async function createCoupon(req: Request, res: Response) {
  try {
    const newCoupon = await Coupon.createCoupon(req);
    res.json({ success: true, data: newCoupon });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Some error occurred while creating coupon.",
    });
  }
}

// Delete a coupon with the specified id in the request
export async function deleteCoupon(req: Request, res: Response) {
  try {
    await Coupon.deleteCouponById(Number(req));
    res.json({
      success: true,
      message: "deleted coupon with id: " + req + ", successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Some error occurred while deleting coupon.",
    });
  }
}
