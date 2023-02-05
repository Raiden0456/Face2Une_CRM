// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";
import bcrypt from "bcrypt";
import client from "./clients_model.js";

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
  filter: { column: string; value: any } = { column: "", value: false},
  result
) => {
  var resp;
  resp = filter.value
  ? 
  await supabase
    .from("users")
    .select("*")
    .eq(filter.column, filter.value)
  :
  await supabase
    .from("users")
    .select("*");

  return result(resp.error, resp.data);
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

  if (check.data.length == 0) 
  {
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
  }
  else {
    resp = { error: {message: "email is already used"}, data: [] };
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

  if (check.data.length == 0 || check.data[0].id == user.id) 
  {
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
  }
  else {
    resp = { error: {message: "email is already used"}, data: [] };
  }
  return result(resp.error, resp.data);
};

user.deleteUserById = async (id: number, result) => {
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
    .select("*")
    .eq("email", user.email);
    
  if (resp.data.length == 0) {
    resp = { error: {message: "email or password is incorrect"}, data: [] };
  }
  else {
    if (bcrypt.compareSync(user.password, resp.data[0].password)) {
      resp = { error: null, data: resp.data[0] };
    }
    else {
      resp = { error: {message: "email or password is incorrect"}, data: [] };
    }
  }
  return result(resp.error, resp.data);
};

export default user;
