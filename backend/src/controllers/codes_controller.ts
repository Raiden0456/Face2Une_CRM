import  PromoCode  from "../models/codes_model.js";

// check code type and return the code object //
export async function checkCodeType(email: string, promocode: string, res): Promise<any> {
  const params = {
    email: email,
    promocode: promocode,
  };
  try {
    const data = await PromoCode.checkCode(params);
    res.json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while checking code.",
    });
  }
}

// use code //
export async function useCode(params, res) {
  try {
    const data = await PromoCode.useCode(params);
    res.json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while using code.",
    });
  }
}
