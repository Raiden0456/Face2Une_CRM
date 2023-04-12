import supabase from "./db.js";

interface ProcedureData {
  id?: number;
  name: string;
  description: string;
  price: number;
  price_gbp: number;
  duration: number;
  additional: number;
  saloon_ids: number[];
};

class Procedure {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  additional: number;
  saloon_ids: number[];

  private static async fetchProcedures(
    additional: number,
    saloon_id: number,
    selectColumns: string
  ) {
    const { data: procedures, error } = await supabase
      .from("procedures")
      .select(selectColumns)
      .eq("additional", additional)
      .contains("saloon_ids", [saloon_id])
      .order(saloon_id == 3 ? "price_gbp" : "price", { ascending: true });
    if (error) {
      throw error;
    }
    return procedures;
  }

  static async getAllproc(additional: number, saloon_id: number, result: Function) {
    const selectColumns =
      saloon_id == 3
        ? "id, name, description, price_gbp, duration, additional, saloon_ids"
        : "id, name, description, price, duration, additional, saloon_ids";

    try {
      let procedures: any;
      if (additional == 0 || additional == 1) {
        procedures = await this.fetchProcedures(
          additional,
          saloon_id,
          selectColumns
        );
      } else {
        procedures = await this.fetchProcedures(
          additional,
          saloon_id,
          selectColumns
        );
      }
      result(null, procedures);
    } catch (error) {
      result(error, null);
    }
  }

  static async getProcById(id: number, result: Function) {
    try {
      const { data: procedures, error } = await supabase
        .from("procedures")
        .select("*")
        .eq("id", id);
      result(null, procedures);
    } catch (error) {
      result(error, null);
    }
  }

  static async getTotalCost(proc_ids: number[], saloon_id: number, result: Function) {
    try {
      let total = 0;
      const selectColumn = saloon_id == 3 ? "price_gbp" : "price";

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
      result(null, total);
    } catch (error) {
      result(error, null);
    }
  }

  static async createProc(proc: ProcedureData, result: Function) {
    try {
      const { data, error } = await supabase
        .from("procedures")
        .insert([
          {
            name: proc.name,

            description: proc.description,
            price: proc.price,
            price_gbp: proc.price_gbp,
            duration: proc.duration,
            additional: proc.additional,
            saloon_ids: proc.saloon_ids,
          },
        ])
        .select();
      result(null, data);
    } catch (error) {
      result(error, null);
    }
  }

  static async updateProcById(proc: ProcedureData, result: Function) {
    try {
      const { data, error } = await supabase
        .from("procedures")
        .update({
          name: proc.name,
          description: proc.description,
          price: proc.price,
          price_gbp: proc.price_gbp,
          duration: proc.duration,
          additional: proc.additional,
          saloon_ids: proc.saloon_ids,
        })
        .eq("id", proc.id)
        .select();
      result(null, data);
    } catch (error) {
      result(error, null);
    }
  }

  static async deleteProcById(id: number, result: Function) {
    try {
      const { data, error } = await supabase
        .from("procedures")
        .delete()
        .eq("id", id);
      result(null, data);
    } catch (error) {
      result(error, null);
    }
  }
}

export default Procedure;
