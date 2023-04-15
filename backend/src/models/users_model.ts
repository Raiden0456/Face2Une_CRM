// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";
import bcrypt from "bcrypt";
import { validate } from 'deep-email-validator'
import { getPaginationBounds } from "../utils/pagination.js";

interface UserParams {
  id?: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password?: string;
  rights: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface GetUsersParams {
  index: number;
  per_page: number;
  filter_like: string;
  column: string;
  value: any;
}
class User {
  static async getUsers(params: GetUsersParams, result) {

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

    const isEmployee = params.column == "employee";

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
  }

  static async createUser(params: UserParams, result) {
    const { first_name, last_name, phone, email, password, rights } = params;

    const emailValidation = await validate(email);
    if (!emailValidation.valid) {
      return result({ message: "Email is not valid" }, null);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert({ first_name, last_name, phone, email, password: hashedPassword, rights });

    if (error) return result(error, null);

    return result(null, data);
  }

  static async updateUserById(params: UserParams, result) {
    const { id, first_name, last_name, phone, email, password, rights } = params;

    const hashedPassword = await bcrypt.hash(password, 10);

    const resp = await supabase
      .from("users")
      .update([
        {
          first_name,
          last_name,
          phone,
          email,
          rights,
        },
      ])
      .eq("id", id)
      .select();

    const { data, error } = await supabase.auth.admin.updateUserById(resp.data[0].uuid, {
      email,
      password: hashedPassword,
      user_metadata: {
        first_name,
        last_name,
        phone,
        rights,
      },
    });

    return result(resp.error, resp.data);
  }

  static async deleteUserById(id: number, result) {
    await supabase.from("clients").update({ user_id: null }).eq("user_id", id);
    const uuid = await supabase.from("users").select("uuid").eq("id", id);
    await supabase.from("users").delete().eq("id", id);
    const { data, error } = await supabase.auth.admin.deleteUser(
      uuid.data[0].uuid
    );
    return result(error, data);
  }

  static async getUserById(id: number, result) {
    const resp = await supabase.from("users").select("*").eq("id", id);
    return result(resp.error, resp.data);
  }

  static async signUp(params: UserParams, result) {
    const { first_name, last_name, phone, email, password, rights } = params;

    const emailValidation = await validate(email);
    if (!emailValidation.valid) {
      return result({ message: "Email is not valid" }, null);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase.auth.signUp({
      email,
      password: hashedPassword,
      options: {
        data: {
          first_name,
          last_name,
          phone,
          rights,
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
          first_name,
          last_name,
          phone,
          email,
          rights,
          uuid: data.user.id,
        },
      ])
      .select();

    return result(resp.error, resp.data);
  }

  static async signIn(params: LoginParams, result) {
    const { email, password } = params;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return result(error, null);
    }

    return result(null, data);
  }

  static async session_user(result) {
    const session = await supabase.auth.getSession();
    return result(session.error, session.data.session);
  }

  static async signOut() {
    supabase.auth.signOut();
  }
}

export default User;
