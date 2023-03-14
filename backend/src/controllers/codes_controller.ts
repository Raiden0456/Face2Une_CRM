import code from "../models/codes_model.js";
import { join } from "path";

// check code type and return the code object //
export function checkCodeType(email: string, promocode: string, res) {
  let params = {
    email: email,
    promocode: promocode,
  };
  code.checkCode(params, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while checking code.",
      });
    else if (data == null) {
      res.status(404).json({
        success: false,
        message: `No code found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}

// use code //
export function useCode(
  params: {
    email: string;
    promocode: string;
    code_type: string;
    total_price: number;
  },
  res
) {
  code.useCode(params, (err, data) => {
    if (err)
      res.status(500).json({
        success: false,
        message: err.message || "Some error occurred while using code.",
      });
    else if (data == null) {
      res.status(404).json({
        success: false,
        message: `No code found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  });
}
