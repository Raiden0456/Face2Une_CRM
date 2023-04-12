import supabase from "../models/db.js";
import p_validator from "validate-phone-number-node-js";

const getUserById = async (id) => {
  const { data } = await supabase
    .from("clients")
    .select("user_id")
    .eq("id", id);

  return data ? data[0] : undefined;
};

const isEmailInUse = async (email, clientId) => {
  const { data } = await supabase
    .from("clients")
    .select("id")
    .eq("email", email);

  return data && data.length !== 0 && data[0].id !== clientId;
};

const isValidPhone = (phone) => p_validator.validate(phone);

const updateClient = async (client) => {
  const { error, data } = await supabase
    .from("clients")
    .update([
      {
        full_name: client.first_name + " " + client.last_name,
        phone: client.phone,
        email: client.email,
        user_id: client.user_id,
      },
    ])
    .eq("id", client.id)
    .select();

  return { error, data };
};

export default {
    getUserById,
    isEmailInUse,
    isValidPhone,
    updateClient,
}