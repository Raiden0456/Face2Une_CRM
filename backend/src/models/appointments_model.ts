// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";

// Constructor
const appointment = function (appointment) {
  this.id = appointment.id;
  this.procedure_id = appointment.procedure_id;
  this.additional_ids = appointment.additional_ids;
  this.reservation_date = appointment.reservation_date;
  this.reservation_time = appointment.reservation_time;
  this.client_id = appointment.client_id;
  this.master_id = appointment.master_id;
  this.total_price = appointment.total_price;
  this.reserved_on = appointment.reserved_on;
  this.saloon_name = appointment.saloon_name;
};

appointment.getAllappoint = async (result)  => {
  let { data: appointments, error } = await supabase
  .from('appointments')
  .select('*')
  result(error, appointments);
};

appointment.getAppointById = async (id: number, result)  => {
  let { data: appointments, error } = await supabase
  .from('appointments')
  .select('*')
  .eq('id', id); 
  result(error, appointments);
};

appointment.getAppointsByClient_Id = async (id: number, result)  => {
  let { data: appointments, error } = await supabase
  .from('appointments')
  .select('*')
  .eq('client_id', id); 
  result(error, appointments);
};

appointment.createAppoint = async (
  appoint: 
  {
    procedure_id: number, 
    additional_ids: [], 
    reservation_date: string, 
    reservation_time: string, 
    client_id: number,
    master_id: number,
    total_price: number,
    saloon_name: string, 
  }, result)  => {
  const { data, error } = await supabase
  .from('appointments')
  .insert([
    {
      procedure_id: appoint.procedure_id, 
      additional_ids: appoint.additional_ids, 
      reservation_date: appoint.reservation_date,
      reservation_time: appoint.reservation_time,
      client_id: appoint.client_id,
      master_id: appoint.master_id,
      total_price: appoint.total_price,
      saloon_name: appoint.saloon_name
    },
  ])
  .select();
  result(error, data);
};

appointment.updateAppointById = async (appoint: 
  {
    id: number,
    procedure_id: number, 
    additional_ids: [], 
    reservation_date: string, 
    reservation_time: string, 
    client_id: number,
    master_id: number,
    total_price: number,
    saloon_name: string, 
  }, result)  => {
  const { data, error } = await supabase
  .from('appointments')
  .update([
    {
      procedure_id: appoint.procedure_id, 
      additional_ids: appoint.additional_ids, 
      reservation_date: appoint.reservation_date,
      reservation_time: appoint.reservation_time,
      client_id: appoint.client_id,
      master_id: appoint.master_id,
      total_price: appoint.total_price,
      saloon_name: appoint.saloon_name
    },
  ])
  .eq('id', appoint.id)
  .select();
  result(error, data);
};

appointment.deleteAppointById = async (id: number, result)  => {
  const { data, error } = await supabase
  .from('appointments')
  .delete()
  .eq('id', id)
  result(error, data);
};

export default appointment;