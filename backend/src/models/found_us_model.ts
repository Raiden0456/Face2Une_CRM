// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";

// Constructor
const source = function (source) {
  this.id = source.id;
  this.source = source.source;
  this.weight = source.weight;
};

source.getAllSources = async (result) => {
    let { data: sources, error } = await supabase
      .from("found_us")
      .select("id, source")
    result(error, sources);
  return result;
};

source.getSourceById = async (id: number, result) => {
  let { data: sources, error } = await supabase
    .from("found_us")
    .select("*")
    .eq("id", id);
  return result(error, sources);
};

source.createSource = async (
  proc: {
    source: string;
  },
  result
) => {
  const { data, error } = await supabase
    .from("found_us")
    .insert([
      {
        source: proc.source,
      },
    ])
    .select();
  return result(error, data);
};

source.updateSourceById = async (
  proc: {
    id: number;
    source: string;
  },
  result
) => {
  const { data, error } = await supabase
    .from("found_us")
    .update([
      {
        source: proc.source,
      },
    ])
    .eq("id", proc.id)
    .select();
  return result(error, data);
};

source.deleteSourceById = async (id: number, result) => {
  const { data, error } = await supabase
    .from("found_us")
    .delete()
    .eq("id", id);
  return result(error, data);
};

source.addWeight = async (sourceid: { id: number }, result) => {
  let { data: source } = await supabase
    .from("found_us")
    .select("weight")
    .eq("id", sourceid.id);
  const { data, error } = await supabase
    .from("found_us")

    .update([
      {
        weight: source[0].weight + 1,
      },
    ])
    .eq("id", sourceid.id)
    .select();
  return result(error, data);
};


export default source;
