import schedule from "../models/schedule_model.js";
import { join } from "path";
// Retrieve schedules from the database.
export function loadSchedule(url_params, res) {
  schedule.getAllSchedules(url_params, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while retrieving schedules.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `No schedules found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Update an schedule identified by the id in the request
export async function updateSchedule(
  sched: {
    id: number;
    employee_id: number;
    work_date: Date;
    lunch_time: Date;
    saloon_id: number;
  },
  res
) {
  schedule.updateScheduleById(sched, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while updating schedule.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `schedule with id ${sched.id} not found.`,
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
    work_date: Date;
    lunch_time: Date;
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
      res.json({ success: true,  message: "deleted schedule with id: " + id + ", successfully!", });
    }
  });
}

// Set lunch time //
export function setLunchTime(
  sched: {
    id: number;
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
        message: `schedule with id ${sched.id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}
