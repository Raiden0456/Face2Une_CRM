import user from "../models/users_model.js";
import Client from "../models/clients_model.js";
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
      try {
        const client_same_user = await Client.getClients(
          {
            column: "user_id", value: _user.id,
            index: 1,
            per_page: 1,
            filter_like: ""
          });
        const client_same_email = await Client.getClients(
          {
            column: "email", value: _user.email,
            index: 1,
            per_page: 1,
            filter_like: ""
          });

      // update client with id assosiated user was updated //
      if (client_same_user.data.length > 0) {
        const client = {
          id: client_same_user[0].id,
          first_name: _user.first_name,
          last_name: _user.last_name,
          phone: _user.phone,
          email: _user.email,
          user_id: _user.id,
        };
        try{
          Client.updateClientById(client);
        }
        catch(err){
          console.log(err);
        }
      }
      // connect and update client if user is now connected to it //
      else if (client_same_email.data.length > 0 && !client_same_email.data[0].user_id) {
        const client = {
          id: client_same_email[0].id,
          first_name: _user.first_name,
          last_name: _user.last_name,
          phone: _user.phone,
          email: _user.email,
          user_id: _user.id,
        };
        try{
          Client.updateClientById(client);
        }
        catch(err){
          console.log(err);
        }
      }
      res.json({ success: true, data: data });
      }
    catch(err){
      console.log(err);
    }
  }
});
}

// Create a user as admin //
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
      // Create a client for the user if client with such email does not exist and user is a client //
      // assigning client variable to response from getClients //
      if(_user.rights == "client")
      {
        var client =await Client.getClients(
          {
            column: "email", value: _user.email,
            index: 1,
            per_page: 1,
            filter_like: ""
          },
        );

        if (client.data.length == 0) {
          const client = {
            first_name: _user.first_name,
            last_name: _user.last_name,
            phone: _user.phone,
            email: _user.email,
            user_id: data[0].id,
          };
          Client.createClient(client);
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
          Client.updateClientById(client_update);
        }
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

export function signUp(
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
  user.signUp(_user, async (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while creating user.",
      });
    else {
      // Create a client for the user if client with such email does not exist and user is a client //
      // assigning client variable to response from getClients //
      if(_user.rights == "client")
      {
        var client = await Client.getClients(
          {
            column: "email", value: _user.email,
            index: 1,
            per_page: 1,
            filter_like: ""
          });

        if (client.data.length == 0) {
          const client = {
            first_name: _user.first_name,
            last_name: _user.last_name,
            phone: _user.phone,
            email: _user.email,
            user_id: data[0].id,
          };
          const resp = await Client.createClient(client);
          res.json({ success: true, data: resp.data });
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
          const resp = await Client.updateClientById(client_update);
          res.json({ success: true, data: resp.data });
        }
      }
    }
  });
}
// Login a user with the specified email and password in the request //
export function signIn(
  _user: { email: string; password: string },
  res
) {
  user.signIn(_user, (err, data) => {
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
      res.json({ success: true, data: data});
    }
  });
}

export function session_user(res) {
  user.session_user((err, data) => {
    if (err)
    {
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while getting user session.",
      });
    }
    else {
      res.json({ success: true, data: data});
    }
  }
  )
}
export function signOut(res) {
  user.signOut((err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while logging out.",
      });
    else {
      res.json({ success: true, data: data });
    }
  });
}

