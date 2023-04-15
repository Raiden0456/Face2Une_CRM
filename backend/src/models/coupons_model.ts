import supabase from "./db.js";
import voucher_codes from "voucher-code-generator";
import { getPaginationBounds } from "../utils/pagination.js";

export interface CouponData {
  id?: number;
  name: string;
  code: string;
  procedure_ids: number[];
  discount: number;
  expiry_date: Date;
}

interface CouponParams {
  index: number;
  per_page: number;
  filter_like: string;
  column: string;
  value: any;
}

class Coupon {
  static async getAllcoupon(params: CouponParams) {
    const { start, end } = getPaginationBounds(params.index, params.per_page);
    let resp;
    let total;

    if (params.filter_like) {
      resp = await supabase
        .from("coupons")
        .select("*")
        .or(
          "name.ilike.%" +
            params.filter_like +
            "%, code.ilike.%" +
            params.filter_like +
            "%"
        )
        .range(start, end);

      for (let i = 0; i < resp.data.length; i++) {
        const { data: procedures } = await supabase
          .from("procedures")
          .select("name")
          .in("id", resp.data[i].procedure_ids);
        resp.data[i].procedure_names = procedures.map((p) => p.name);
      }

      total = await supabase
        .from("coupons")
        .select("id")
        .or(
          "name.ilike.%" +
            params.filter_like +
            "%, code.ilike.%" +
            params.filter_like +
            "%"
        );
    } else {
      if ((params.column && !params.value) || (!params.column && params.value))
        return { error: null, data: [], total: 0 };

      resp = params.value
        ? await supabase
            .from("coupons")
            .select("*")
            .eq(params.column, params.value)
            .range(start, end)
        : await supabase.from("coupons").select("*").range(start, end);

      for (let i = 0; i < resp.data.length; i++) {
        const { data: procedures } = await supabase
          .from("procedures")
          .select("name")
          .in("id", resp.data[i].procedure_ids);
        resp.data[i].procedure_names = procedures.map((p) => p.name);
      }

      total = params.value
        ? await supabase
            .from("coupons")
            .select("id")
            .eq(params.column, params.value)
        : await supabase.from("coupons").select("id");
    }

    return { error: resp.error, data: resp.data, total: total.data.length };
  }

  static async createCoupon(couponData: CouponData) {
    const { data, error } = await supabase
      .from("coupons")
      .insert([
        {
          name: couponData.name,
          code: couponData.code,
          procedure_ids: couponData.procedure_ids,
          discount: couponData.discount,
          expiry_date: couponData.expiry_date,
        },
      ])
      .select();

    if (error) {
      throw error;
    }
    return data;
  }

  static async updateCouponById(couponData: CouponData): Promise<Coupon> {
    const { data, error } = await supabase
      .from("coupons")
      .update([
        {
          name: couponData.name,
          code: couponData.code,
          procedure_ids: couponData.procedure_ids,
          discount: couponData.discount,
          expiry_date: couponData.expiry_date,
        },
      ])
      .eq("id", couponData.id)
      .select();
    if (error) {
      throw error;
    }
    return data[0];
  }

  static async deleteCouponById(id: number): Promise<void> {
    const { error } = await supabase.from("coupons").delete().eq("id", id);
    if (error) {
      throw error.message;
    }
  }
}

export default Coupon;
