// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";

// Constructor
const procedure = function (procedure) {
  this.id = procedure.id;
  this.name = procedure.name;
  this.description = procedure.description;
  this.price = procedure.price;
  this.duration = procedure.duration;
  this.additional = procedure.additional;
};

procedure.getAllproc = async (additional: number, result)  => {
  switch (additional) {
    case 0: {
      let { data: procedures, error } = await supabase
      .from('procedures')
      .select('*')
      .eq('additional', 0); 
      result(error, procedures);
      break;
    }
    case 1: {
      let { data: procedures, error } = await supabase
      .from('procedures')
      .select('*')
      .eq('additional', 1);
      result(error, procedures);
      break;
    }
    default: {
      let { data: procedures, error } = await supabase
      .from('procedures')
      .select('*')
      result(error, procedures);
      break;
    }
  }
};

// procedure.getProcById = (id: number, result)  => {
//   var _query = "SELECT * FROM procedures WHERE id = " + id;
//   client.query(_query, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     // console.log("procedures: ", res);
//     result(null, res);
//     client.end();
//   });
// };

// procedure.createProc = (proc: {name: string, description: string, price: number, duration: number, additional: number }, result)  => {
//   var _query = "INSERT INTO procedures (name, description, price, duration, additional) VALUES('" + proc.name + "', '" + proc.description + "', " + proc.price + ", " + proc.duration + ", " + proc.additional + ")";
//   client.query(_query, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     // console.log("procedures: ", res);
//     result(null, res);
//     client.end();
//   });
// };

// procedure.updateProcById = (proc: {id: number, name: string, description: string, price: number, duration: number, additional: number }, result)  => {
//   var _query = "UPDATE procedures SET name = '" + proc.name + "', description = '" + proc.description + "', price = " + proc.price + ", duration = " + proc.duration + ", additional = " + proc.additional + " WHERE id = " + proc.id;
//   client.query(_query, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     // console.log("procedures: ", res);
//     result(null, res);
//     client.end();
//   });
// };

// procedure.deleteProcById = (id: number, result)  => {
//   var _query = "DELETE FROM procedures WHERE id = " + id;
//   client.query(_query, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     // console.log("procedures: ", res);
//     result(null, res);
//     client.end();
//   });
// };

export default procedure;
