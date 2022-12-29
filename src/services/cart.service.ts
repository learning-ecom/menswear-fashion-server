import { ICart, ICartArray,  IDeleteCart, ICartPopulated, IGetCart } from "../helpers/interface.helper"
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
    deleteCartById:async(query: IDeleteCart)=>{
        const deleteCartById=await CartModel.findOneAndDelete(query).lean()
        return deleteCartById
    },

    getCart:async(query:any)=>{
        const getCart= await CartModel.findOne(query).lean()
        return getCart

    },
    updateCart:async(query:any,update:any)=>{
       
        const updateCart =await CartModel.updateOne(query,update).lean()
        return updateCart
        
    }
}


export default CartService