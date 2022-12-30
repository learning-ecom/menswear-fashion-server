import mongoose from "mongoose";


const schema = mongoose.Schema


const couponSchema = new schema({
     text:String,
     code:String,
     offer_value:Number,
     valid_from:Date,
     valid_to:Date,
     order_quantity:Number,
     title:String,
    offer_type:String,

     users:[
        {
            type: mongoose.Types.ObjectId,
            ref:"user"
        }
     ],
     repeat:{
        type:Boolean,
        default:false
     },
     isdeleted:{
        type:Boolean,
        default:false
     }
},
{timestamps:{createdAt:'created_at',updatedAt:'modified_at'}}
)

const CouponModel =mongoose.model("coupon",couponSchema)

export default CouponModel