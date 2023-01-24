// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";

// Constructor
const client = function (client) {
  this.id = client.id;
  this.full_name = client.full_name;
  this.phone = client.phone;
  this.email = client.email;
  this.user_id = client.user_id;
};

client.getClients = async (
  filter: { column: string; value: any } = { column: "", value: false},
  result
) => {
  var resp;
  resp = filter.value
  ? 
  await supabase
    .from("clients")
    .select("*")
    .eq(filter.column, filter.value)
  :
  await supabase
    .from("clients")
    .select("*");
  
  return result(resp.error, resp.data);
};

client.createClient = async (
  client: {
    full_name: string;
    phone: string;
    email: string;
    user_id: number;
  },
  result
) => {
  var resp;
  let check = await supabase.from("clients").select().eq("email", client.email);

  if (check.data.length == 0) {
    resp = await supabase
      .from("clients")
      .insert([
        {
          full_name: client.full_name,
          phone: client.phone,
          email: client.email,
          user_id: client.user_id,
        },
      ])
      .select();
  } else {
    resp = { error: "", data: [] };
  }
  return result(resp.error, resp.data);
};

client.updateClientById = async (
  client: {
    id: number;
    full_name: string;
    phone: string;
    email: string;
    user_id: number;
  },
  result
) => {
  var resp;
  let check = await supabase
    .from("clients")
    .select("id")
    .eq("email", client.email);

  if (check.data.length == 0 || check.data[0].id == client.id) {
    resp = await supabase
      .from("clients")
      .update([
        {
          full_name: client.full_name,
          phone: client.phone,
          email: client.email,
          user_id: client.user_id,
        },
      ])
      .eq("id", client.id)
      .select();
  } else {
    resp = { error: { message: "Email is already registrated" }, data: [] };
  }
  return result(resp.error, resp.data);
};

client.deleteClientById = async (id: number, result) => {
  const { data, error } = await supabase.from("clients").delete().eq("id", id);
  return result(error, data);
};

export default client;
