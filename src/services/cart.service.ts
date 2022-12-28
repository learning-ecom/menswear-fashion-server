import { ICart, ICartArray, ICartDelete, ICartPopulated } from "../helpers/interface.helper"
import { Populate } from "../helpers/populate.helper";
import CartModel from "../models/cart.model"




const CartService={

    createCart:async(query:ICart)=>{
        const createCart= await CartModel.create(query);
        return createCart
    },
    getManyCart:async(query:any)=>{
        const  getManyCart= await CartModel.find(query).populate(Populate.cart).lean()
        return getManyCart
    },
    deleteCartById:async(query:ICartDelete)=>{
        const deleteCartById=await CartModel.deleteOne(query).lean()
        return deleteCartById
    }
}


export default CartService