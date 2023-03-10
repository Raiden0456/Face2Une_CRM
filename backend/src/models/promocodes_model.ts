// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";
import voucher_codes from "voucher-code-generator";

// Constructor
const promocode = function (promocode) {
  this.id = promocode.id;
  this.name = promocode.name;
  this.code = promocode.code;
  this.procedure_ids = promocode.procedure_ids;
  this.discount = promocode.discount;
  this.expiry_date = promocode.expiry_date;
};

promocode.getAllpromo = async (result) => {
    let { data: promocodes, error } = await supabase
      .from("promocodes")
      .select("*")
      .order("created_at", { ascending: true });
  return result(error, promocodes);
};

promocode.getPromoById = async (id: number, result) => {
  let { data: promocodes, error } = await supabase
    .from("promocodes")
    .select("*")
    .eq("id", id);
  return result(error, promocodes);
};

promocode.createPromo = async (
  proc: {
    name: string;
    code: string;
    procedure_ids: [number];
    discount: number;
    expiry_date: Date;
  },
  result
) => {
  const { data, error } = await supabase
    .from("promocodes")
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

promocode.updatePromoById = async (
  proc: {
    id: number;
    name: string;
    code: string;
    procedure_ids: [number];
    discount: number;
    expiry_date: Date;
  },
  result
) => {
  const { data, error } = await supabase
    .from("promocodes")
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

promocode.deletePromoById = async (id: number, result) => {
  const { data, error } = await supabase
    .from("promocodes")
    .delete()
    .eq("id", id);
  return result(error, data);
};


export default promocode;
