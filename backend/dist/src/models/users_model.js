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
import bcrypt from "bcrypt";
// Constructor
var user = function (user) {
    this.id = user.id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.phone = user.phone;
    this.email = user.email;
    this.password = user.password;
};
user.getUsers = function (filter, result) {
    if (filter === void 0) { filter = { column: "", value: false }; }
    return __awaiter(void 0, void 0, void 0, function () {
        var resp, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!filter.value) return [3 /*break*/, 2];
                    return [4 /*yield*/, supabase
                            .from("users")
                            .select("*")
                            .eq(filter.column, filter.value)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, supabase
                        .from("users")
                        .select("*")];
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
// Section may be used to register a new user`as well as create a new user as an admin //
user.createUser = function (user, result) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, check, hash_password;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, supabase.from("users").select("id").eq("email", user.email)];
            case 1:
                check = _a.sent();
                if (!(check.data.length == 0)) return [3 /*break*/, 3];
                hash_password = bcrypt.hashSync(user.password, 10);
                return [4 /*yield*/, supabase
                        .from("users")
                        .insert([
                        {
                            first_name: user.first_name,
                            last_name: user.last_name,
                            phone: user.phone,
                            email: user.email,
                            password: hash_password,
                            salt: 10,
                            rights: user.rights,
                        },
                    ])
                        .select()];
            case 2:
                resp = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                resp = { error: { message: "email is already used" }, data: [] };
                _a.label = 4;
            case 4: return [2 /*return*/, result(resp.error, resp.data)];
        }
    });
}); };
user.updateUserById = function (user, result) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, check, hash_password;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, supabase.from("users").select("id").eq("email", user.email)];
            case 1:
                check = _a.sent();
                if (!(check.data.length == 0 || check.data[0].id == user.id)) return [3 /*break*/, 3];
                hash_password = bcrypt.hashSync(user.password, 10);
                return [4 /*yield*/, supabase
                        .from("users")
                        .update([
                        {
                            first_name: user.first_name,
                            last_name: user.last_name,
                            phone: user.phone,
                            email: user.email,
                            password: hash_password,
                            salt: 10,
                            rights: user.rights,
                        },
                    ])
                        .eq("id", user.id)
                        .select()];
            case 2:
                resp = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                resp = { error: { message: "email is already used" }, data: [] };
                _a.label = 4;
            case 4: return [2 /*return*/, result(resp.error, resp.data)];
        }
    });
}); };
user.deleteUserById = function (id, result) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabase.from("users").delete().eq("id", id)];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                return [2 /*return*/, result(error, data)];
        }
    });
}); };
// Login for sign in page //
user.loginUser = function (user, result) { return __awaiter(void 0, void 0, void 0, function () {
    var resp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, supabase
                    .from("users")
                    .select("id, email, password")
                    .eq("email", user.email)];
            case 1:
                resp = _a.sent();
                if (resp.data.length == 0) {
                    resp = { error: { message: "email or password is incorrect" }, data: [] };
                }
                else {
                    if (bcrypt.compareSync(user.password, resp.data[0].password)) {
                        resp = { error: null, data: resp.data[0] };
                    }
                    else {
                        resp = { error: { message: "email or password is incorrect" }, data: [] };
                    }
                }
                return [2 /*return*/, result(resp.error, resp.data)];
        }
    });
}); };
export default user;
//# sourceMappingURL=users_model.js.map