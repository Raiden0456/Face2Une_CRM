// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";
import voucher_codes from "voucher-code-generator";

// Constructor
const coupon = function (coupon) {
  this.id = coupon.id;
  this.name = coupon.name;
  this.code = coupon.code;
  this.procedure_ids = coupon.procedure_ids;
  this.discount = coupon.discount;
  this.expiry_date = coupon.expiry_date;
};

coupon.getAllcoupon = async (result) => {
    let { data: coupons, error } = await supabase
      .from("coupons")
      .select("*")
      .order("created_at", { ascending: true });
  return result(error, coupons);
};

coupon.getCouponById = async (id: number, result) => {
  let { data: coupons, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("id", id);
  return result(error, coupons);
};

coupon.createCoupon = async (
  proc: {
    name: string;
    code: string;
    procedure_ids: number[];
    discount: number;
    expiry_date: Date;
  },
  result
) => {
  const { data, error } = await supabase
    .from("coupons")
    .insert([
      {
        name: proc.name,
        code: proc.code,
        procedure_ids: proc.procedure_ids,
        discount: proc.discount,
        expiry_date: proc.expiry_date,
      },
    ])
    .select();
  return result(error, data);
};

coupon.updateCouponById = async (
  proc: {
    id: number;
    name: string;
    code: string;
    procedure_ids: number[];
    discount: number;
    expiry_date: Date;
  },
  result
) => {
  const { data, error } = await supabase
    .from("coupons")
    .update([
      {
        name: proc.name,
        code: proc.code,
        procedure_ids: proc.procedure_ids,
        discount: proc.discount,
        expiry_date: proc.expiry_date,
      },
    ])
    .eq("id", proc.id)
    .select();
  return result(error, data);
};

coupon.deleteCouponById = async (id: number, result) => {
  const { data, error } = await supabase
    .from("coupons")
    .delete()
    .eq("id", id);
  return result(error, data);
};


export default coupon;
