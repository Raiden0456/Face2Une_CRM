// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";
import bcrypt from "bcrypt";

// Constructor
const user = function (user) {
  this.id = user.id;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.phone = user.phone;
  this.email = user.email;
  this.password = user.password;
};

user.getUsers = async (
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
    resp =
      params.column == "employee"
        ? await supabase
            .from("users")
            .select("*")
            .or(
              "first_name.ilike.%" +
                params.filter_like +
                "%, last_name.ilike.%" +
                params.filter_like +
                "%, email.ilike.%" +
                params.filter_like +
                "%, phone.ilike.%" +
                params.filter_like +
                "%"
            )
            .eq("rights", "employee")
            .range(start_from, to)
        : await supabase
            .from("users")
            .select("*")
            .or(
              "first_name.ilike.%" +
                params.filter_like +
                "%, last_name.ilike.%" +
                params.filter_like +
                "%, email.ilike.%" +
                params.filter_like +
                "%, phone.ilike.%" +
                params.filter_like +
                "%"
            )
            .range(start_from, to);

    total =
      params.column == "employee"
        ? await supabase
            .from("users")
            .select("id")
            .or(
              "first_name.ilike.%" +
                params.filter_like +
                "%, last_name.ilike.%" +
                params.filter_like +
                "%, email.ilike.%" +
                params.filter_like +
                "%, phone.ilike.%" +
                params.filter_like +
                "%"
            )
        : await supabase
            .from("users")
            .select("id")
            .or(
              "first_name.ilike.%" +
                params.filter_like +
                "%, last_name.ilike.%" +
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
          .from("users")
          .select("*")
          .eq(params.column, params.value)
          .range(start_from, to)
      : await supabase.from("users").select("*").range(start_from, to);

    total = params.value
      ? await supabase
          .from("users")
          .select("id")
          .eq(params.column, params.value)
      : await supabase.from("users").select("id");
  }
  return result(resp.error, resp.data, total.data.length);
};

// Section may be used to register a new user`as well as create a new user as an admin //
user.createUser = async (
  user: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    rights: string;
  },
  result
) => {
  var resp;
  let check = await supabase.from("users").select("id").eq("email", user.email);

  if (check.data.length == 0) {
    const hash_password = bcrypt.hashSync(user.password, 10);
    resp = await supabase
      .from("users")
      .insert([
        {
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
          email: user.email,
          password: hash_password,
          salt: 10,
          rights: user.rights,
        },
      ])
      .select();
  } else {
    resp = { error: { message: "email is already used" }, data: [] };
  }
  return result(resp.error, resp.data);
};

user.updateUserById = async (
  user: {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    rights: string;
  },
  result
) => {
  var resp;

  let check = await supabase.from("users").select("id").eq("email", user.email);

  if (check.data.length == 0 || check.data[0].id == user.id) {
    const hash_password = bcrypt.hashSync(user.password, 10);
    resp = await supabase
      .from("users")
      .update([
        {
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
          email: user.email,
          password: hash_password,
          salt: 10,
          rights: user.rights,
        },
      ])
      .eq("id", user.id)
      .select();
  } else {
    resp = { error: { message: "email is already used" }, data: [] };
  }
  return result(resp.error, resp.data);
};

user.deleteUserById = async (id: number, result) => {
  await supabase.from("clients").update({ user_id: null }).eq("user_id", id);

  const { data, error } = await supabase.from("users").delete().eq("id", id);
  return result(error, data);
};

// Login for sign in page //
user.loginUser = async (
  user: {
    email: string;
    password: string;
  },
  result
) => {
  var resp;
  resp = await supabase
    .from("users")
    .select("id, email, password")
    .eq("email", user.email);

  if (resp.data.length == 0) {
    resp = { error: { message: "email or password is incorrect" }, data: [] };
  } else {
    if (bcrypt.compareSync(user.password, resp.data[0].password)) {
      resp = { error: null, data: resp.data[0] };
    } else {
      resp = { error: { message: "email or password is incorrect" }, data: [] };
    }
  }
  return result(resp.error, resp.data);
};

export default user;
