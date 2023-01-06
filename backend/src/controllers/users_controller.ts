import user from "../models/users_model.js";
import { join } from 'path';

// Retrieve users from the database.
export function loadUsers(res) {
    user.getAllusers((err, data) => {
      if (err)
        res.status(500).json({
          success: false, 
          message: err.message || "Some error occurred while retrieving users."
        });
      else if (data.length == 0) {
        res.status(404).json({
          success: false,
          message: `No users found.`
        });
      }
      else {
        res.json({success: true, data: data});
      }
    });
}

// Find a single user with an id
export function findOneUser(id: number, res) {
  user.getUserById(id, (err, data) => {
    if (err)
      res.status(500).json({
        success: false, 
        message: err.message || "Some error occurred while retrieving user."
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `User with id ${id} not found.`
      });
    }
    else {
      res.json({success: true, data: data});
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
export function createUser(_user: {first_name: string, last_name: string, phone: string, email: string, password: string }, res) {
  user.createUser(_user, (err, data) => {
    if (err)
      res.status(500).json({
        success: false, 
        message: err.message || "Some error occurred while creating user."
      });
    else {
      res.json({success: true, data: data});
    }
  });
}

// Delete a user with the specified id in the request
export function deleteUser(id: number, res) {
  user.deleteUserById(id, (err, data) => {
    if (err)
      res.status(500).json({
         success: false, 
         message: err.message || "Some error occurred while deleting user."
      });
    else if (data == null) {
      res.status(404).json({
        success: false,
        message: `User with id ${id} not found.`
      });
    }
    else {
      res.json({success: true, data: id});
    }
  });
};

