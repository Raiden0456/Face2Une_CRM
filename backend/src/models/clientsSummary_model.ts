import supabase from "./db.js";
import { getPaginationBounds } from "../utils/pagination.js";
import util from "util";

// CONSTRUCTOR
const clientSum = function (client) {
  this.id = client.id;
  this.full_name = client.full_name;
  this.email = client.email;
  this.orderType = client.orderType;
  this.payed = client.payed;
  this.dateTime = client.dateTime;
};

// Get all orders on clients, with pagination

clientSum.getSum = async (
    params: {
      index: number;
      per_page: number;
      filter_like: string;
    },
    result
  ) => {
    const { start, end } = getPaginationBounds(params.index, params.per_page);
  
    const filterCondition = params.filter_like
      ? "full_name.ilike.%" +
        params.filter_like +
        "%, email.ilike.%" +
        params.filter_like
      : undefined;
  
    const fields = `
      id, full_name, email,
      appointments(procedures(name), saloons(address), total_price, reservation_date_time, bought_on),
      track_certificates(certificate_id, discount_left, discount_left_gbp, expiry_date, bought_on),
      client_packages(packages(name), amount_left_in, expiry_date, bought_on)
    `;
  
    const query = supabase
      .from("clients")
      .select(fields)
      .range(start, end);
  
    const totalQuery = supabase
      .from("clients")
      .select("id");
  
    
    if (filterCondition) {
      query.or(filterCondition);
      totalQuery.or(filterCondition);
    }
    const resp = await query;
    const totalResp = await totalQuery;
  
    return result(resp.error, resp.data, (totalResp.data?.length) ?? 0);
  };

export default clientSum;
