import { ICoupon } from "../helpers/interface.helper";
import CouponModel from "../models/coupon.model";
import UserCouponService from "./usercoupon.service";
import _ from 'lodash'
import { COUPON_RESPONSE } from "../constants/response.constant";






const CouponService ={

   createCoupon:async(query:ICoupon)=>{
      const createCoupon:ICoupon=await CouponModel.create(query);
      return createCoupon
   },

    couponVerify:async(coupon?:any,userId?:string,quantity?:number)=>{

      if(coupon.valid_to<new Date()){
        return{ message:COUPON_RESPONSE.COUPON_EXPRIED,status:true}
      }

      const getUsedCoupon:any = await  UserCouponService.getManyUserCoupon({user: userId,coupon:coupon._id})
      if(!getUsedCoupon.repeat && !getUsedCoupon){
         return { message: COUPON_RESPONSE.COUPON_ALREADY_USED, status: false };
      }

      if(!(coupon.order_quantity<=quantity)){
         return { message: `Coupon Only Accepted The 10% ${coupon.order_quantity} Product Above`, status: false };
      }

    },
      getManyCoupon:async(query:any)=>{
   const getManyCoupon= await CouponModel.find({}).lean()
   return getManyCoupon
      },

   getCoupon:async(query:any)=>{
    const getCoupon=await CouponModel.findOne(query).lean()
    return getCoupon
   },
  
//    updateCoupon:
   deleteCoupon:async(query:any)=>{
    const deleteCoupon=await CouponModel.updateOne(query).lean()
    return deleteCoupon

   }

}

export default CouponService