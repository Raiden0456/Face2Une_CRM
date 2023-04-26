// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";
import date from "date-and-time";
import Procedure from "./procedures_model.js";

// Set interface for the appointment model
interface appoint {
  id?: number;
  procedure_id: number;
  additional_ids: number[];
  reservation_date_time: Date;
  client_id: number;
  saloon_id: number;
  total_price: number;
  total_price_gbp: number;
}
class Appointment {
  static async fetchAppointmentDetails(appointment) {
    const { data: proc } = await supabase
      .from("procedures")
      .select("name")
      .eq("id", appointment.procedure_id);
    appointment.procedure_name = proc[0].name;
    appointment.additional_names = [];

    for (const additionalId of appointment.additional_ids) {
      const { data: add_proc } = await supabase
        .from("procedures")
        .select("name")
        .eq("id", additionalId);
      appointment.additional_names.push(add_proc[0].name);
    }

    const { data: saloon } = await supabase
      .from("saloons")
      .select("address, index")
      .eq("id", appointment.saloon_id);
    appointment.saloon_address = saloon[0].address + " " + saloon[0].index;

    const { data: client } = await supabase
      .from("clients")
      .select("full_name, phone, email")
      .eq("id", appointment.client_id);
    appointment.client_full_name = client[0].full_name;
    appointment.client_phone = client[0].phone;
    appointment.client_email = client[0].email;

    return appointment;
  }

  static async getAppointments(
    filter: { column: string; value: any; details: string } = {
      column: "",
      value: false,
      details: "false",
    },
    result
  ) {
    const query = supabase
      .from("appointments")
      .select("*")
      .order("reservation_date_time", { ascending: true });
    if (filter.value) {
      query.eq(filter.column, filter.value);
    }

    const resp = await query;
    const boolean_details = filter.details == "true";

    if (boolean_details) {
      for (let i = 0; i < resp.data.length; i++) {
        resp.data[i] = await Appointment.fetchAppointmentDetails(resp.data[i]);
      }
    }

    return result(resp.error, resp.data);
  }

  static async createAppoint(appoint: appoint, result) {
    // Get date and time from reservation_date_time //
    let date_r_obj = new Date(appoint.reservation_date_time);
    //////////////////////////////////////////////////
    if (date_r_obj < new Date()) {
      return result({ message: "date is in the past, debil :/" }, null);
    }
    // Calculate date and time using procedure durations //
    let { data: proc } = await supabase
      .from("procedures")
      .select("duration")
      .eq("id", appoint.procedure_id);
    let duration = proc[0].duration;
    for (let i = 0; i < appoint.additional_ids.length; i++) {
      let { data: add_proc } = await supabase
        .from("procedures")
        .select("duration")
        .eq("id", appoint.additional_ids[i]);
      duration += add_proc[0].duration;
    }
    let reservation_date_time_end = date.addMinutes(date_r_obj, duration);
    /////////////////////////////////////////////////////////

    const { data, error } = await supabase
      .from("appointments")
      .insert([
        {
          procedure_id: appoint.procedure_id,
          additional_ids: appoint.additional_ids,
          client_id: appoint.client_id,
          total_price: appoint.total_price,
          total_price_gbp: appoint.total_price_gbp,
          saloon_id: appoint.saloon_id,
          reservation_date_time: appoint.reservation_date_time,
          reservation_date_time_end: reservation_date_time_end,
        },
      ])
      .select();
    return result(error, data);
  }

  static async updateAppointById(appoint: appoint, result) {
    // Get date and time from reservation_date_time //
    let date_r_obj = new Date(appoint.reservation_date_time);
    //////////////////////////////////////////////////

    // Calculate date and time using procedure durations //
    let { data: proc } = await supabase
      .from("procedures")
      .select("duration")
      .eq("id", appoint.procedure_id);
    let duration = proc[0].duration;
    for (let i = 0; i < appoint.additional_ids.length; i++) {
      let { data: add_proc } = await supabase
        .from("procedures")
        .select("duration")
        .eq("id", appoint.additional_ids[i]);
      duration += add_proc[0].duration;
    }
    let reservation_date_time_end = date.addMinutes(date_r_obj, duration);
    /////////////////////////////////////////////////////////

    const { data, error } = await supabase
      .from("appointments")
      .update([
        {
          procedure_id: appoint.procedure_id,
          additional_ids: appoint.additional_ids,
          client_id: appoint.client_id,
          total_price: appoint.total_price,
          total_price_gbp: appoint.total_price_gbp,
          saloon_id: appoint.saloon_id,
          reservation_date_time: appoint.reservation_date_time,
          reservation_date_time_end: reservation_date_time_end,
        },
      ])
      .eq("id", appoint.id)
      .select();
    return result(error, data);
  }

  static deleteAppointById = async (id: number, result) => {
    const { data, error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id);
    return result(error, data);
  };
}
export default Appointment;
