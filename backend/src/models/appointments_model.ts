// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";
import date from "date-and-time";
import procedure from "./procedures_model.js";

// Constructor
const appointment = function (appointment) {
  this.id = appointment.id;
  this.procedure_id = appointment.procedure_id;
  this.additional_ids = appointment.additional_ids;
  this.reservation_date_time = appointment.reservation_date_time;
  this.client_id = appointment.client_id;
  this.reserved_on = appointment.reserved_on;
  this.saloon_id = appointment.saloon_id;
};

appointment.getAppointments = async (
  filter: { column: string; value: any } = { column: "", value: false },
  result
) => {
  var resp;
  resp = filter.value
    ? await supabase
        .from("appointments")
        .select("*")
        .eq(filter.column, filter.value)
        .order("reservation_date", { ascending: true })
    : await supabase
        .from("appointments")
        .select("*")
        .order("reservation_date", { ascending: true });

  return result(resp.error, resp.data);
};

// Calculate total price //
appointment.getTotalPrice = async (main_proc: number, additional_procs: number[]) => {
  let all_ids: number[];
  all_ids = [];
  all_ids.push(main_proc);
  all_ids = all_ids.concat(additional_procs);
  // get total price of procedures by all_ids using procedure.getTotalCost //
  const resp = (await procedure.getTotalCost(all_ids, (data) => {
      return data;
  }
  ));
  return resp;
};
//////////////////////////

appointment.createAppoint = async (
  appoint: {
    procedure_id: number;
    additional_ids: number[];
    reservation_date_time: Date;
    client_id: number;
    saloon_id: number;
    total_price: number;
  },
  result
) => {
  // Get date and time from reservation_date_time //
  let date_r_obj = new Date(appoint.reservation_date_time);
  let date_reserved = date.format(date_r_obj, "YYYY-MM-DD");
  let time_reserved = date.format(date_r_obj, "HH:mm");
  //////////////////////////////////////////////////
  const { data, error } = await supabase
    .from("appointments")
    .insert([
      {
        procedure_id: appoint.procedure_id,
        additional_ids: appoint.additional_ids,
        reservation_date: date_reserved,
        reservation_time: time_reserved,
        client_id: appoint.client_id,
        total_price: appoint.total_price,
        saloon_id: appoint.saloon_id,
      },
    ])
    .select();
  return result(error, data);
};

appointment.updateAppointById = async (
  appoint: {
    id: number;
    procedure_id: number;
    additional_ids: number[];
    reservation_date_time: Date;
    client_id: number;
    saloon_id: number;
    total_price: number;
  },
  result
) => {
  // Get date and time from reservation_date_time //
  let date_r_obj = new Date(appoint.reservation_date_time);
  let date_reserved = date.format(date_r_obj, "YYYY-MM-DD");
  let time_reserved = date.format(date_r_obj, "HH:mm");
  //////////////////////////////////////////////////

  const { data, error } = await supabase
    .from("appointments")
    .update([
      {
        procedure_id: appoint.procedure_id,
        additional_ids: appoint.additional_ids,
        reservation_date: date_reserved,
        reservation_time: time_reserved,
        client_id: appoint.client_id,
        total_price: appoint.total_price,
        saloon_id: appoint.saloon_id,
      },
    ])
    .eq("id", appoint.id)
    .select();
  return result(error, data);
};

appointment.deleteAppointById = async (id: number, result) => {
  const { data, error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", id);
  return result(error, data);
};

export default appointment;
