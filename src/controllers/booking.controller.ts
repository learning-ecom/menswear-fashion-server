import { BOOKING_RESPONSE } from "../constants/response.constant";
import {
  INextFunction,
  IRequest,
  IResponse,
} from "../helpers/interface.helper";
import HTTP from "http-status-codes";
import _ from 'lodash'
import BookingService from "../services/Booking.service";
import { BOOKING } from "../constants/booking.constants";
import UserCouponService from "../services/usercoupon.service";
import CartService from "../services/cart.service";
import SingleCartService from "../services/singlecart.service";
import ProductService from "../services/product.service";
import ProductModel from "../models/product.model";
import { dateGenerator } from "../helpers/function.helper";

const BookingController = {
  createBooking: async (req: IRequest, res: IResponse, next: INextFunction) => {
    try {
      const query:any={
        quantity: req.body.cart.length,
        status: BOOKING.PLACED,
        amount: req.body.amount,
        payment_type: req.body.payment_type,
        user_address:{
          street: req.body.street,
          town: req.body.city,
          country: req.body.country,
          pincode: req.body.pincode,
          delivery_number: req.body.delivery_number,
        },
        delivery_time:dateGenerator(),
        carts: req.body.cart.map((item)=> {
          return{ cart_id:item._id,
           product:item.product,
           size:item.size,
           quantity:item.quantity,
           identify:item.identify}
          }),  
        coupon: req.body.coupon,
        user: req.decoded.id
      }
      if(req.body.payment_type === 'Online Payment'){
        query.stripe_id=req.body.stripe_id
      }
        const createBooking:any= await BookingService.createBooking(query);
        console.log(createBooking.carts[0])
        if(!createBooking){
            return res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:BOOKING_RESPONSE.FAILED, message:BOOKING_RESPONSE.BOOKING_DOESNT_CREATED})
          }  
            if(createBooking.carts){
              createBooking.carts.map(async(item:any)=>{
                  let query:any
                  let size:any=`stock.${item.size}`
                  query = item.product.stock[item.size]-item.quantity;
                await ProductService.updateAllProduct({_id:item.product},{[size]:query})   
                })
                if (createBooking.carts[0].identify === "SINGLEITEM") {
                  await SingleCartService.deleteSingleCart({ user: req.decoded.id});
                } 
                else {
                  await CartService.deleteAllCart({ user: req.decoded.id });
                }
              }
             
            if (createBooking.coupon) {
              const couponObject: any = {
                booking: createBooking._id,
                user: req.decoded.id,
                coupon: createBooking.coupon,
              };
              await UserCouponService.createUserCoupon(couponObject);
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