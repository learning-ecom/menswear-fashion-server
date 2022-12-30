import { ICoupon } from "../helpers/interface.helper";
import CouponModel from "../models/coupon.model";






const CouponService ={

   createCoupon:async(query:ICoupon)=>{
      const createCoupon:ICoupon=await CouponModel.create(query);
      return createCoupon
   },

   getAllCoupon:async(query:any)=>{
  const getAllCoupon= await CouponModel.find({})
  return getAllCoupon
   },

   getCoupon:async(query:any)=>{
    const getCoupon=await CouponModel.findOne({})
    return getCoupon
   },
   
//    updateCoupon:as


   deleteCoupon:async(query:any)=>{
    const deleteCoupon=await CouponModel.updateOne(query)
    return deleteCoupon

   }

}

export default CouponService