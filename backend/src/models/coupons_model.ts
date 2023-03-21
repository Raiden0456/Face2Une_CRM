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

// coupon.getAllcoupon = async (result) => {
//     let { data: coupons, error } = await supabase
//       .from("coupons")
//       .select("*")
//       .order("created_at", { ascending: true });
//   return result(error, coupons);
// };
coupon.getAllcoupon = async (
  params: {
    index: number;
    per_page: number;
    filter_like: string;
    column: string;
    value: any;
  },
  result
) => {
  // set default values //
  var resp;
  let total;
  let start_from = 0;
  let to = 100;
  //******//

  // Pagination set where index = page number and per_page = max amount of entries per page //
  if (params.index && params.per_page) {
    start_from = (params.index - 1) * params.per_page;
    to = Number(start_from) + Number(params.per_page) - 1;
  }
  //******//

  if (params.filter_like) {
    resp = await supabase
      .from("coupons")
      .select("*")
      .or(
        "name.ilike.%" +
          params.filter_like +
          "%, code.ilike.%" +
          params.filter_like +
          "%"
      )
      .range(start_from, to);
    // Add procedure name to the response //
    for (let i = 0; i < resp.data.length; i++) {
      let { data: procedures, error } = await supabase
        .from("procedures")
        .select("name")
        .in("id", resp.data[i].procedure_ids);
      resp.data[i].procedure_names = procedures.map((p) => p.name);
    }
    //******//

    total = await supabase
      .from("coupons")
      .select("id")
      .or(
        "name.ilike.%" +
          params.filter_like +
          "%, code.ilike.%" +
          params.filter_like +
          "%"
      );
  } else {
    if ((params.column && !params.value) || (!params.column && params.value))
      return result(null, [], 0);

    resp = params.value
      ? await supabase
          .from("coupons")
          .select("*")
          .eq(params.column, params.value)
          .range(start_from, to)
      : await supabase.from("coupons").select("*").range(start_from, to);
    // Add procedure name to the response //
    for (let i = 0; i < resp.data.length; i++) {
      let { data: procedures, error } = await supabase
        .from("procedures")
        .select("name")
        .in("id", resp.data[i].procedure_ids);
      resp.data[i].procedure_names = procedures.map((p) => p.name);
    }
    //******//

    total = params.value
      ? await supabase
          .from("coupons")
          .select("id")
          .eq(params.column, params.value)
      : await supabase.from("coupons").select("id");
  }
  return result(resp.error, resp.data, total.data.length);
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
  const { data, error } = await supabase.from("coupons").delete().eq("id", id);
  return result(error, data);
};

export default coupon;
