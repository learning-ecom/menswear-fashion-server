import {nanoid} from "nanoid"
import voucher_codes from "voucher-code-generator"
import DateGenerator from 'random-date-generator'
import moment from "moment";



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


export const dateGenerator=()=>{
   DateGenerator.getRandomDate() // random date

let startDate = new Date();
const endDate = new Date();
endDate.setDate(endDate.getDate() + 7);
 return DateGenerator.getRandomDateInRange(startDate, endDate); // random date in range


}