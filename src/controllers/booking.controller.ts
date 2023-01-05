import { BOOKING_RESPONSE } from "../constants/response.constant";
import {
  INextFunction,
  IRequest,
  IResponse,
} from "../helpers/interface.helper";
import HTTP from "http-status-codes";

import BookingService from "../services/Booking.service";
import { BOOKING } from "../constants/booking.constants";
import UserCouponService from "../services/usercoupon.service";

const BookingController = {
  createBooking: async (req: IRequest, res: IResponse, next: INextFunction) => {
    try {
       req.body.user = req.decoded.id,
       req.body.status = BOOKING.PLACED
        const createBooking = await BookingService.createBooking(req.body);
        if(!createBooking){
            res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:BOOKING_RESPONSE.FAILED, message:BOOKING_RESPONSE.BOOKING_DOESNT_CREATED})
          }  
          if(createBooking.coupon){
              const couponObject:any={
                booking:createBooking._id,
                user:req.decoded.id,
                coupon:createBooking.coupon
              }
              await UserCouponService.createUserCoupon(couponObject)
          }     
        res.send({ status:BOOKING_RESPONSE.SUCCESS, message:BOOKING_RESPONSE.BOOKING_CREATED ,data:createBooking});
      }

    catch (error) {
        error.desc = BOOKING_RESPONSE.BOOKING_DOESNT_CREATED;
        next(error);
    }
    },


    getManyBooking:async(req:IRequest,res:IResponse,next:INextFunction)=>{
        try {
            const query={
               user:req.decoded.id,
            }
            let getManyBooking = await  BookingService.getManyBooking(query)
    
            if(!getManyBooking){
             return   res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:BOOKING_RESPONSE.FAILED, message:BOOKING_RESPONSE.GET_ALL_DOESNT_BOOKING});
            }       
            res.send({ status:BOOKING_RESPONSE.SUCCESS, message:BOOKING_RESPONSE.GET_ALL_BOOKING ,data:getManyBooking ,count:getManyBooking.length});
            } catch (error) {
              error.desc = BOOKING_RESPONSE.GET_ALL_DOESNT_BOOKING;
              next(error);
            }
      },


      getBooking:async(req:IRequest,res:IResponse,next:INextFunction)=>{
        try {
          const query={user:req.decoded.id,_id:req.body.booking_id}
          
            let getBooking = await  BookingService.getBooking(query)
            if(!getBooking){
             return  res.send({ status:BOOKING_RESPONSE.FAILED, message:BOOKING_RESPONSE.GET_DOESNT_BOOKING });
            }
            //     res.send({ status:BOOKING_RESPONSE.FAILED, message:BOOKING_RESPONSE.GET_DOESNT_BOOKING});
            // }       
            res.send({ status:BOOKING_RESPONSE.SUCCESS, message:BOOKING_RESPONSE.GET_BOOKING ,data:getBooking });
            } catch (error) {
              error.desc = BOOKING_RESPONSE.GET_DOESNT_BOOKING;
              next(error);
            }
      },
      
    
    //   deleteCartById:async(req:IRequest,res:IResponse,next:INextFunction)=>{
    //     try {
    //         const query:any={
    //            _id:req.body.cart_id,
    //         }
    //         let deleteCartById = await  BookingService.deleteCartById(query)
    
    //         if(!deleteCartById){
    //           return  res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:BOOKING_RESPONSE.FAILED, message:BOOKING_RESPONSE.GET_ALL_DOESNT_BOOKING});
    //         }       
    //         res.send({ status:BOOKING_RESPONSE.SUCCESS, message:BOOKING_RESPONSE.DELETE_BOOKING ,data:deleteCartById});
    //         } catch (error) {
    //           error.desc = BOOKING_RESPONSE.GET_ALL_DOESNT_BOOKING;
    //           next(error);
    //         }
    //   },
};


export default BookingController