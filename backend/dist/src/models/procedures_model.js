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
// Constructor
var procedure = function (procedure) {
    this.id = procedure.id;
    this.name = procedure.name;
    this.description = procedure.description;
    this.price = procedure.price;
    this.duration = procedure.duration;
    this.additional = procedure.additional;
};
procedure.getAllproc = function (additional, result) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, procedures, error, _c, procedures, error, _d, procedures, error;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = additional;
                switch (_a) {
                    case 0: return [3 /*break*/, 1];
                    case 1: return [3 /*break*/, 3];
                }
                return [3 /*break*/, 5];
            case 1: return [4 /*yield*/, supabase
                    .from('procedures')
                    .select('*')
                    .eq('additional', 0)];
            case 2:
                _b = _e.sent(), procedures = _b.data, error = _b.error;
                result(error, procedures);
                return [3 /*break*/, 7];
            case 3: return [4 /*yield*/, supabase
                    .from('procedures')
                    .select('*')
                    .eq('additional', 1)];
            case 4:
                _c = _e.sent(), procedures = _c.data, error = _c.error;
                result(error, procedures);
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, supabase
                    .from('procedures')
                    .select('*')];
            case 6:
                _d = _e.sent(), procedures = _d.data, error = _d.error;
                result(error, procedures);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
procedure.getProcById = function (id, result) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, procedures, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabase
                    .from('procedures')
                    .select('*')
                    .eq('id', id)];
            case 1:
                _a = _b.sent(), procedures = _a.data, error = _a.error;
                result(error, procedures);
                return [2 /*return*/];
        }
    });
}); };
procedure.createProc = function (proc, result) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabase
                    .from('procedures')
                    .insert([
                    { name: proc.name, description: proc.description, price: proc.price, duration: proc.duration, additional: proc.additional },
                ])
                    .select()];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                result(error, data);
                return [2 /*return*/];
        }
    });
}); };
procedure.updateProcById = function (proc, result) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabase
                    .from('procedures')
                    .update([
                    { name: proc.name, description: proc.description, price: proc.price, duration: proc.duration, additional: proc.additional },
                ])
                    .eq('id', proc.id)
                    .select()];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                result(error, data);
                return [2 /*return*/];
        }
    });
}); };
procedure.deleteProcById = function (id, result) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabase
                    .from('procedures')
                    .delete()
                    .eq('id', id)];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                result(error, data);
                return [2 /*return*/];
        }
    });
}); };
export default procedure;
//# sourceMappingURL=procedures_model.js.map