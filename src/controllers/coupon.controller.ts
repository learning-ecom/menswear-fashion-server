import { COUPON_RESPONSE } from "../constants/response.constant";
import { couponGenerator } from "../helpers/function.helper";
import {
  INextFunction,
  IRequest,
  IResponse,
} from "../helpers/interface.helper";
import HTTP from "http-status-codes";

import CouponService from "../services/coupon.service";

const CouponController = {
  createCoupon: async (req: IRequest, res: IResponse, next: INextFunction) => {
    try {
        const couponCode: any = await couponGenerator();
        const { users, ...body } = req.body;
        const query: any = {
            ...body,
            code: couponCode,
        };
        if (users) {
            query.users =[...users];
        }

        const createCoupon = await CouponService.createCoupon(query);
        if(!createCoupon){
            res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:COUPON_RESPONSE.FAILED, message:COUPON_RESPONSE.COUPON_DOESNT_CREATED})
          }       
        res.send({ status:COUPON_RESPONSE.SUCCESS, message:COUPON_RESPONSE.COUPON_CREATED ,data:createCoupon});
      }

    catch (error) {
        error.desc = COUPON_RESPONSE.COUPON_DOESNT_CREATED;
        next(error);
    }
    },
    
    couponVerify: async (req: IRequest, res: IResponse, next: INextFunction) => {
       try {
        const {code,coupon_id,quantity}= req.body
        const query:any={
          code:code,
          user:req.body.id
        }
        if(coupon_id){
          query.coupon_id=coupon_id

        }
        const getCoupon:any = await CouponService.getCoupon(query)
        if(!getCoupon){
          res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:COUPON_RESPONSE.FAILED, message:COUPON_RESPONSE.GET_COUPON})
          }       

       const couponVerifyResponse = await CouponService.couponVerify(getCoupon,req.decoded.id,quantity)
       if(!couponVerifyResponse.status || couponVerifyResponse.message){
        res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:COUPON_RESPONSE.FAILED, message:couponVerifyResponse.message || "Failed to apply a coupon"})
        }    
        if(couponVerifyResponse){
          res.send({ status:COUPON_RESPONSE.SUCCESS, message:COUPON_RESPONSE.COUPON_VERIFIED});
        }

      }
        catch (error) {
          error.desc = COUPON_RESPONSE.COUPON_DOESNT_VERIFIED;
          next(error);
      }

    },

    getManyCoupon:async(req:IRequest,res:IResponse,next:INextFunction)=>{
      try {
          const query={
             user:req.decoded.id,
          }
          let getManyCoupon = await CouponService.getManyCoupon(query)
  
          if(!getManyCoupon){
           return   res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:COUPON_RESPONSE.FAILED, message:COUPON_RESPONSE.GET_ALL_DOESNT_COUPON});
          }       
          res.send({ status:COUPON_RESPONSE.SUCCESS, message:COUPON_RESPONSE.GET_ALL_COUPON,data:getManyCoupon ,count:getManyCoupon.length});
          } catch (error) {
            error.desc = COUPON_RESPONSE.GET_ALL_DOESNT_COUPON;
            next(error);
          }
    },


    getCoupon:async(req:IRequest,res:IResponse,next:INextFunction)=>{
      try {
        const query={user:req.decoded.id,_id:req.body.coupon_id}
        
        const getCoupon:any = await CouponService.getCoupon(query)
        if(!getCoupon){
          res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:COUPON_RESPONSE.FAILED, message:COUPON_RESPONSE.GET_COUPON})
          }  
            
          res.send({ status:COUPON_RESPONSE.SUCCESS, message:COUPON_RESPONSE.GET_COUPON ,data:getCoupon});
          } catch (error) {
            error.desc = COUPON_RESPONSE.GET_COUPON;
            next(error);
          }
    },

};


export default CouponController