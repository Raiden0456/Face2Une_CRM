import supabase from "./db.js";
import p_validator from "validate-phone-number-node-js";
import { validate } from "deep-email-validator";
import { getPaginationBounds } from "../utils/pagination.js";
import client_utils from "../utils/clients.js";

interface ClientParams {
  id?: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  user_id?: number;
}

interface GetClientsParams {
  index: number;
  per_page: number;
  filter_like?: string;
  column?: string;
  value?: any;
}

class Client {
  static async getClients(params: GetClientsParams) {
    const { start, end } = getPaginationBounds(params.index, params.per_page);

    const filterCondition = params.filter_like
      ? "full_name.ilike.%" +
        params.filter_like +
        "%, email.ilike.%" +
        params.filter_like +
        "%, phone.ilike.%"
      : undefined;

    const fields = `
            id, full_name, email, phone, user_id,
            appointments(procedures(name), saloons(address), total_price, reservation_date_time, bought_on),
            track_certificates(certificate_id, discount_left, discount_left_gbp, expiry_date, bought_on),
            client_packages(packages(name), amount_left_in, expiry_date, bought_on)
        `;

    const query = supabase.from("clients").select(fields).range(start, end);

    const totalQuery = supabase.from("clients").select("id");

    if (filterCondition) {
      query.or(filterCondition);
      totalQuery.or(filterCondition);
    }
    if (params.column && params.value) {
      query.eq(params.column, params.value);
      totalQuery.eq(params.column, params.value);
    }
    const resp = await query;
    const totalResp = await totalQuery;

    if (resp.error) throw resp.error;
    if (totalResp.error) throw totalResp.error;

    return {
      data: resp.data,
      total: totalResp.data.length,
    };
  }

  static async createClient(client: ClientParams) {
    let resp;
    if (client.email) {
      let email_valid = await validate(client.email);
      if (!email_valid.valid) {
        resp = { error: { message: "email is not valid" }, data: [] };
        return [resp.error, resp.data];
      }
      let check = await supabase
        .from("clients")
        .select("id")
        .eq("email", client.email);
      if (check.data.length !== 0) {
        resp = { error: { message: "email is already in use" }, data: [] };
        return [resp.error, resp.data];
      }
    }

    if (client.phone) {
      let phone_check = p_validator.validate(client.phone);
      if (!phone_check) {
        resp = { error: { message: "invalid phone format" }, data: [] };
        return [resp.error, resp.data];
      }
    }

    if (!client.user_id) {
      let user = await supabase
        .from("users")
        .select("id")
        .eq("email", client.email);
      if (user.data.length > 0) client.user_id = user.data[0].id;
    }

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
    
    if (resp.error) throw resp.error;
    return resp.data;
  }

  static async updateClientById(client: ClientParams) {
    let resp;

    const user = await client_utils.getUserById(client.id);
    if (user && user.user_id && client.user_id === undefined) {
      resp = {
        error: {
          message: "Edit impossible, client connected to existing user",
        },
        data: [],
      };
      return [resp.error, resp.data];
    }

    if (
      client.email &&
      (await client_utils.isEmailInUse(client.email, client.id))
    ) {
      resp = { error: { message: "email is already in use" }, data: [] };
      return [resp.error, resp.data];
    }

    if (client.phone && !client_utils.isValidPhone(client.phone)) {
      resp = { error: { message: "invalid phone format" }, data: [] };
      return [resp.error, resp.data];
    }

    resp = await client_utils.updateClient(client);
    if (resp.error) throw resp.error;
    return resp.data;
  }

  static async deleteClientById(id: number) {
    let user = await supabase
      .from("clients")
      .select("user_id")
      .eq("id", id)
      .then((res) => res.data[0]);
    if (typeof user !== "undefined") {
      if (user.user_id !== null) {
        let resp = {
          error: {
            message: "Delete impossible, client connected to existing user",
          },
          data: [],
        };
        return [resp.error, resp.data];
      }
    }
    const { data, error } = await supabase
      .from("clients")
      .delete()
      .eq("id", id);
   
    if (error) throw error;
    return data;
  }
}

export default Client;
