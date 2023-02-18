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
import user from "../models/users_model.js";
import clients from "../models/clients_model.js";
// Find a single user with an id
export function loadUsers(url_params, res) {
    user.getUsers(url_params, function (err, data) {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while retrieving user.",
            });
        else if (data.length == 0) {
            res.status(404).json({
                success: true,
                message: "Users not found.",
            });
        }
        else {
            res.json({ success: true, data: data });
        }
    });
}
// Update a user identified by the id in the request
export function updateUser(_user, res) {
    var _this = this;
    user.updateUserById(_user, function (err, data) { return __awaiter(_this, void 0, void 0, function () {
        var client_same_user, client_same_email, client, client;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!err) return [3 /*break*/, 1];
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating user.",
                    });
                    return [3 /*break*/, 5];
                case 1:
                    if (!(data.length == 0)) return [3 /*break*/, 2];
                    res.status(404).json({
                        success: true,
                        message: "User with id ".concat(_user.id, " not found."),
                    });
                    return [3 /*break*/, 5];
                case 2: return [4 /*yield*/, clients.getClients({
                        column: "user_id", value: _user.id,
                        index: 1,
                        per_page: 1,
                        filter_like: ""
                    }, function (err, data) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            return data;
                        }
                    })];
                case 3:
                    client_same_user = (_a.sent());
                    return [4 /*yield*/, clients.getClients({
                            column: "email", value: _user.email,
                            index: 1,
                            per_page: 1,
                            filter_like: ""
                        }, function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                return data;
                            }
                        })];
                case 4:
                    client_same_email = (_a.sent());
                    // update client with id assosiated user was updated //
                    if (client_same_user.length > 0) {
                        client = {
                            id: client_same_user[0].id,
                            first_name: _user.first_name,
                            last_name: _user.last_name,
                            phone: _user.phone,
                            email: _user.email,
                            user_id: _user.id,
                        };
                        clients.updateClientById(client, function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("assosiated client to user updated");
                            }
                        });
                    }
                    // connect and update client if user is now connected to it //
                    else if (client_same_email.length > 0 && !client_same_email[0].user_id) {
                        client = {
                            id: client_same_email[0].id,
                            first_name: _user.first_name,
                            last_name: _user.last_name,
                            phone: _user.phone,
                            email: _user.email,
                            user_id: _user.id,
                        };
                        clients.updateClientById(client, function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("updated client connected to updated user with same email");
                            }
                        });
                    }
                    res.json({ success: true, data: data });
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); });
}
// Create a user or register a user on sign in page //
export function createUser(_user, res) {
    var _this = this;
    user.createUser(_user, function (err, data) { return __awaiter(_this, void 0, void 0, function () {
        var client, client_1, client_update;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!err) return [3 /*break*/, 1];
                    res.status(500).json({
                        success: false,
                        message: err.message || "Some error occurred while creating user.",
                    });
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, clients.getClients({
                        column: "email", value: _user.email,
                        index: 1,
                        per_page: 1,
                        filter_like: ""
                    }, function (err, data) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            return data;
                        }
                    })];
                case 2:
                    client = (_a.sent());
                    if (client.length == 0) {
                        client_1 = {
                            first_name: _user.first_name,
                            last_name: _user.last_name,
                            phone: _user.phone,
                            email: _user.email,
                            user_id: data[0].id,
                        };
                        clients.createClient(client_1, function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("Created client for user with id: " + data[0].id);
                            }
                        });
                    }
                    else {
                        client_update = {
                            id: client[0].id,
                            first_name: _user.first_name,
                            last_name: _user.last_name,
                            phone: _user.phone,
                            email: _user.email,
                            user_id: data[0].id,
                        };
                        clients.updateClientById(client_update, function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("Updated client with same email: " + data[0].email);
                            }
                        });
                    }
                    res.json({ success: true, data: data });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
}
// Delete a user with the specified id in the request //
export function deleteUser(id, res) {
    user.deleteUserById(id, function (err, data) {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while deleting user.",
            });
        // else if (data == null) {
        //   res.status(404).json({
        //     success: false,
        //     message: `User with id ${id} not found.`
        //   });
        // }
        else {
            res.json({
                success: true,
                message: "deleted user with id: " + id + ", successfully!",
            });
        }
    });
}
// Login a user with the specified email and password in the request //
export function loginUser(_user, res) {
    user.loginUser(_user, function (err, data) {
        if (err)
            res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while logging in.",
            });
        else if (data == null) {
            res.status(404).json({
                success: false,
                message: err.message || "User with email ${_user.email} not found.",
            });
        }
        else {
            res.json({ success: true, data: data });
        }
    });
}
//# sourceMappingURL=users_controller.js.map