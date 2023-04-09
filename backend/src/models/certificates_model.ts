// import { QueryResult } from "pg";
// import client from "./db.js";
import supabase from "./db.js";
import voucher_codes from "voucher-code-generator";

// Constructor
const certificate = function (certificate) {
  this.id = certificate.id;
  this.name = certificate.name;
  this.price = certificate.price;
};

certificate.getAllcert = async (saloon_id: number, result) => {
  const selectFields = (saloon_id == 3) ? "id, name, price_gbp" : "id, name, price";
    let { data: certificates, error } = await supabase
      .from("certificates")
      .select(selectFields)
      .order(saloon_id === 3 ? "price_gbp" : "price", { ascending: true });
  return result(error, certificates);
};

certificate.getCertById = async (id: number, result) => {
  let { data: certificates, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", id);
  return result(error, certificates);
};

certificate.createCert = async (
  cert: {
    name: string;
    price: number;
    price_gbp: number;
  },
  result
) => {
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
  return result(error, data);
};

certificate.updateCertById = async (
  cert: {
    id: number;
    name: string;
    price: number;
    price_gbp: number;
  },
  result
) => {
  const { data, error } = await supabase
    .from("certificates")
    .update([
      {
        name: cert.name,
        price: cert.price,
        price_gbp: cert.price_gbp,
      },
    ])
    .eq("id", cert.id)
    .select();
  return result(error, data);
};

certificate.deleteCertById = async (id: number, result) => {
  const { data, error } = await supabase
    .from("certificates")
    .delete()
    .eq("id", id);
  return result(error, data);
};

// Buying and tracking certificates //
certificate.buyCertificate = async (
  client_id: number,
  certificate_id: number,
  result
) => {
    var respo: any = await supabase
      .from("certificates")
      .select("*")
      .eq("id", certificate_id);
    if (error) {
      return result(error, null);
    }
    let cert_price = respo.data[0].price ? respo.data[0].price : 0;
    let cert_price_gbp = respo.data[0].price_gbp ? respo.data[0].price_gbp : 0;
    // generate promocode //
    let promocode = voucher_codes.generate({
      length: 8,
      count: 1,
    });
    // insert certificates //
    var { data, error } = await supabase
      .from("track_certificates")
      .insert([
        {
          certificate_id: certificate_id,
          code: promocode[0],
          discount_left: cert_price,
          discount_left_gbp: cert_price_gbp,
          expiry_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        },
      ])
    if (error) {
      return result(error, null);
    }
  return result(null, {message: "Certificate bought successfully", code: promocode[0], gift_amount: cert_price, gift_amount_gbp: cert_price_gbp});
};

export default certificate;
