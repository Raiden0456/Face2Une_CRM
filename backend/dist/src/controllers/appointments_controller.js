var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import appointment from "../models/appointments_model.js";
// Retrieve appointments from the database.
export function loadAppoint(url_params, res) {
    appointment.getAppointments(url_params, function (err, data) {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while retrieving appointments.",
            });
        else if (data.length == 0) {
            res.status(404).json({
                success: false,
                message: "No appointments found.",
            });
        }
        else {
            res.json({ success: true, data: data });
        }
    });
}
// Update an appointment identified by the id in the request
export function updateAppoint(appoint, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Get total price of appointment and add it to appoint object //
                    _a = appoint;
                    return [4 /*yield*/, appointment.getTotalPrice(appoint.procedure_id, appoint.additional_ids)];
                case 1:
                    // Get total price of appointment and add it to appoint object //
                    _a.total_price = _b.sent();
                    appointment.updateAppointById(appoint, function (err, data) {
                        if (err)
                            res.status(500).json({
                                success: false,
                                message: err.message || "Some error occurred while updating appointment.",
                            });
                        else if (data.length == 0) {
                            res.status(404).json({
                                success: true,
                                message: "appointment with id ".concat(appoint.id, " not found."),
                            });
                        }
                        else {
                            res.json({ success: true, data: data });
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// Create an appointment
export function createAppoint(appoint, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Get total price of appointment and add it to appoint object //
                    _a = appoint;
                    return [4 /*yield*/, appointment.getTotalPrice(appoint.procedure_id, appoint.additional_ids)];
                case 1:
                    // Get total price of appointment and add it to appoint object //
                    _a.total_price = _b.sent();
                    appointment.createAppoint(appoint, function (err, data) {
                        if (err)
                            res.status(500).json({
                                success: false,
                                message: err.message || "Some error occurred while creating appointment.",
                            });
                        else {
                            res.json({ success: true, data: data });
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// Delete an appointment with the specified id in the request
export function deleteAppoint(id, res) {
    appointment.deleteAppointById(id, function (err, data) {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while deleting appointment.",
            });
        // else if (data == null) {
        //   res.status(404).json({
        //     success: false,
        //     message: `appointment with id ${id} not found.`
        //   });
        // }
        else {
            res.json({
                success: true,
                message: "deleted appointment with id: " + id + ", successfully!",
            });
        }
    });
}
//# sourceMappingURL=appointments_controller.js.map