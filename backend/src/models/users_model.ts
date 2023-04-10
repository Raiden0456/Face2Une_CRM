// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";
import bcrypt from "bcrypt";
import { validate } from 'deep-email-validator'
import { getPaginationBounds } from "../utils/pagination.js";

// Constructor
const user = function (user) {
  this.id = user.id;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.phone = user.phone;
  this.email = user.email;
  this.password = user.password;
  this.rights = user.rights;
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
  const { start, end } = getPaginationBounds(params.index, params.per_page);

  const filterLikeCondition = params.filter_like
    ? "first_name.ilike.%" +
      params.filter_like +
      "%, last_name.ilike.%" +
      params.filter_like +
      "%, email.ilike.%" +
      params.filter_like +
      "%, phone.ilike.%" +
      params.filter_like +
      "%"
    : undefined;

  const filterColumnCondition =
    params.column && params.value ? { [params.column]: params.value } : undefined;

  const isEmployee = params.column === "employee";

  if ((params.column && !params.value) || (!params.column && params.value)) {
    return result(null, [], 0);
  }

  const query = supabase.from("users").select("*").range(start, end);
  const totalQuery = supabase.from("users").select("id");

  if (filterLikeCondition) {
    query.or(filterLikeCondition);
    totalQuery.or(filterLikeCondition);

    if (isEmployee) {
      query.eq("rights", "employee");
      totalQuery.eq("rights", "employee");
    }
  } else if (filterColumnCondition) {
    query.eq(params.column, params.value);
    totalQuery.eq(params.column, params.value);
  }

  const resp = await query;
  const total = await totalQuery;

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
  const { data, error } = await supabase.auth.admin.createUser({
    email: user.email,
    password: user.password,
    email_confirm: true,
    user_metadata: {
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      rights: user.rights,
    },
  });
  if (error) {
    return result(error, null);
  }

  const resp = await supabase
    .from("users")
    .insert([
      {
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        rights: user.rights,
        uuid: data.user.id,
      },
    ])
    .select();
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
  const resp = await supabase
    .from("users")
    .update([
      {
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        rights: user.rights,
      },
    ])
    .eq("id", user.id)
    .select();

  const { data, error } = await supabase.auth.admin.updateUserById(
    resp.data[0].uuid,
    {
      email: user.email,
      password: user.password,
      user_metadata: {
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        rights: user.rights,
      },
    }
  );

  return result(resp.error, resp.data);
};

user.deleteUserById = async (id: number, result) => {
  await supabase.from("clients").update({ user_id: null }).eq("user_id", id);
  const uuid = await supabase.from("users").select("uuid").eq("id", id);
  await supabase.from("users").delete().eq("id", id);
  const { data, error } = await supabase.auth.admin.deleteUser(
    uuid.data[0].uuid
  );
  return result(error, data);
};

user.signUp = async (
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
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        rights: user.rights,
      },
      emailRedirectTo: process.env.CORS_ORIGIN + "/auth/Signin",
    },
  });
  if (error) {
    return result(error, null);
  }

  const resp = await supabase
    .from("users")
    .insert([
      {
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        rights: user.rights,
        uuid: data.user.id,
      },
    ])
    .select();
  return result(resp.error, resp.data);
};

// Login for sign in page //
user.signIn = async (
  user: {
    email: string;
    password: string;
  },
  result
) => {
  const resp = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });
  return result(resp.error, resp.data);
};

// session user //
user.session_user = async (result) => {
  const session = await supabase.auth.getSession();
  return result(session.error, session.data.session);
};

// sign out //
user.signOut = async (result) => {
  const resp = await supabase.auth.signOut();
};

export default user;
