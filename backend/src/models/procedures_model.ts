import { QueryResult } from "pg";
import client from "./db.js";

// Constructor
const procedure = function (procedure) {
  this.id = procedure.id;
  this.name = procedure.name;
  this.description = procedure.description;
  this.price = procedure.price;
  this.duration = procedure.duration;
  this.additional = procedure.additional;
};

procedure.getAllproc = (additional: number, result)  => {
  switch (additional) {
    case 0:
      var _query = "SELECT * FROM procedures WHERE additional = 0";
      break;
    case 1:
      var _query = "SELECT * FROM procedures WHERE additional = 1";
      break;
    default:
      var _query = "SELECT * FROM procedures";
      break;
  }
  
  client.query(_query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("procedures: ", res);
    result(null, res);
    client.end();
  });
};

procedure.getProcById = (id: bigint, result)  => {
  var _query = "SELECT * FROM procedures WHERE id = " + id;

  client.query(_query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("procedures: ", res);
    result(null, res);
    client.end();
  });
};

procedure.createProc = (proc: {name: string, description: string, price: number, duration: number, additional: number }, result)  => {
  var _query = "INSERT INTO procedures (name, description, price, duration, additional) VALUES('" + proc.name + "', '" + proc.description + "', " + proc.price + ", " + proc.duration + ", " + proc.additional + ")";
  client.query(_query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    // console.log("procedures: ", res);
    result(null, res);
    client.end();
  });
};

procedure.updateProcById = (proc: {id: number, name: string, description: string, price: number, duration: number, additional: number }, result)  => {
  var _query = "UPDATE procedures SET name = " + proc.name + ", description = " + proc.description + ", price = " + proc.price + ", duration = " + proc.duration + ", additional = " + proc.additional + " WHERE id = " + proc.id;
  client.query(_query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("procedures: ", res);
    result(null, res);
    client.end();
  });
};

procedure.deleteProcById = (id: bigint, result)  => {
  var _query = "DELETE FROM procedures WHERE id = " + id;
  client.query(_query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("procedures: ", res);
    result(null, res);
    client.end();
  });
};

export default procedure;
