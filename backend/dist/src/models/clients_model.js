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
import p_validator from "validate-phone-number-node-js";
// Constructor
var client = function (client) {
    this.id = client.id;
    this.first_name = client.first_name;
    this.last_name = client.last_name;
    this.phone = client.phone;
    this.email = client.email;
    this.user_id = client.user_id;
};
client.getClients = function (params, result) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, total, start_from, to, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                start_from = 0;
                to = 100;
                //******//
                // Pagination set where index = page number and per_page = max amount of entries per page //
                if (params.index && params.per_page) {
                    start_from = (params.index - 1) * params.per_page;
                    to = Number(start_from) + Number(params.per_page) - 1;
                }
                if (!params.filter_like) return [3 /*break*/, 3];
                return [4 /*yield*/, supabase
                        .from("clients")
                        .select("*")
                        .or("full_name.ilike.%" +
                        params.filter_like +
                        "%, email.ilike.%" +
                        params.filter_like +
                        "%, phone.ilike.%" +
                        params.filter_like +
                        "%")
                        .range(start_from, to)];
            case 1:
                resp = _c.sent();
                return [4 /*yield*/, supabase
                        .from("clients")
                        .select("id")
                        .or("full_name.ilike.%" +
                        params.filter_like +
                        "%, email.ilike.%" +
                        params.filter_like +
                        "%, phone.ilike.%" +
                        params.filter_like +
                        "%")];
            case 2:
                total = _c.sent();
                return [3 /*break*/, 12];
            case 3:
                if (!params.value) return [3 /*break*/, 5];
                return [4 /*yield*/, supabase
                        .from("clients")
                        .select("*")
                        .eq(params.column, params.value)
                        .range(start_from, to)];
            case 4:
                _a = _c.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, supabase.from("clients").select("*").range(start_from, to)];
            case 6:
                _a = _c.sent();
                _c.label = 7;
            case 7:
                resp = _a;
                if (!params.value) return [3 /*break*/, 9];
                return [4 /*yield*/, supabase
                        .from("clients")
                        .select("id")
                        .eq(params.column, params.value)];
            case 8:
                _b = _c.sent();
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, supabase.from("clients").select("id")];
            case 10:
                _b = _c.sent();
                _c.label = 11;
            case 11:
                total = _b;
                _c.label = 12;
            case 12: return [2 /*return*/, result(resp.error, resp.data, total.data.length)];
        }
    });
}); };
client.createClient = function (client, result) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, check, phone_check, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, supabase.from("clients").select().eq("email", client.email)];
            case 1:
                check = _a.sent();
                phone_check = p_validator.validate(client.phone);
                if (!(check.data.length == 0 && phone_check)) return [3 /*break*/, 5];
                if (!!client.user_id) return [3 /*break*/, 3];
                return [4 /*yield*/, supabase
                        .from("users")
                        .select("id")
                        .eq("email", client.email)];
            case 2:
                user = _a.sent();
                if (user.data.length > 0)
                    client.user_id = user.data[0].id;
                _a.label = 3;
            case 3: return [4 /*yield*/, supabase
                    .from("clients")
                    .insert([
                    {
                        full_name: client.first_name + " " + client.last_name,
                        phone: client.phone,
                        email: client.email,
                        user_id: client.user_id,
                    },
                ])
                    .select()];
            case 4:
                //******//
                resp = _a.sent();
                return [3 /*break*/, 6];
            case 5:
                resp = {
                    error: { message: "email in use or invalid phone format" },
                    data: [],
                };
                _a.label = 6;
            case 6: return [2 /*return*/, result(resp.error, resp.data)];
        }
    });
}); };
client.updateClientById = function (client, result) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, check, phone_check;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, supabase
                    .from("clients")
                    .select("id")
                    .eq("email", client.email)];
            case 1:
                check = _a.sent();
                phone_check = p_validator.validate(client.phone);
                if (!(check.data.length == 0 || check.data[0].id == client.id)) return [3 /*break*/, 5];
                if (!!phone_check) return [3 /*break*/, 2];
                resp = { error: { message: "invalid phone format" }, data: [] };
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, supabase
                    .from("clients")
                    .update([
                    {
                        full_name: client.first_name + " " + client.last_name,
                        phone: client.phone,
                        email: client.email,
                        user_id: client.user_id,
                    },
                ])
                    .eq("id", client.id)
                    .select()];
            case 3:
                resp = _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                resp = { error: { message: "email is already in use" }, data: [] };
                _a.label = 6;
            case 6: return [2 /*return*/, result(resp.error, resp.data)];
        }
    });
}); };
client.deleteClientById = function (id, result) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabase.from("clients").delete().eq("id", id)];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                return [2 /*return*/, result(error, data)];
        }
    });
}); };
export default client;
//# sourceMappingURL=clients_model.js.map