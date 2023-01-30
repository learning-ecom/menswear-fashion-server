import { INextFunction, IRequest, IResponse } from "../helpers/interface.helper"
import HTTP from "http-status-codes";
import { CART_RESPONSE } from "../constants/response.constant";
import StripeService from "../services/stripe.service";

const DOMAIN:any='http://localhost:3000'


const StripeController= {

  createStripe:async(req:IRequest,res:IResponse,next:INextFunction)=>{
    try {

           let query:any={
                payment_method_types:["card"],
                line_items: req.body.cart.map(item=>{
                  return{
                    price_data:{
                      currency:'inr',
                      product_data:{
                        name:item.product.brand,
                        description:item.product.desc,
                        images:[item.product.img]
                      },
                      unit_amount:(item.product.amount -item.product.amount *item.product.discount/100)* 100
                    },
                    quantity:item.quantity
                  }
                }), 
                metadata: {user_id: req.decoded.id },
                mode: 'payment',
                cancel_url: `${DOMAIN}/cancel.html`,
           }
           if( req.body.coupon_code.length>0){
          query={
              ...query,
             discounts: [{
                   coupon: req.body.coupon_code,
                 }],
                }
           }
           if(req.body.cart[0].identify==="SINGLEITEM"){
             query['success_url']= `${DOMAIN}/checkout?session={CHECKOUT_SESSION_ID}&id=${req.body.cart[0].product._id}`
           }
           else{
             query['success_url']=`${DOMAIN}/checkout?session={CHECKOUT_SESSION_ID}`
           }

           if(req.body.price_amount<=req.body.not_delivery_charges){
           query={
            ...query,
           shipping_options: [
               {
                 shipping_rate_data: {
                   type: 'fixed_amount',
                   fixed_amount: {amount: 150*100, currency: 'inr'},
                   display_name: 'Delivery',
                   delivery_estimate: {
                     minimum: {unit: 'business_day', value: 5},
                     maximum: {unit: 'business_day', value: 7},
                   },
                 },
               },
             ],      
            }
        }
           const createStripe = await StripeService.createStripe(query)
            if(!createStripe ){
               return   res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:CART_RESPONSE.FAILED, message:CART_RESPONSE.CART_DOESNT_CREATED})
              }       
            res.send({ status:CART_RESPONSE.SUCCESS, message:CART_RESPONSE.CART_CREATED ,data:createStripe.url});
      
    } catch (error) {
      // console.log(error)
        error.desc = CART_RESPONSE.CART_DOESNT_CREATED;
        next(error);
    }
  },





getStripe:async(req:IRequest,res:IResponse,next:INextFunction)=>{
  try {
      let getStripe = await  StripeService.getStripe(req.body.session_id)
      console.log(getStripe)
      if(!getStripe){
       return  res.send({ status:CART_RESPONSE.FAILED, message:CART_RESPONSE.GET_DOESNT_CART });
      }
        res.send({ status:CART_RESPONSE.SUCCESS, message:CART_RESPONSE.GET_CART ,data:getStripe });
      } catch (error) {
        error.desc = CART_RESPONSE.GET_DOESNT_CART;
        next(error);
      }
},





}

export default StripeController



