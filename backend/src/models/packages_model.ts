import supabase from "./db.js";
import voucher_codes from "voucher-code-generator";

class PackageP {

  static async getAllPack(saloon_id) {
    const selectFields =
      saloon_id == 3
        ? "id, name, procedure_id, price_gbp, amount"
        : "id, name, procedure_id, price, amount";
    const { data: package_ps, error } = await supabase
      .from("packages")
      .select(selectFields)
      .order(saloon_id == 3 ? "price_gbp" : "price", { ascending: true });

    if (error) throw error;
    return package_ps;
  }

  static async getPackById(id) {
    const { data: package_ps, error } = await supabase
      .from("packages")
      .select("*")
      .eq("id", id);

    if (error) throw error;
    return package_ps;
  }

  static async createPack(pack) {
    const { data, error } = await supabase.from("packages").insert([
      {
        name: pack.name,
        procedure_id: pack.procedure_id,
        price: pack.price,
        price_gbp: pack.price_gbp,
        amount: pack.amount,
      },
    ],
    )
    .select();

    if (error) throw error;
    return data;
  }

  static async updatePackById(pack) {
    const { data, error } = await supabase
      .from("packages")
      .update({
        name: pack.name,
        procedure_id: pack.procedure_id,
        price: pack.price,
        price_gbp: pack.price_gbp,
        amount: pack.amount,
      })
      .eq("id", pack.id)
      .select();

    if (error) throw error;
    return data;
  }

  static async deletePackById(id) {
    const { data, error } = await supabase
      .from("packages")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return data;
  }

  static async buyPackages(client_id, packages) {
    let all_promocodes = [];
    for (let i = 0; i < packages.length; i++) {
      const { data: amount_proc } = await supabase
        .from("packages")
        .select("amount")
        .eq("id", packages[i].package_id);

      let amount_add = amount_proc[0].amount * packages[i].amount_bought;

      let promocode = voucher_codes.generate({
        length: 8,
        count: 1,
      });
      all_promocodes.push(promocode[0]);

      const { error } = await supabase.from("client_packages").insert([
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

      if (error) throw error;
    }
    return { message: "Packages bought successfully", promocodes: all_promocodes };
  }
}

export default PackageP;
