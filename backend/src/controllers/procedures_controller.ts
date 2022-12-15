import procedure from "../models/procedures_model.js";
import { join } from 'path';

// Retrieve procedures from the database.
export function loadProc(add = 0, res) {
  //function from index_model to get procedures
    procedure.getAllproc(add, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving procedures."
        });
      else {
        res.json(data.rows);
      }
    });
}

// Find a single procedure with an id
export function findOneProc(id, req, res) {
  procedure.getProcById(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving procedure."
      });
    else {
      res.json(data.rows);
    }
  });
}


// Update a procedure identified by the id in the request
export function updateProc(proc: {id: number, name: string, description: string, price: number, duration: number, additional: number}, res) {
  procedure.updateProcById(proc, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating procedure."
      });
    else {
      res.send(true);
    }
  });
}

// Create a procedure 
export function createProc(proc: {name: string, description: string, price: number, duration: number, additional: number}, res) {
  procedure.createProc(proc, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating procedure."
      });
    else {
      res.json(data);
    }
  });
}

// Delete a procedure with the specified id in the request
const deleteProcById = (id:bigint , req, res) => {
  procedure.deleteProcById(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting procedure."
      });
    else {
      res.send(true);
    }
  });
};
export { deleteProcById as delete };

