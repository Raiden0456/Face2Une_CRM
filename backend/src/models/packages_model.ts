// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";
import voucher_codes from "voucher-code-generator";

// Constructor
const package_p = function (package_p) {
  this.id = package_p.id;
  this.name = package_p.name;
  this.procedure_id = package_p.procedure_id;
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
    procedure_id: number;
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
        procedure_id: proc.procedure_id,
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
    procedure_id: number;
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
        procedure_id: proc.procedure_id,
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
  let all_promocodes = [];
  // loop through packages //
  for (let i = 0; i < packages.length; i++) {
    // get amount of procedures in package //
    let amount_proc = await supabase
      .from("packages")
      .select("amount")
      .eq("id", packages[i].package_id);

    // calculate total amount to add //
    let amount_add = amount_proc.data[0].amount * packages[i].amount_bought;

    // generate promocode //
    let promocode = voucher_codes.generate({
      length: 8,
      count: 1,
    });
    all_promocodes.push(promocode[0]);
    // insert packages //
    const { data, error } = await supabase
      .from("client_packages")
      .insert([
        {
          client_id: client_id,
          package_id: packages[i].package_id,
          amount_left_in: amount_add,
          promocode: promocode[0],
          expiry_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        },
      ])
    if (error) {
      return result(error, null);
    }
  }
  return result(null, {message: "Packages bought successfully", promocodes: all_promocodes});
};
// Using packages promocodes //
package_p.usePackage = async (
  client_id: number,
  promocode: string,
  result
) => {
  // Get current amount and expiry date in package //
  let current = await supabase
    .from("client_packages")
    .select("amount_left_in, expiry_date")
    .eq("client_id", client_id)
    .eq("promocode", promocode);
  let current_date = new Date();
  let formatted_current_date = current_date.toISOString().split('T')[0]
  // remove one procedure from package //
  if (current.data.length > 0) {
    if (current.data[0].amount_left_in > 0 && current.data[0].expiry_date >= formatted_current_date) {
      // update amount of procedures //
      const { data, error } = await supabase
        .from("client_packages")
        .update([
          {
            amount_left_in: current.data[0].amount_left_in - 1,
          },
        ])
        .eq("client_id", client_id)
        .eq("promocode", promocode)
      if (error) {
        return result(error, null);
      }
    }
    else {
      // Delete expired package promocode //
      const { data, error } = await supabase
        .from("client_packages")
        .delete()
        .eq("client_id", client_id)
        .eq("promocode", promocode)
      if (error) {
        return result(error, null);
      }
      
      return result({message: "Ivalid or expired promocode"}, null);
    }
  }
  else {
    return result({message: "Ivalid or expired promocode"}, null);
  }
  return result(null, {message: "Package promocode used successfully" });
};

export default package_p;
