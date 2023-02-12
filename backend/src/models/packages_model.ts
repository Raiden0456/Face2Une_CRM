// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";

// Constructor
const package_p = function (package_p) {
  this.id = package_p.id;
  this.name = package_p.name;
  this.price = package_p.price;
  this.amount = package_p.amount;
};

package_p.getAllpack = async (result) => {
    let { data: package_ps, error } = await supabase
      .from("packages")
      .select("*")
      .order("price", { ascending: true });
  return result(error, package_ps);
};

package_p.getPackById = async (id: number, result) => {
  let { data: package_ps, error } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id);
  return result(error, package_ps);
};

package_p.createPack = async (
  proc: {
    name: string;
    price: number;
    amount: number;
  },
  result
) => {
  const { data, error } = await supabase
    .from("packages")
    .insert([
      {
        name: proc.name,
        price: proc.price,
        amount: proc.amount,
      },
    ])
    .select();
  return result(error, data);
};

package_p.updatePackById = async (
  proc: {
    id: number;
    name: string;
    price: number;
    amount: number;
  },
  result
) => {
  const { data, error } = await supabase
    .from("packages")
    .update([
      {
        name: proc.name,
        price: proc.price,
        amount: proc.amount,
      },
    ])
    .eq("id", proc.id)
    .select();
  return result(error, data);
};

package_p.deletePackById = async (id: number, result) => {
  const { data, error } = await supabase
    .from("packages")
    .delete()
    .eq("id", id);
  return result(error, data);
};

// Buying and tracking packages //
package_p.buyPackages = async (
  client_id: number,
  packages: [{
    package_id: number;
    amount_bought: number;
  }],
  result
) => {
  // loop through packages //
  for (let i = 0; i < packages.length; i++) {
    // get amount of procedures in package //
    let amount_proc = await supabase
      .from("packages")
      .select("amount")
      .eq("id", packages[i].package_id);

    // calculate total amount to add //
    let amount_add = amount_proc.data[0].amount * packages[i].amount_bought;

    // check if client has already bought this package, if so, get current amount//
    let amount_current = await supabase
      .from("client_packages")
      .select("amount_left_in")
      .eq("client_id", client_id)
      .eq("package_id", packages[i].package_id);
    
    if (amount_current.data.length > 0) {
      // update amount of procedures //
      const { data, error } = await supabase
        .from("client_packages")
        .update([
          {
            amount_left_in: amount_current.data[0].amount_left_in + amount_add,
          },
        ])
        .eq("client_id", client_id)
        .eq("package_id", packages[i].package_id)
      if (error) {
        return result(error, null);
      }
    }
    else {
      // insert packages //
      const { data, error } = await supabase
        .from("client_packages")
        .insert([
          {
            client_id: client_id,
            package_id: packages[i].package_id,
            amount_left_in: amount_add,
          },
        ])
      if (error) {
        return result(error, null);
      }
    }
  }
  return result(null, {message: "Packages bought successfully" });
};

// Using packages //
package_p.usePackage = async (
  client_id: number,
  package_id: number,
  result
) => {
  // remove one procedure from package //
  let amount_current = await supabase
    .from("client_packages")
    .select("amount_left_in")
    .eq("client_id", client_id)
    .eq("package_id", package_id);

  if (amount_current.data.length > 0) {
    if (amount_current.data[0].amount_left_in > 0) {
      // update amount of procedures //
      const { data, error } = await supabase
        .from("client_packages")
        .update([
          {
            amount_left_in: amount_current.data[0].amount_left_in - 1,
          },
        ])
        .eq("client_id", client_id)
        .eq("package_id", package_id)
      if (error) {
        return result(error, null);
      }
    }
    else {
      // Delete expired package //
      const { data, error } = await supabase
        .from("client_packages")
        .delete()
        .eq("client_id", client_id)
        .eq("package_id", package_id)
      if (error) {
        return result(error, null);
      }
      
      return result({message: "Client's package is expired"}, null);
    }
  }
  else {
    return result({message: "Client did not buy this package"}, null);
  }
  return result(null, {message: "Package used successfully" });
};

export default package_p;
