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
import voucher_codes from "voucher-code-generator";
// Constructor
var package_p = function (package_p) {
    this.id = package_p.id;
    this.name = package_p.name;
    this.price = package_p.price;
    this.amount = package_p.amount;
};
package_p.getAllpack = function (result) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, package_ps, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabase
                    .from("packages")
                    .select("*")
                    .order("price", { ascending: true })];
            case 1:
                _a = _b.sent(), package_ps = _a.data, error = _a.error;
                return [2 /*return*/, result(error, package_ps)];
        }
    });
}); };
package_p.getPackById = function (id, result) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, package_ps, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabase
                    .from("packages")
                    .select("*")
                    .eq("id", id)];
            case 1:
                _a = _b.sent(), package_ps = _a.data, error = _a.error;
                return [2 /*return*/, result(error, package_ps)];
        }
    });
}); };
package_p.createPack = function (proc, result) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabase
                    .from("packages")
                    .insert([
                    {
                        name: proc.name,
                        price: proc.price,
                        amount: proc.amount,
                    },
                ])
                    .select()];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                return [2 /*return*/, result(error, data)];
        }
    });
}); };
package_p.updatePackById = function (proc, result) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabase
                    .from("packages")
                    .update([
                    {
                        name: proc.name,
                        price: proc.price,
                        amount: proc.amount,
                    },
                ])
                    .eq("id", proc.id)
                    .select()];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                return [2 /*return*/, result(error, data)];
        }
    });
}); };
package_p.deletePackById = function (id, result) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabase
                    .from("packages")
                    .delete()
                    .eq("id", id)];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                return [2 /*return*/, result(error, data)];
        }
    });
}); };
// Buying and tracking packages //
package_p.buyPackages = function (client_id, packages, result) { return __awaiter(void 0, void 0, void 0, function () {
    var all_promocodes, i, amount_proc, amount_add, promocode, _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                all_promocodes = [];
                i = 0;
                _b.label = 1;
            case 1:
                if (!(i < packages.length)) return [3 /*break*/, 5];
                return [4 /*yield*/, supabase
                        .from("packages")
                        .select("amount")
                        .eq("id", packages[i].package_id)];
            case 2:
                amount_proc = _b.sent();
                amount_add = amount_proc.data[0].amount * packages[i].amount_bought;
                promocode = voucher_codes.generate({
                    length: 8,
                    count: 1,
                });
                all_promocodes.push(promocode[0]);
                return [4 /*yield*/, supabase
                        .from("client_packages")
                        .insert([
                        {
                            client_id: client_id,
                            package_id: packages[i].package_id,
                            amount_left_in: amount_add,
                            promocode: promocode[0],
                            expiry_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                        },
                    ])];
            case 3:
                _a = _b.sent(), data = _a.data, error = _a.error;
                if (error) {
                    return [2 /*return*/, result(error, null)];
                }
                _b.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/, result(null, { message: "Packages bought successfully", promocodes: all_promocodes })];
        }
    });
}); };
// Using packages promocodes //
package_p.usePackage = function (client_id, promocode, result) { return __awaiter(void 0, void 0, void 0, function () {
    var current, current_date, formatted_current_date, _a, data, error, _b, data, error;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, supabase
                    .from("client_packages")
                    .select("amount_left_in, expiry_date")
                    .eq("client_id", client_id)
                    .eq("promocode", promocode)];
            case 1:
                current = _c.sent();
                current_date = new Date();
                formatted_current_date = current_date.toISOString().split('T')[0];
                if (!(current.data.length > 0)) return [3 /*break*/, 6];
                if (!(current.data[0].amount_left_in > 0 && current.data[0].expiry_date >= formatted_current_date)) return [3 /*break*/, 3];
                return [4 /*yield*/, supabase
                        .from("client_packages")
                        .update([
                        {
                            amount_left_in: current.data[0].amount_left_in - 1,
                        },
                    ])
                        .eq("client_id", client_id)
                        .eq("promocode", promocode)];
            case 2:
                _a = _c.sent(), data = _a.data, error = _a.error;
                if (error) {
                    return [2 /*return*/, result(error, null)];
                }
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, supabase
                    .from("client_packages")
                    .delete()
                    .eq("client_id", client_id)
                    .eq("promocode", promocode)];
            case 4:
                _b = _c.sent(), data = _b.data, error = _b.error;
                if (error) {
                    return [2 /*return*/, result(error, null)];
                }
                return [2 /*return*/, result({ message: "Ivalid or expired promocode" }, null)];
            case 5: return [3 /*break*/, 7];
            case 6: return [2 /*return*/, result({ message: "Ivalid or expired promocode" }, null)];
            case 7: return [2 /*return*/, result(null, { message: "Package promocode used successfully" })];
        }
    });
}); };
export default package_p;
//# sourceMappingURL=packages_model.js.map