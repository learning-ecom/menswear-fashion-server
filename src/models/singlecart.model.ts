import mongoose from "mongoose";

const Schema = mongoose.Schema


const singleCartSchema = new Schema({
    quantity:Number,
    size:String,
    status:String,
    identify:String,
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
const SingleCartModel = mongoose.model("singlecart",singleCartSchema)

export default SingleCartModel;