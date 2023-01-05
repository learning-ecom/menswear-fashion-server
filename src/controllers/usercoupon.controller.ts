import { USERCOUPON_RESPONSE } from "../constants/response.constant";
import {
  INextFunction,
  IRequest,
  IResponse,
} from "../helpers/interface.helper";
import HTTP from "http-status-codes";
import UserCouponService from "../services/USERcoupon.service";

const UserCouponController = {
  createUserCoupon: async (req: IRequest, res: IResponse, next: INextFunction) => {
    try {
        const query: any = {
                booking:  req.body.booking_id,
                user:req.decoded.id,
                coupon:req.body.coupon_id
        };
      
        const createUserCoupon = await UserCouponService.createUserCoupon(query);
        if(!createUserCoupon){
            res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:USERCOUPON_RESPONSE.FAILED, message:USERCOUPON_RESPONSE.USERCOUPON_DOESNT_CREATED})
          }       
        res.send({ status:USERCOUPON_RESPONSE.SUCCESS, message:USERCOUPON_RESPONSE.USERCOUPON_CREATED ,data:createUserCoupon});
      }

    catch (error) {
        error.desc = USERCOUPON_RESPONSE.USERCOUPON_DOESNT_CREATED;
        next(error);
    }
    },
    


    getManyUserCoupon:async(req:IRequest,res:IResponse,next:INextFunction)=>{
      try {
          const query={
             user:req.decoded.id,
          }
          let getManyUserCoupon = await UserCouponService.getManyUserCoupon(query)
  
          if(!getManyUserCoupon){
           return   res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:USERCOUPON_RESPONSE.FAILED, message:USERCOUPON_RESPONSE.GET_ALL_DOESNT_USERCOUPON});
          }       
          res.send({ status:USERCOUPON_RESPONSE.SUCCESS, message:USERCOUPON_RESPONSE.GET_ALL_USERCOUPON,data:getManyUserCoupon  ,count:getManyUserCoupon .length});
          } catch (error) {
            error.desc = USERCOUPON_RESPONSE.GET_ALL_DOESNT_USERCOUPON;
            next(error);
          }
    },


    getUserCoupon:async(req:IRequest,res:IResponse,next:INextFunction)=>{
      try {
        const query={user:req.decoded.id,_id:req.body.booking_id}
        
        const getUserCoupon:any = await UserCouponService.getUserCoupon(query)
        if(!getUserCoupon){
          res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:USERCOUPON_RESPONSE.FAILED, message:USERCOUPON_RESPONSE.GET_USERCOUPON})
          }  
            
          res.send({ status:USERCOUPON_RESPONSE.SUCCESS, message:USERCOUPON_RESPONSE.GET_USERCOUPON ,data:getUserCoupon});
          } catch (error) {
            error.desc = USERCOUPON_RESPONSE.GET_USERCOUPON;
            next(error);
          }
    },

};


export default UserCouponController