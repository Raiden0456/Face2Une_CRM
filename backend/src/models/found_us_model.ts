import supabase from "./db.js";

class Source {
  static async getAllSources() {
    const { data: sources, error } = await supabase
      .from("found_us")
      .select("id, source");
    if (error) throw error;
    return sources;
  }

  static async getSourceById(id: number) {
    const { data: sources, error } = await supabase
      .from("found_us")
      .select("*")
      .eq("id", id);
    if (error) throw error;
    return sources;
  }

  static async createSource(source: string) {
    const { data, error } = await supabase
      .from("found_us")
      .insert([{ source }])
      .select();
    if (error) throw error;
    return data;
  }

  static async updateSourceById(id: number, source: string) {
    const { data, error } = await supabase
      .from("found_us")
      .update([{ source }])
      .eq("id", id)
      .select();
    if (error) throw error;
    return data;
  }

  static async deleteSourceById(id: number) {
    const { data, error } = await supabase
      .from("found_us")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return data;
  }

  static async addWeight(sourceid: { id: number }) {
    const { data: source } = await supabase
      .from("found_us")
      .select("weight")
      .eq("id", sourceid.id);
    const { data, error } = await supabase
      .from("found_us")
      .update([{ weight: source[0].weight + 1 }])
      .eq("id", sourceid.id)
      .select();
    if (error) throw error;
    return data;
  }
}

export default Source;
