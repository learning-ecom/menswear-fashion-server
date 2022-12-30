import {nanoid} from "nanoid"
const voucher_codes = require("voucher-code-generator");



export const generateSessionToken = () => {
  const session_token = nanoid(10);
  return session_token;
};


export const couponGenerator = () => {
  let coupon: any = voucher_codes.generate({
    length: 6,
    count: 1,
  });
  let couponCode: string = coupon[0];
  return couponCode;
};


