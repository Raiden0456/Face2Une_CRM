// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";
import p_validator from "validate-phone-number-node-js";
// Constructor
const client = function (client) {
  this.id = client.id;
  this.first_name = client.first_name;
  this.last_name = client.last_name;
  this.phone = client.phone;
  this.email = client.email;
  this.user_id = client.user_id;
};

client.getClients = async (
  params: {
    index: number;
    per_page: number;
    filter_like: string;
    filter_column_eq: string;
    filter_column_eq_value: any;
  },
  result
) => {
  var resp;
  var total;
  
  // Pagination set where index = page number and per_page = max amount of entries per page //
  var start_from = (params.index - 1) * params.per_page;
  var to = (Number(start_from) + Number(params.per_page)) - 1;
  //******//     

  if (params.filter_like) {
    resp = await supabase
      .from("clients")
      .select("*")
      .or("full_name.ilike.%"+params.filter_like+"%, email.ilike.%"+params.filter_like+"%, phone.ilike.%"+params.filter_like+"%")
      .range(start_from, to);

      total = await supabase
      .from("clients")
      .select("id")
      .or("full_name.ilike.%"+params.filter_like+"%, email.ilike.%"+params.filter_like+"%, phone.ilike.%"+params.filter_like+"%")
  }
  else
  {
    resp = params.filter_column_eq_value
    ? 
    await supabase
      .from("clients")
      .select("*")
      .eq(params.filter_column_eq, params.filter_column_eq_value)
      .range(start_from, to)
    :
    await supabase
      .from("clients")
      .select("*")
      .range(start_from, to);

    total = params.filter_column_eq_value
    ? 
    await supabase
      .from("clients")
      .select("id")
      .eq(params.filter_column_eq, params.filter_column_eq_value)
    :
    await supabase
      .from("clients")
      .select("id")
  }
  return result(resp.error, resp.data, total.data.length);
};



client.createClient = async (
  client: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    user_id: number;
  },
  result
) => {
  var resp;
  let check = await supabase.from("clients").select().eq("email", client.email);
  let phone_check = p_validator.validate(client.phone);

  if (check.data.length == 0 && phone_check) {
    resp = await supabase
      .from("clients")
      .insert([
        {
          full_name: client.first_name + " " + client.last_name,
          phone: client.phone,
          email: client.email,
          user_id: client.user_id,
        },
      ])
      .select();
  } else {
    resp = {
      error: { message: "email in use or invalid phone format" },
      data: [],
    };
  }
  return result(resp.error, resp.data);
};

client.updateClientById = async (
  client: {
    id: number;
    first_name: string;
    last_name: string;
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
  let phone_check = p_validator.validate(client.phone);
  if (check.data.length == 0 || check.data[0].id == client.id) {
    if (!phone_check)
      resp = { error: { message: "invalid phone format" }, data: [] };
    else
      resp = await supabase
        .from("clients")
        .update([
          {
            full_name: client.first_name + " " + client.last_name,
            phone: client.phone,
            email: client.email,
            user_id: client.user_id,
          },
        ])
        .eq("id", client.id)
        .select();
  } else {
    resp = { error: { message: "email is already in use" }, data: [] };
  }
  return result(resp.error, resp.data);
};

client.deleteClientById = async (id: number, result) => {
  const { data, error } = await supabase.from("clients").delete().eq("id", id);
  return result(error, data);
};

export default client;
