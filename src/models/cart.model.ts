import mongoose from "mongoose";

const Schema = mongoose.Schema


const cartSchema = new Schema({
    quantity:Number,
    size:String,
    status:String,
    product: {
        type: mongoose.Types.ObjectId,
        ref: "product"
      },
      user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
      },
      is_deleted:{
        type:Boolean,
        default:false
     }
},
{timestamps:{createdAt:'created_at',updatedAt:'modified_at'}}
)

const CartModel = mongoose.model("cart",cartSchema)

export default CartModel;