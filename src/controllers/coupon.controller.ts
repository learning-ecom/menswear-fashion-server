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
};


export default CouponController