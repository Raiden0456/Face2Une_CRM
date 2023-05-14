import supabase from "../models/db.js";
import PromoCode from "../models/codes_model.js";

// // Calculate total price //
// function async getTotalPrice(
//   main_proc: number,
//   additional_procs: number[],
//   saloon_id: number
// ) {
//   let all_ids: number[];
//   all_ids = [];
//   all_ids.push(main_proc);
//   all_ids = all_ids.concat(additional_procs);

//   // get total price of procedures by all_ids using procedure.getTotalCost //
//   return new Promise(async (resolve, reject) => {
//     Procedure.getTotalCost(all_ids, saloon_id, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }

export async function getTotalCost(proc_ids: number[], saloon_id: number, promocode?: { email: string; code: string }) {
  try {
    let total = 0;
    let discount_percentage = 0;
    let discount_money = 0;
    const selectColumn = saloon_id == 3 ? "price_gbp" : "price";
    const currency = saloon_id == 3 ? "gbp" : "eur";
    // Check if promocode is valid
    if (promocode) {
      const promocode_data = await PromoCode.checkCode(promocode) as any;
      if (promocode_data.message) {
        throw promocode_data.message;
      }

      if (promocode_data) {
        switch (promocode_data.code_type) {
          case "package":
            console.log("Using package promocode")
            if (promocode_data.amount_left_in > 0) {
              // Delete the procedure from proc_ids for what promocode was used
              const index = proc_ids.indexOf(promocode_data.procedure_id);
              if (index > -1) {
                proc_ids.splice(index, 1);
              }
            }
            break;
          case "coupon":
            console.log("Using coupon promocode")
            discount_percentage = promocode_data.discount;
            break;
          case "certificate":
            console.log("Using certificate promocode")
            discount_money = promocode_data.discount_left;
            break;
        }
      }
      else {
        throw "Promocode is not valid";
      }
    }
    
    for (let i = 0; i < proc_ids.length; i++) {
      const resp: any = await supabase
        .from("procedures")
        .select(selectColumn)
        .eq("id", proc_ids[i]);

      if (resp.error) {
        throw resp.error;
      }
      total += resp.data[0].price
        ? resp.data[0].price
        : resp.data[0].price_gbp;
    }
    total = total - (total * discount_percentage) / 100 - discount_money; 
    return({total, currency});
  } catch (error) {
    return(error);
  }
}
//////////////////////////