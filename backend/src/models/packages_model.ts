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

package_p.getAllpack = async (saloon_id: number, result) => {
  const selectFields = (saloon_id == 3) ? "id, name, procedure_id, price_gbp, amount" : "id, name, procedure_id, price, amount";
  let { data: package_ps, error } = await supabase
    .from("packages")
    .select(selectFields)
    .order(saloon_id == 3 ? "price_gbp" : "price", { ascending: true });
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
  pack: {
    name: string;
    procedure_id: number;
    price: number;
    price_gbp: number;
    amount: number;
  },
  result
) => {
  const { data, error } = await supabase
    .from("packages")
    .insert([
      {
        name: pack.name,
        procedure_id: pack.procedure_id,
        price: pack.price,
        price_gbp: pack.price_gbp,
        amount: pack.amount,
      },
    ])
    .select();
  return result(error, data);
};

package_p.updatePackById = async (
  pack: {
    id: number;
    name: string;
    procedure_id: number;
    price: number;
    price_gbp: number;
    amount: number;
  },
  result
) => {
  const { data, error } = await supabase
    .from("packages")
    .update([
      {
        name: pack.name,
        procedure_id: pack.procedure_id,
        price: pack.price,
        price_gbp: pack.price_gbp,
        amount: pack.amount,
      },
    ])
    .eq("id", pack.id)
    .select();
  return result(error, data);
};

package_p.deletePackById = async (id: number, result) => {
  const { data, error } = await supabase.from("packages").delete().eq("id", id);
  return result(error, data);
};

// Buying and tracking packages //
package_p.buyPackages = async (
  client_id: number,
  packages: [
    {
      package_id: number;
      amount_bought: number;
    }
  ],
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
    const { data, error } = await supabase.from("client_packages").insert([
      {
        client_id: client_id,
        package_id: packages[i].package_id,
        amount_left_in: amount_add,
        promocode: promocode[0],
        expiry_date: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ),
      },
    ]);
    if (error) {
      return result(error, null);
    }
  }
  // TODO: delete promocode from console //
  return result(null, {message: "Packages bought successfully", promocodes: all_promocodes});
};

export default package_p;
