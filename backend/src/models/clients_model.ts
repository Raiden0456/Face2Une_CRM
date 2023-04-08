// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";
import p_validator from "validate-phone-number-node-js";
import { validate } from "deep-email-validator";
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
      .from("clients")
      .select("*")
      .or(
        "full_name.ilike.%" +
          params.filter_like +
          "%, email.ilike.%" +
          params.filter_like +
          "%, phone.ilike.%" +
          params.filter_like +
          "%"
      )
      .range(start_from, to);

    total = await supabase
      .from("clients")
      .select("id")
      .or(
        "full_name.ilike.%" +
          params.filter_like +
          "%, email.ilike.%" +
          params.filter_like +
          "%, phone.ilike.%" +
          params.filter_like +
          "%"
      );
  } else {
    if ((params.column && !params.value) || (!params.column && params.value))
      return result(null, [], 0);
    resp = params.value
      ? await supabase
          .from("clients")
          .select("*")
          .eq(params.column, params.value)
          .range(start_from, to)
      : await supabase.from("clients").select("*").range(start_from, to);

    total = params.value
      ? await supabase
          .from("clients")
          .select("id")
          .eq(params.column, params.value)
      : await supabase.from("clients").select("id");
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
  // email and phone check //
  if (client.email) {
    let email_valid = await validate(client.email);
    if (!email_valid.valid)
      resp = { error: { message: "email is not valid" }, data: [] };
    let check = await supabase
      .from("clients")
      .select("id")
      .eq("email", client.email);
    if (check.data.length != 0)
      resp = { error: { message: "email is already in use" }, data: [] };
  }
  if (client.phone) {
    let phone_check = p_validator.validate(client.phone);
    if (!phone_check)
      resp = { error: { message: "invalid phone format" }, data: [] };
  }
  //******//
  // if user_id is not provided and user with such email exists, get it from users table //
  if (!client.user_id) {
    let user = await supabase
      .from("users")
      .select("id")
      .eq("email", client.email);
    if (user.data.length > 0) client.user_id = user.data[0].id;
  }
  //******//
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
  // if user_id is set, block ability to edit client //
  // get user from clients table //
  let user = await supabase
    .from("clients")
    .select("user_id")
    .eq("id", client.id)
    .then((res) => res.data[0]);
  if (typeof user != "undefined" && typeof client.user_id == "undefined") {
    if (user.user_id != null) {
      resp = {
        error: {
          message: "Edit impossible, client connected to existing user",
        },
        data: [],
      };
      return result(resp.error, resp.data);
    }
  }
  // email and phone check //
  if (client.email) {
    let check = await supabase
      .from("clients")
      .select("id")
      .eq("email", client.email);
    if (check.data.length != 0 && check.data[0].id != client.id) {
      resp = { error: { message: "email is already in use" }, data: [] };
      return result(resp.error, resp.data);
    }
  }
  if (client.phone) {
    let phone_check = p_validator.validate(client.phone);
    if (!phone_check) {
      resp = { error: { message: "invalid phone format" }, data: [] };
      return result(resp.error, resp.data);
    }
  }
  //******//

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
  return result(resp.error, resp.data);
};

client.deleteClientById = async (id: number, result) => {
  // if client is connected to user, block ability to delete //
  let user = await supabase
    .from("clients")
    .select("user_id")
    .eq("id", id)
    .then((res) => res.data[0]);
  if (typeof user != "undefined") {
    if (user.user_id != null) {
      let resp = {
        error: {
          message: "Delete impossible, client connected to existing user",
        },
        data: [],
      };
      return result(resp.error, resp.data);
    }
  }
  const { data, error } = await supabase.from("clients").delete().eq("id", id);
  return result(error, data);
};

export default client;
