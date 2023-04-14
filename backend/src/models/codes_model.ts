import supabase from "./db.js";

class PromoCode {
  static async checkCode(params) {
    try {
      const couponResponse = await PromoCode.checkCoupon(params);
      if (couponResponse) return couponResponse;

      const certificateResponse = await PromoCode.checkCertificate(params);
      if (certificateResponse) return certificateResponse;

      const packageResponse = await PromoCode.checkPackage(params);
      if (packageResponse) return packageResponse;

      return { message: "Code not found!" };
    } catch (error) {
      throw error;
    }
  }

  static async useCode(params) {
    try {
      switch (params.code_type) {
        case "coupon":
          return await PromoCode.useCoupon(params);
        case "certificate":
          return await PromoCode.useCertificate(params);
        case "package":
          return await PromoCode.usePackage(params);
        default:
          return { message: "Code type not found!" };
      }
    } catch (error) {
      throw error;
    }
  }

  // Helper methods for handling coupons, certificates, and packages
  static async checkCoupon(params) {
    try {
      const { data: coupon, error } = await supabase
        .from("coupons")
        .select("*")
        .eq("code", params.promocode);
      if (error) throw error;

      if (coupon.length > 0) {
        const { data: coupon_used, error } = await supabase
          .from("used_coupons")
          .select("id")
          .eq("email", params.email)
          .eq("coupon_id", coupon[0].id);
        if (error) throw error;

        if (coupon[0].expiry_date < Date.now() || coupon_used.length > 0) {
          throw { message: "Coupon expired/used" };
        }
        return {
          code_type: "coupon",
          name: coupon[0].name,
          discount: coupon[0].discount,
          procedure_ids: coupon[0].procedure_ids,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  static async checkCertificate(params) {
    try {
      const { data: certificate, error } = await supabase
        .from("track_certificates")
        .select("*")
        .eq("code", params.promocode);
      if (error) throw error;

      if (certificate.length > 0) {
        if (
          certificate[0].expiry_date < Date.now() ||
          certificate[0].discount_left == 0
        ) {
          throw { message: "Certificate expired/exhausted" };
        }
        return {
          code_type: "certificate",
          name: certificate[0].name,
          discount_left: certificate[0].discount_left,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  static async checkPackage(params) {
    try {
      const { data: client, error } = await supabase
        .from("clients")
        .select("id")
        .eq("email", params.email);
      if (error) throw error;

      if (client.length === 0) {
        throw { message: "Client not found" };
      }
      const client_id = client[0].id;

      const { data: _package, error: packageError } = await supabase
        .from("client_packages")
        .select(
          `
        package_id, amount_left_in, expiry_date,
        packages (name, procedure_id)
        `
        )
        .eq("client_id", client_id)
        .eq("promocode", params.promocode);
      if (packageError) throw packageError;

      if (_package.length > 0) {
        const packageData = _package[0];
        if (
          packageData.expiry_date < Date.now() ||
          packageData.amount_left_in == 0
        ) {
          throw { message: "Package expired/exhausted" };
        }
        const packageDetails = packageData.packages as {
          name: string;
          procedure_id: number;
        };
        return {
          code_type: "package",
          name: packageDetails.name,
          amount_left_in: packageData.amount_left_in,
          procedure_id: packageDetails.procedure_id,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  static async useCoupon(params) {
    try {
      const { data: coupon, error } = await supabase
        .from("coupons")
        .select("id")
        .eq("code", params.promocode);
      if (error) throw error;

      const { data, error: insertError } = await supabase
        .from("used_coupons")
        .insert([
          {
            email: params.email,
            coupon_id: coupon[0].id,
          },
        ]);
      if (insertError) throw insertError;

      return { message: "Coupon successfully used!" };
    } catch (error) {
      throw error;
    }
  }

  static async useCertificate(params) {
    try {
      const { data: certificate, error } = await supabase
        .from("track_certificates")
        .select("*")
        .eq("code", params.promocode);
      if (error) throw error;

      const new_price =
        certificate[0].discount_left - params.total_price > 0
          ? certificate[0].discount_left - params.total_price
          : 0;

      const { data, error: updateError } = await supabase
        .from("track_certificates")
        .update({ discount_left: new_price })
        .eq("code", params.promocode);
      if (updateError) throw updateError;

      return { message: "Certificate successfully used!" };
    } catch (error) {
      throw error;
    }
  }

  static async usePackage(params) {
    try {
      const { data: client, error } = await supabase
        .from("clients")
        .select("*")
        .eq("email", params.email);
      if (error) throw error;

      const { data: _package, error: packageError } = await supabase
        .from("client_packages")
        .select("amount_left_in")
        .eq("client_id", client[0].id)
        .eq("promocode", params.promocode);
      if (packageError) throw packageError;

      const new_amount = _package[0].amount_left_in - 1;

      const { data, error: updateError } = await supabase
        .from("client_packages")
        .update({ amount_left_in: new_amount })
        .eq("client_id", client[0].id)
        .eq("promocode", params.promocode);
      if (updateError) throw updateError;

      return { message: "Package successfully used!" };
    } catch (error) {
      throw error;
    }
  }
}

export default PromoCode;
