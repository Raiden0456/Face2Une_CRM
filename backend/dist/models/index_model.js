import client from "./db.js";
// constructor
var procedure = function (procedure) {
    this.id = procedure.id;
    this.name = procedure.name;
    this.description = procedure.description;
    this.price = procedure.price;
    this.duration = procedure.duration;
    this.additional = procedure.additional;
};
procedure.getAllproc = function (additional, result) {
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
    client.query(_query, function (err, res) {
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
procedure.getProcById = function (id, result) {
    var _query = "SELECT * FROM procedures WHERE id = " + id;
    client.query(_query, function (err, res) {
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
procedure.updateProcById = function (id, name, description, price, duration, additional, result) {
    var _query = "UPDATE procedures SET name = " + name + ", description = " + description + ", price = " + price + ", duration = " + duration + ", additional = " + additional + " WHERE id = " + id;
    client.query(_query, function (err, res) {
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
procedure.deleteProcById = function (id, result) {
    var _query = "DELETE FROM procedures WHERE id = " + id;
    client.query(_query, function (err, res) {
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
//# sourceMappingURL=index_model.js.map