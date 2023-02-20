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
// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";
import date from "date-and-time";
import procedure from "./procedures_model.js";
// Constructor
var appointment = function (appointment) {
    this.id = appointment.id;
    this.procedure_id = appointment.procedure_id;
    this.additional_ids = appointment.additional_ids;
    this.reservation_date_time = appointment.reservation_date_time;
    this.client_id = appointment.client_id;
    this.reserved_on = appointment.reserved_on;
    this.saloon_id = appointment.saloon_id;
};
appointment.getAppointments = function (filter, result) {
    if (filter === void 0) { filter = { column: "", value: false }; }
    return __awaiter(void 0, void 0, void 0, function () {
        var resp, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!filter.value) return [3 /*break*/, 2];
                    return [4 /*yield*/, supabase
                            .from("appointments")
                            .select("*")
                            .eq(filter.column, filter.value)
                            .order("reservation_date", { ascending: true })];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, supabase
                        .from("appointments")
                        .select("*")
                        .order("reservation_date", { ascending: true })];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    resp = _a;
                    return [2 /*return*/, result(resp.error, resp.data)];
            }
        });
    });
};
// Calculate total price //
appointment.getTotalPrice = function (main_proc, additional_procs) { return __awaiter(void 0, void 0, void 0, function () {
    var all_ids, resp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                all_ids = [];
                all_ids.push(main_proc);
                all_ids = all_ids.concat(additional_procs);
                return [4 /*yield*/, procedure.getTotalCost(all_ids, function (data) {
                        return data;
                    })];
            case 1:
                resp = (_a.sent());
                return [2 /*return*/, resp];
        }
    });
}); };
//////////////////////////
appointment.createAppoint = function (appoint, result) { return __awaiter(void 0, void 0, void 0, function () {
    var date_r_obj, date_reserved, time_reserved, _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                date_r_obj = new Date(appoint.reservation_date_time);
                date_reserved = date.format(date_r_obj, "YYYY-MM-DD");
                time_reserved = date.format(date_r_obj, "HH:mm");
                return [4 /*yield*/, supabase
                        .from("appointments")
                        .insert([
                        {
                            procedure_id: appoint.procedure_id,
                            additional_ids: appoint.additional_ids,
                            reservation_date: date_reserved,
                            reservation_time: time_reserved,
                            client_id: appoint.client_id,
                            total_price: appoint.total_price,
                            saloon_id: appoint.saloon_id,
                        },
                    ])
                        .select()];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                return [2 /*return*/, result(error, data)];
        }
    });
}); };
appointment.updateAppointById = function (appoint, result) { return __awaiter(void 0, void 0, void 0, function () {
    var date_r_obj, date_reserved, time_reserved, _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                date_r_obj = new Date(appoint.reservation_date_time);
                date_reserved = date.format(date_r_obj, "YYYY-MM-DD");
                time_reserved = date.format(date_r_obj, "HH:mm");
                return [4 /*yield*/, supabase
                        .from("appointments")
                        .update([
                        {
                            procedure_id: appoint.procedure_id,
                            additional_ids: appoint.additional_ids,
                            reservation_date: date_reserved,
                            reservation_time: time_reserved,
                            client_id: appoint.client_id,
                            total_price: appoint.total_price,
                            saloon_id: appoint.saloon_id,
                        },
                    ])
                        .eq("id", appoint.id)
                        .select()];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                return [2 /*return*/, result(error, data)];
        }
    });
}); };
appointment.deleteAppointById = function (id, result) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabase
                    .from("appointments")
                    .delete()
                    .eq("id", id)];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                return [2 /*return*/, result(error, data)];
        }
    });
}); };
export default appointment;
//# sourceMappingURL=appointments_model.js.map