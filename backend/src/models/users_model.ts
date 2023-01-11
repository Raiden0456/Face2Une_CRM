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

user.getAllusers = async (result) => {
  let { data: users, error } = await supabase.from("users").select("*");
  result(error, users);
};

user.getUserById = async (id: number, result) => {
  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id);
  result(error, users);
};

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
  let check = await supabase.from("users").select().eq("email", user.email);

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
  }
  else {
    resp = { error: {message: "Email is already registrated"}, data: [] };
  }
  result(resp.error, resp.data);
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
  }
  else {
    resp = { error: {message: "Email is already registrated"}, data: [] };
  }
  result(resp.error, resp.data);
};

user.deleteUserById = async (id: number, result) => {
  const { data, error } = await supabase.from("users").delete().eq("id", id);
  result(error, data);
};

export default user;
