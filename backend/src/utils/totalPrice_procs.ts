import supabase from "../models/db.js";

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

export async function getTotalCost(proc_ids: number[], saloon_id: number) {
  try {
    let total = 0;
    const selectColumn = saloon_id == 3 ? "price_gbp" : "price";

    const currency = saloon_id == 3 ? "gbp" : "eur";
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
    return({total, currency});
  } catch (error) {
    return(error);
  }
}
//////////////////////////