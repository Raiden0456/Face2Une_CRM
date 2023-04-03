import schedule from "../models/schedule_model.js";
import { join } from "path";
// Retrieve schedules from the database.
export function loadSchedule(
  params: {
    index: number;
    per_page: number;
    work_date: Date;
    saloon_id?: number;
  },
  res
) {
  schedule.getAllSchedules(params, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while retrieving schedules.",
      });
    else if (data == undefined || data.length == 0) {
      res.status(404).json({
        success: true,
        message: `No schedules found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}


// Create an schedule //
export async function createSchedule(
  sched: {
    employee_id: number;
    work_date_start: Date;
    work_date_end: Date;
    saloon_id: number;
  },
  res
) {
  schedule.createSchedule(sched, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while creating schedule.",
      });
    else {
      res.json({ success: true, data: data });
    }
  });
}

// Delete an schedule with the specified id in the request
export function deleteSchedule(id, res) {
  schedule.deleteScheduleById(id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while deleting schedule.",
      });
    else {
      res.json({
        success: true,
        message: "deleted schedule with id: " + id + ", successfully!",
      });
    }
  });
}

// Set lunch time //
export function setLunchTime(
  sched: {
    employee_id: number;
    lunch_time: Date;
  },
  res
) {
  schedule.setLunchTime(sched, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while setting lunch time.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `schedule with employee_id ${sched.employee_id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}
