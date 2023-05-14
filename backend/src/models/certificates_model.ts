// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";
import voucher_codes from "voucher-code-generator";

//Interface for the certificate model

interface cert {
  id?: number;
  name: string;
  price: number;
  price_gbp: number;
}
class Certificate {
  static async getAllcert(saloon_id: number) {
    const selectFields =
      saloon_id == 3 ? "id, name, price_gbp" : "id, name, price";
    const { data: certificates, error } = await supabase
      .from("certificates")
      .select(selectFields)
      .order(saloon_id == 3 ? "price_gbp" : "price", { ascending: true });

    if (error) throw error;
    return certificates;
  }

  static async getCertById(id: number) {
    const { data: certificates, error } = await supabase
      .from("certificates")
      .select("*")
      .eq("id", id);

    if (error) throw error;
    return certificates;
  }

  static async createCert(cert: cert) {
    const { data, error } = await supabase
      .from("certificates")
      .insert([
        {
          name: cert.name,
          price: cert.price,
          price_gbp: cert.price_gbp,
        },
      ])
      .select();

    if (error) throw error;
    return data;
  }

  static async updateCertById(cert: cert) {
    const { data, error } = await supabase
      .from("certificates")
      .update({
        name: cert.name,
        price: cert.price,
        price_gbp: cert.price_gbp,
      })
      .eq("id", cert.id)
      .select();

    if (error) throw error;
    return data;
  }

  static async deleteCertById(id: number) {
    const { data, error } = await supabase
      .from("certificates")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return data;
  }

  // Buying and tracking certificates //
  static async buyCertificate(
    client_id: number,
    certificate_id: number,
    saloon_id: number
  ) {
    const respo: any = await supabase
      .from("certificates")
      .select("*")
      .eq("id", certificate_id);
    if (respo.error) {
      return respo.error;
    }
    let cert_price, cert_price_gbp;
    if (saloon_id == 3) {
      cert_price = 0;
      cert_price_gbp = respo.data[0].price_gbp
        ? respo.data[0].price_gbp
        : 0;
    } else {
      cert_price = respo.data[0].price ? respo.data[0].price : 0;
      cert_price_gbp = 0;
    }

    // generate promocode //
    const promocode = voucher_codes.generate({
      length: 8,
      count: 1,
    });
    // insert certificates //
    const { data, error } = await supabase
      .from("track_certificates")
      .insert([
        {
          certificate_id: certificate_id,
          code: promocode[0],
          discount_left: cert_price,
          discount_left_gbp: cert_price_gbp,
          expiry_date: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ),
          client_id: client_id,
        },
      ])
      .select();
    if (error) {
      return error;
    }
    return data;
  }
}

export default Certificate;
