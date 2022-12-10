import { QueryResult } from "pg";
import client from "./db.js";

// constructor
const procedure = function(procedure: { id: bigint, name: string; description: string; price: number; duration: bigint; additional: number; }) {
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

procedure.updateProcById = (id: bigint, name: string, description: string, price: number, duration: bigint, additional: number, result)  => {
  var _query = "UPDATE procedures SET name = " + name + ", description = " + description + ", price = " + price + ", duration = " + duration + ", additional = " + additional + " WHERE id = " + id;
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
