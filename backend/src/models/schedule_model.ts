import supabase from "./db.js";
import date from "date-and-time";
import { getDatesBetween } from "../utils/work_days.js";
// Constructor
const schedule = function (schedule) {
  this.id = schedule.id;
  this.employee_id = schedule.employee_id;
  this.work_date = schedule.work_date;
  this.lunch_time = schedule.lunch_time;
  this.saloon_id = schedule.saloon_id;
};

schedule.getAllSchedules = async (
  params: {
    index: number;
    per_page: number;
    work_date: Date;
  },
  result
) => {
  // set default values //
  let total;
  let start_from = 0;
  let to = 100;
  //******//

  // Pagination set where index = page number and per_page = max amount of entries per page //
  if (params.index && params.per_page) {
    start_from = (params.index - 1) * params.per_page;
    to = Number(start_from) + Number(params.per_page) - 1;
  }
  //******//

  // Get date from work_date //
  let work_date = new Date(params.work_date);
  let work_date_formatted = date.format(work_date, "YYYY-MM-DD");
  //******//
 
  // Get all users with rights = employee //
  let users = await supabase
    .from("users")
    .select("id, first_name, last_name")
    .eq("rights", "employee");
  //******//

  // Get all schedules for a specific date //
  let schedules = await supabase
    .from("schedule")
    .select("*")
    .eq("work_date", work_date_formatted);
  //******//

  // Create an array of objects with user data and schedule data //
  let data = [];
  for (let i = 0; i < users.data.length; i++) {
    let user = users.data[i];
    let schedule = schedules.data.find(
      (schedule) => schedule.employee_id == user.id
    );
    if (schedule) {
      data.push({
        id: schedule.id,
        employee_id: schedule.employee_id,
        work_date: schedule.work_date,
        lunch_time: schedule.lunch_time,
        saloon_id: schedule.saloon_id,
        full_name: user.first_name + " " + user.last_name,
      });
    } else {
      data.push({
        id: null,
        employee_id: user.id,
        work_date: null,
        lunch_time: null,
        saloon_id: null,
        full_name: user.first_name + " " + user.last_name,
      });
    }
  }
  //******//
  data = data.slice(start_from, to);

  total = await supabase
    .from("users")
    .select('id')
    .eq("rights", "employee");

  return result(null, data, total.data.length);
};

schedule.createSchedule = async (
  schedule: {
    employee_id: number;
    work_date_start: Date;
    work_date_end: Date;
    saloon_id: number;
  },
  result
) => {
  // Get all work days between two dates //
  let work_days = getDatesBetween(
    schedule.work_date_start,
    schedule.work_date_end
  );
  //******//
  // loop through work days and create a schedule for each day //
  for (let i = 0; i < work_days.length; i++) {
    let work_date = work_days[i];
    let work_date_formatted = date.format(work_date, "YYYY-MM-DD");
    const { data, error } = await supabase
      .from("schedule")
      .insert([
        {
          employee_id: schedule.employee_id,
          work_date: work_date_formatted,
          saloon_id: schedule.saloon_id,
        },
      ]);
    console.log("work day:", work_date_formatted, "for employee", schedule.employee_id, "created")
  }
  //******//
  return result(null, { message: "Schedule created successfully" });
};


schedule.deleteScheduleById = async (id: number, result) => {
  const { data, error } = await supabase.from("schedule").delete().eq("id", id);
  return result(error, data);
};

schedule.setLunchTime = async (
  schedule: { employee_id: number; lunch_time: Date },
  result
) => {
  //Get hours and minutes from lunch_time
  let lunch = new Date(schedule.lunch_time);
  let lunch_day = date.format(lunch, "YYYY-MM-DD");
  let lunch_time = date.format(lunch, "HH:mm");
  const { data, error } = await supabase
    .from("schedule")
    .update({ lunch_time: lunch_time })
    .eq("employee_id", schedule.employee_id)
    .eq("work_date", lunch_day)
    .select();
  return result(error, data);
};

export default schedule;
