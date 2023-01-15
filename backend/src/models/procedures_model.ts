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
};

procedure.getAllproc = async (additional: number, result) => {
  switch (additional) {
    case 0: {
      let { data: procedures, error } = await supabase
        .from("procedures")
        .select("*")
        .eq("additional", 0)
        .order("price", { ascending: true });
      result(error, procedures);
      break;
    }
    case 1: {
      let { data: procedures, error } = await supabase
        .from("procedures")
        .select("*")
        .eq("additional", 1)
        .order("price", { ascending: true });
      result(error, procedures);
      break;
    }
    default: {
      let { data: procedures, error } = await supabase
        .from("procedures")
        .select("*")
        .order("price", { ascending: true });
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

procedure.createProc = async (
  proc: {
    name: string;
    description: string;
    price: number;
    duration: number;
    additional: number;
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
        duration: proc.duration,
        additional: proc.additional,
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
    duration: number;
    additional: number;
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
        duration: proc.duration,
        additional: proc.additional,
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
