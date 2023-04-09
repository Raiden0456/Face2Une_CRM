import supabase from "./db.js";

// Constructor
const saloon = function (saloon) {
    this.id = saloon.id;
    this.country = saloon.country;
    this.city = saloon.city;
    this.address = saloon.address;
    this.index = saloon.index;
    this.image_src = saloon.image_src;
};

saloon.getAllSal = async (result) => {
    let { data: saloons, error } = await supabase
        .from("saloons")
        .select("*")
        .order("id", { ascending: true });
    return result(error, saloons);
}

saloon.getSalById = async (id: number, result) => {
    let { data: saloons, error } = await supabase
        .from("saloons")
        .select("*")
        .eq("id", id);
    return result(error, saloons);
}

saloon.createSal = async (
    sal: {
        country: string;
        city: string;
        address: string;
        index: string;
        image_src: string;
    },
    result
) => {
    const { data, error } = await supabase
        .from("saloons")
        .insert([
            {
                country: sal.country,
                city: sal.city,
                address: sal.address,
                index: sal.index,
                image_src: sal.image_src,
            },
        ])
        .select();
    return result(error, data);
}

saloon.updateSalById = async (
    sal: {
        id: number;
        country: string;
        city: string;
        address: string;
        index: string;
        image_src: string;
    },
    result
) => {
    const { data, error } = await supabase
        .from("saloons")
        .update([
            {
                country: sal.country,
                city: sal.city,
                address: sal.address,
                index: sal.index,
                image_src: sal.image_src,
            },
        ])
        .eq("id", sal.id)
        .select();
    return result(error, data);
}

saloon.deleteSalById = async (id: number, result) => {
    const { data, error } = await supabase
        .from("saloons")
        .delete()
        .eq("id", id);
    return result(error, data);
}

export default saloon;