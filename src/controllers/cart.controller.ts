import { INextFunction, IRequest, IResponse } from "../helpers/interface.helper"
import CartService from "../services/cart.service"
import HTTP from "http-status-codes";
import { CART_RESPONSE } from "../constants/response.constant";




const cartController= {

    createCart:async(req:IRequest,res:IResponse,next:INextFunction)=>{
        try {
            const query={
               product:req.body.product_id,
               size:req.body.size,
               quantity:req.body.quantity,
               user:req.decoded.id
            }
            let createCart = await  CartService.createCart(query)
            if(!createCart){
                res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:CART_RESPONSE.FAILED, message:CART_RESPONSE.CART_DOESNT_CREATED})
              }       
            res.send({ status:CART_RESPONSE.SUCCESS, message:CART_RESPONSE.CART_CREATED ,data:createCart});
            } catch (error) {
              error.desc = CART_RESPONSE.CART_DOESNT_CREATED;
              next(error);
            }
  },


  getManyCart:async(req:IRequest,res:IResponse,next:INextFunction)=>{
    try {
        const query={
           user_id:req.body.product_id,
        }
        let getManyCart = await  CartService.getManyCart(query)

        if(!getManyCart){
            res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:CART_RESPONSE.FAILED, message:CART_RESPONSE.GET_ALL_DOESNT_CART});
        }       
        res.send({ status:CART_RESPONSE.SUCCESS, message:CART_RESPONSE.GET_ALL_CART ,data:getManyCart ,count:getManyCart.length});
        } catch (error) {
          error.desc = CART_RESPONSE.GET_ALL_DOESNT_CART;
          next(error);
        }
  },
  

  deleteCartById:async(req:IRequest,res:IResponse,next:INextFunction)=>{
    try {
        const query={
           cart_id:req.body.product_id,
        }
        let deleteCartById = await  CartService.deleteCartById(query)

        if(!deleteCartById){
            res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:CART_RESPONSE.FAILED, message:CART_RESPONSE.GET_ALL_DOESNT_CART});
        }       
        res.send({ status:CART_RESPONSE.SUCCESS, message:CART_RESPONSE.DELETE_CART ,data:deleteCartById});
        } catch (error) {
          error.desc = CART_RESPONSE.GET_ALL_DOESNT_CART;
          next(error);
        }
  },


}

export default cartController



