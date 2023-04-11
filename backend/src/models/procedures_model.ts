// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";

// Constructor
const procedure = function (procedure) {
  this.id = procedure.id;
  this.name = procedure.name;
  this.description = procedure.description;
  this.price = procedure.price;
  this.duration = procedure.duration;
  this.additional = procedure.additional;
  this.saloon_ids = procedure.saloon_ids;
};

procedure.getAllproc = async (additional: number, saloon_id: number, result) => {
  const selectColumns = (saloon_id == 3) ? "id, name, description, price_gbp, duration, additional, saloon_ids" : "id, name, description, price, duration, additional, saloon_ids";

  switch (additional) {
    case 0: {
      let { data: procedures, error } = await supabase
        .from("procedures")
        .select(selectColumns)
        .eq("additional", 0)
        .contains("saloon_ids", [saloon_id])
        .order(saloon_id == 3 ? "price_gbp" : "price", { ascending: true });
      result(error, procedures);
      break;
    }
    case 1: {
      let { data: procedures, error } = await supabase
        .from("procedures")
        .select(selectColumns)
        .eq("additional", 1)
        .contains("saloon_ids", [saloon_id])
        .order(saloon_id == 3 ? "price_gbp" : "price", { ascending: true });
      result(error, procedures);
      break;
    }
    default: {
      let { data: procedures, error } = await supabase
        .from("procedures")
        .select(selectColumns)
        .contains("saloon_ids", [saloon_id])
        .order(saloon_id == 3 ? "price_gbp" : "price", { ascending: true });
      result(error, procedures);
      break;
    }
  }
  return result;
};


procedure.getProcById = async (id: number, result) => {
  let { data: procedures, error } = await supabase
    .from("procedures")
    .select("*")
    .eq("id", id);
  return result(error, procedures);
};

procedure.getTotalCost = async (proc_ids: number[], saloon_id: number, result) => {
  let total = 0;
  let selectColumn = (saloon_id == 3) ? "price_gbp" : "price";
  
  for (let i = 0; i < proc_ids.length; i++) {
    let resp: any = await supabase
      .from("procedures")
      .select(selectColumn)
      .eq("id", proc_ids[i]);
    
    if (resp.error) {
      return result(resp.error, null);
    }
    total += (resp.data[0].price) ? resp.data[0].price : resp.data[0].price_gbp;
  }
  return result(null, total);
};

procedure.createProc = async (
  proc: {
    name: string;
    description: string;
    price: number;
    price_gbp: number;
    duration: number;
    additional: number;
    saloon_ids: number[];
  },
  result
) => {
  const { data, error } = await supabase
    .from("procedures")
    .insert([
      {
        name: proc.name,
        description: proc.description,
        price: proc.price,
        price_gbp: proc.price_gbp,
        duration: proc.duration,
        additional: proc.additional,
        saloon_ids: proc.saloon_ids,
      },
    ])
    .select();
  return result(error, data);
};

procedure.updateProcById = async (
  proc: {
    id: number;
    name: string;
    description: string;
    price: number;
    price_gbp: number;
    duration: number;
    additional: number;
    saloon_ids: number[];
  },
  result
) => {
  const { data, error } = await supabase
    .from("procedures")
    .update([
      {
        name: proc.name,
        description: proc.description,
        price: proc.price,
        price_gbp: proc.price_gbp,
        duration: proc.duration,
        additional: proc.additional,
        saloon_ids: proc.saloon_ids,
      },
    ])
    .eq("id", proc.id)
    .select();
  return result(error, data);
};

procedure.deleteProcById = async (id: number, result) => {
  const { data, error } = await supabase
    .from("procedures")
    .delete()
    .eq("id", id);
  return result(error, data);
};

export default procedure;
