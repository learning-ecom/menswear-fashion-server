import { INextFunction, IRequest, IResponse } from "../helpers/interface.helper"
import CartService from "../services/cart.service"
import HTTP from "http-status-codes";
import { CART_RESPONSE } from "../constants/response.constant";
import { CART } from "../constants/cart.constants";
import SingleCartService from "../services/singlecart.service";
import { SINGLECART } from "../constants/singleCart.constants";




const SingleCartController= {

  createSingleCart:async(req:IRequest,res:IResponse,next:INextFunction)=>{
    try {

    let deleteSingleCart=  await SingleCartService.deleteSingleCart({user:req.decoded.id})
    if(!deleteSingleCart){
      return res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:CART_RESPONSE.FAILED, message:CART_RESPONSE.CART_DOESNT_CREATED})
    }  
        const query={
            product:req.body.product_id,
            status:CART.QUEUED,
            identify:SINGLECART.SINGLEITEM,
            size:req.body.size,
            quantity:req.body.quantity,
            user:req.decoded.id
        }
            // creaCart
            let createSingleCart = await  SingleCartService.createSingleCart(query)
            if(!createSingleCart){
               return   res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:CART_RESPONSE.FAILED, message:CART_RESPONSE.CART_DOESNT_CREATED})
              }       
            res.send({ status:CART_RESPONSE.SUCCESS, message:CART_RESPONSE.CART_CREATED ,data:createSingleCart});
      
    } catch (error) {
        error.desc = CART_RESPONSE.CART_DOESNT_CREATED;
        next(error);
    }
  },





getSingleCart:async(req:IRequest,res:IResponse,next:INextFunction)=>{
  try {
    const query={ product:req.body.product_id, user:req.decoded.id}
      let getSingleCart = await  SingleCartService.getSingleCart(query)
      if(!getSingleCart){
       return  res.send({ status:CART_RESPONSE.FAILED, message:CART_RESPONSE.GET_DOESNT_CART });
      }
        res.send({ status:CART_RESPONSE.SUCCESS, message:CART_RESPONSE.GET_CART ,data:getSingleCart });
      } catch (error) {
        error.desc = CART_RESPONSE.GET_DOESNT_CART;
        next(error);
      }
},





}

export default SingleCartController



