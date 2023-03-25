import supabase from "./db.js";
import date from "date-and-time";

// Constructor
const schedule = function (schedule) {
  this.id = schedule.id;
  this.employee_id = schedule.employee_id;
  this.work_date = schedule.work_date;
  this.lunch_time = schedule.lunch_time;
  this.saloon_id = schedule.saloon_id;
};

schedule.getAllSchedules = async (
  filter: { column: string; value: string } = { column: "", value: "" },
  result
) => {
  let resp = filter.value
    ? await supabase
        .from("schedule")
        .select("*")
        .eq(filter.column, filter.value)
    : await supabase.from("schedule").select("*");
  return result(resp.error, resp.data);
};

schedule.createSchedule = async (
  schedule: {
    employee_id: number;
    work_date: Date;
    lunch_time: Date;
    saloon_id: number;
  },
  result
) => {
  //Get hours and minutes from lunch_time
  let lunch = new Date(schedule.lunch_time);
  let lunch_time = date.format(lunch, "HH:mm");
  const { data, error } = await supabase
    .from("schedule")
    .insert([
      {
        employee_id: schedule.employee_id,
        work_date: schedule.work_date,
        lunch_time: lunch_time,
        saloon_id: schedule.saloon_id,
      },
    ])
    .select();
  return result(error, data);
};

schedule.updateScheduleById = async (
  schedule: {
    id: number;
    employee_id: number;
    work_date: Date;
    lunch_time: Date;
    saloon_id: number;
  },
  result
) => {
  //Get hours and minutes from lunch_time
  let lunch = new Date(schedule.lunch_time);
  let lunch_time = date.format(lunch, "HH:mm");
  const { data, error } = await supabase
    .from("schedule")
    .update([
      {
        employee_id: schedule.employee_id,
        work_date: schedule.work_date,
        lunch_time: lunch_time,
        saloon_id: schedule.saloon_id,
      },
    ])
    .eq("id", schedule.id)
    .select();
  return result(error, data);
};

schedule.deleteScheduleById = async (id: number, result) => {
  const { data, error } = await supabase.from("schedule").delete().eq("id", id);
  return result(error, data);
};

schedule.setLunchTime = async (
  schedule: { id: number; lunch_time: Date },
  result
) => {
  //Get hours and minutes from lunch_time
  let lunch = new Date(schedule.lunch_time);
  let lunch_time = date.format(lunch, "HH:mm");
  const { data, error } = await supabase
    .from("schedule")
    .update({ lunch_time: lunch_time })
    .eq("id", schedule.id)
    .select();
  return result(error, data);
};

export default schedule;
