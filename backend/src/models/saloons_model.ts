import supabase from "./db.js";

interface SaloonParams {
    id?: number;
    country: string;
    city: string;
    address: string;
    index: string;
    image_src: string;
}

class Saloon {
    static async getAllSal(){
        const { data: saloons, error } = await supabase
            .from("saloons")
            .select("*")
            .order("id", { ascending: true });
        if (error) throw error;
        return saloons;
    }

    static async getSalById(id: number){
        const { data: saloons, error } = await supabase
            .from("saloons")
            .select("*")
            .eq("id", id);
        if (error) throw error;
        return saloons;
    }

    static async createSal(sal: SaloonParams){
        const { data, error } = await supabase
            .from("saloons")
            .insert([sal])
            .select();
        if (error) throw error;
        return data;
    }

    static async updateSalById(sal: SaloonParams){
        if (!sal.id) {
            throw new Error("Saloon id is required for updating.");
        }
        const { data, error } = await supabase
            .from("saloons")
            .update(sal)
            .eq("id", sal.id)
            .select();
        if (error) throw error;
        return data;
    }

    static async deleteSalById(id: number){
        const { data, error } = await supabase
            .from("saloons")
            .delete()
            .eq("id", id);
        if (error) throw error;
        return data;
    }
}

export default Saloon;
