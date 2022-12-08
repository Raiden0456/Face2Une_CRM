import client from "./db.js";
// constructor
var procedure = function (procedure) {
    this.name = procedure.name;
    this.description = procedure.description;
    this.price = procedure.price;
    this.duration = procedure.duration;
    this.additional = procedure.additional;
};
// procedure.create = (new_procedure, result) => {
//   client.query("INSERT INTO procedures SET ?", new_procedure, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }
//     console.log("created procedure: ", { id: res.insertId, ...new_procedure });
//     result(null, { id: res.insertId, ...new_procedure });
//   });
// };
// procedure.findById = (id, result) => {
//   client.query(`SELECT * FROM procedures WHERE id = ${id}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }
//     if (res.length) {
//       console.log("found procedure: ", res[0]);
//       result(null, res[0]);
//       return;
//     }
//     // not found procedure with the id
//     result({ kind: "not_found" }, null);
//   });
// };
procedure.getAll = function (result) {
    var _query = "SELECT * FROM procedures";
    client.query(_query, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log("procedures: ", res);
        result(null, res);
        client.end();
    });
};
// procedure.updateById = (id, procedure, result) => {
//   client.query(
//     "UPDATE procedures SET name = ?, description = ?, price = ?, duration = ?, additional = ? WHERE id = ?",
//     [procedure.name, procedure.description, procedure.price, procedure.duration, procedure.additional, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
//       if (res.affectedRows == 0) {
//         // not found procedure with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }
//       console.log("updated procedure: ", { id: id, ...procedure });
//       result(null, { id: id, ...procedure });
//     }
//   );
// };
// procedure.remove = (id, result) => {
//   client.query("DELETE FROM procedures WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     if (res.affectedRows == 0) {
//       // not found procedure with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }
//     console.log("deleted procedure with id: ", id);
//     result(null, res);
//   });
// };
// procedure.removeAll = result => {
//   sql.client.query("DELETE FROM procedures", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log(`deleted ${res.affectedRows} procedures`);
//     result(null, res);
//   });
// };
export default procedure;
//# sourceMappingURL=index_model.js.map