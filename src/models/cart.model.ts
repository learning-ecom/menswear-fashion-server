import mongoose from "mongoose";

const Schema = mongoose.Schema


const cartSchema = new Schema({
    quantity:Number,
    size:String,
    product: {
        type: mongoose.Types.ObjectId,
        ref: "product"
      },
      user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
      },

})
const CartModel = mongoose.model("Cart",cartSchema)

export default CartModel;