import supabase from "../models/db.js";
import PackageP from "../models/packages_model.js";

// packge interface
interface packs {
  package_id: number;
  amount_bought: number;
}
export async function getTotalCostPack(saloon_id: number, packs: packs[]) {
  //Loop through all packages and get the total price 
  let total = 0;
  switch (saloon_id) {
    case 3:
      for (const pack of packs) {
        const package_p = await PackageP.getPackById(pack.package_id);
        if (package_p.length > 0) {
          total += package_p[0].price_gbp * pack.amount_bought;
        }
      }
    break;
    default:
      for (const pack of packs) {
        const package_p = await PackageP.getPackById(pack.package_id);
        if (package_p.length > 0) {
          total += package_p[0].price * pack.amount_bought;
        }
      }
    break;
  }
  return { total, currency: saloon_id == 3 ? "gbp" : "eur" };
}