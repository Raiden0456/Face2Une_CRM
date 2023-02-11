import user from "../models/users_model.js";
import clients from "../models/clients_model.js";
import { join } from "path";

// Find a single user with an id
export function loadUsers(url_params, res) {
  user.getUsers(url_params, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while retrieving user.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `Users not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// Update a user identified by the id in the request
export function updateUser(
  _user: {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    rights: string;
  },
  res
) {
  user.updateUserById(_user, async (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while updating user.",
      });
    else if (data.length == 0) {
      res.status(404).json({
        success: true,
        message: `User with id ${_user.id} not found.`,
      });
    } else {
      const client_same_user = (await clients.getClients(
        {
          filter_column_eq: "user_id", filter_column_eq_value: _user.id,
          index: 1,
          per_page: 1,
          filter_like: ""
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            return data;
          }
        }
      )) as any;
      const client_same_email = (await clients.getClients(
        {
          filter_column_eq: "email", filter_column_eq_value: _user.email,
          index: 1,
          per_page: 1,
          filter_like: ""
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            return data;
          }
        }
      )) as any;
      // update client with id assosiated user was updated //
      if (client_same_user.length > 0) {
        const client = {
          id: client_same_user[0].id,
          first_name: _user.first_name,
          last_name: _user.last_name,
          phone: _user.phone,
          email: _user.email,
          user_id: _user.id,
        };
        clients.updateClientById(client, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("assosiated client to user updated");
          }
        });
      }
      // connect and update client if user is now connected to it //
      else if (client_same_email.length > 0 && !client_same_email[0].user_id) {
        const client = {
          id: client_same_email[0].id,
          first_name: _user.first_name,
          last_name: _user.last_name,
          phone: _user.phone,
          email: _user.email,
          user_id: _user.id,
        };
        clients.updateClientById(client, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("updated client connected to updated user with same email");
          }
        });
      }

      res.json({ success: true, data: data });
    }
  });
}

// Create a user or register a user on sign in page //
export function createUser(
  _user: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    rights: string;
  },
  res
) {
  user.createUser(_user, async (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while creating user.",
      });
    else {
      // Create a client for the user if client with such email does not exist //
      // assigning client variable to response from getClients //
      const client = (await clients.getClients(
        {
          filter_column_eq: "email", filter_column_eq_value: _user.email,
          index: 1,
          per_page: 1,
          filter_like: ""
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            return data;
          }
        }
      )) as any;
      if (client.length == 0) {
        const client = {
          first_name: _user.first_name,
          last_name: _user.last_name,
          phone: _user.phone,
          email: _user.email,
          user_id: data[0].id,
        };
        clients.createClient(client, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Created client for user with id: " + data[0].id);
          }
        });
      } else {
        //update client with user_id //
        const client_update = {
          id: client[0].id,
          first_name: _user.first_name,
          last_name: _user.last_name,
          phone: _user.phone,
          email: _user.email,
          user_id: data[0].id,
        };
        clients.updateClientById(client_update, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated client with same email: " + data[0].email);
          }
        });
      }
      res.json({ success: true, data: data });
    }
  });
}

// Delete a user with the specified id in the request //
export function deleteUser(id: number, res) {
  user.deleteUserById(id, (err, data) => {
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
export function loginUser(
  _user: { email: string; password: string },
  res
) {
  user.loginUser(_user, (err, data) => {
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
    } else {
      res.json({ success: true, data: data });
    }
  });
}

