import user from "../models/users_model.js";
// Retrieve users from the database.
export function loadUsers(res) {
    user.getAllusers(function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        else if (data.length != 0) {
            res.json({ success: true, data: data });
        }
        else {
            res.json({ success: false, data: data });
        }
    });
}
// Find a single user with an id
export function findOneUser(id, res) {
    user.getUserById(id, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            });
        else if (data.length != 0) {
            res.json({ success: true, data: data });
        }
        else {
            res.json({ success: false, data: data });
        }
    });
}
// // Update a user identified by the id in the request
// export function updateProc(proc: {id: number, name: string, description: string, price: number, duration: number, additional: number}, res) {
//   user.updateProcById(proc, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while updating user."
//       });
//     else {
//       res.json({success: true, data: data});
//     }
//   });
// }
// Create a user 
export function createUser(_user, res) {
    user.createUser(_user, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating user."
            });
        else {
            res.json({ success: true, data: data });
        }
    });
}
// Delete a user with the specified id in the request
export function deleteUser(id, res) {
    user.deleteUserById(id, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while deleting user."
            });
        else {
            res.json({ success: true, data: id });
        }
    });
}
;
//# sourceMappingURL=users_controller.js.map