import supabase from "./db.js";

// Constructor
const code = function (code) {
  this.email = code.email;
  this.promocode = code.promocode;
};

code.checkCode = async (
  params: {
    email: string;
    promocode: string;
  },
  result
) => {
  // check if code is a coupon or certificate or package and get data//

  // Coupon //
  var { data: coupon, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", params.promocode);
  if (error) {
    return result(error, null);
  }
  // check if coupon is used by this email //
  if (coupon.length > 0) {
    var { data: coupon_used, error } = await supabase
      .from("used_coupons")
      .select("id")
      .eq("email", params.email)
      .eq("coupon_id", coupon[0].id);
    if (error) {
      return result(error, null);
    }

    if (coupon[0].expiry_date < Date.now() || coupon_used.length > 0) {
      return result({ message: "Coupon expired/used" }, null);
    }
    let resp = {
      code_type: "coupon",
      name: coupon[0].name,
      discount: coupon[0].discount,
      procedure_ids: coupon[0].procedure_ids,
    };
    return result(null, resp);
  }
  // Certificate //
  var { data: certificate, error } = await supabase
    .from("track_certificates")
    .select("*")
    .eq("code", params.promocode);
  if (error) {
    return result(error, null);
  }
  if (certificate.length > 0) {
    if (
      certificate[0].expiry_date < Date.now() ||
      certificate[0].discount_left == 0
    ) {
      return result({ message: "Certificate expired/exhausted" }, null);
    }
    let resp = {
      code_type: "certificate",
      name: certificate[0].name,
      discount_left: certificate[0].discount_left,
    };
    return result(null, resp);
  }
  // Package //
  // get client id //
  var { data: client, error } = await supabase
    .from("clients")
    .select("id")
    .eq("email", params.email);
  if (error) {
    return result(error, null);
  }
  if (client.length == 0) {
    return result({ message: "Client not found" }, null);
  }
  let client_id = client[0].id;
 
  // get client package //
  var _package: any = await supabase
    .from("client_packages")
    .select(
      `
    package_id, amount_left_in, expiry_date,
    packages (name, procedure_id)
    `
    )
    .eq("client_id", client_id)
    .eq("promocode", params.promocode);
  if (error) {
    return result(error, null);
  }
  if (_package.data.length > 0) {
    if (
      _package.data[0].expiry_date < Date.now() ||
      _package.data[0].amount_left_in == 0
    ) {
      return result({ message: "Package expired/exhausted" }, null);
    }
    let resp = {
      code_type: "package",
      name: _package.data[0].packages.name,
      amount_left_in: _package.data[0].amount_left_in,
      procedure_id: _package.data[0].packages.procedure_id,
    };

    return result(null, resp);
  }
  return result(null, { message: "Code not found!" });
};
code.useCode = async (
  params: {
    email: string;
    promocode: string;
    code_type: string;
    total_price: number;
  },
  result
) => {
  switch (params.code_type) {
    case "coupon":
      // get coupon id //
      var { data: coupon, error } = await supabase
        .from("coupons")
        .select("id")
        .eq("code", params.promocode);
      if (error) {
        return result(error, null);
      }

      //insert coupon and email into track_coupons table //
      var { data, error } = await supabase.from("used_coupons").insert([
        {
          email: params.email,
          coupon_id: coupon[0].id,
        },
      ]);
      if (error) {
        return result(error, null);
      }
      return result(null, { message: "Coupon successfully used!" });
      break;
    case "certificate":
      // subtract total price from certificate price //
      var { data: certificate, error } = await supabase
        .from("track_certificates")
        .select("*")
        .eq("code", params.promocode);
      if (error) {
        return result(error, null);
      }
      let new_price =
        certificate[0].discount_left - params.total_price > 0
          ? certificate[0].discount_left - params.total_price
          : 0;
      var { data, error } = await supabase
        .from("track_certificates")
        .update({ discount_left: new_price })
        .eq("code", params.promocode);
      if (error) {
        return result(error, null);
      }
      return result(null, { message: "Certificate successfully used!" });
      break;
    case "package":
      // get client id //
      var { data: client, error } = await supabase
        .from("clients")
        .select("*")
        .eq("email", params.email);
      if (error) {
        return result(error, null);
      }
      // substract 1 from package amount //
      var { data: _package, error } = await supabase
        .from("client_packages")
        .select("amount_left_in")
        .eq("client_id", client[0].id)
        .eq("promocode", params.promocode);
      if (error) {
        return result(error, null);
      }
      let new_amount = _package[0].amount_left_in - 1;
      var { data, error } = await supabase
        .from("client_packages")
        .update({ amount_left_in: new_amount })
        .eq("client_id", client[0].id)
        .eq("promocode", params.promocode);
      if (error) {
        return result(error, null);
      }
      return result(null, { message: "Package successfully used!" });
      break;
    default:
      return result(null, { message: "Code type not found!" });
  }
};
export default code;
