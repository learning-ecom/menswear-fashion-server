import mongoose from "mongoose";

const Schema = mongoose.Schema


const bookingSchema = new Schema({
    quantity:Number,
    status:String,
    amount:String,
    payment_type:String,
    user_address:{
    street:String,
    town:String,
    country:String,
    pincode:String,
    delivery_number: String
    },
    delivery_time:Date,
    reason_of_reject:String,
    coupon:{
      type: mongoose.Types.ObjectId,
      ref: "coupon"
    },
    cart: [],
    user:{
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
const BookingModel = mongoose.model("booking",bookingSchema)

export default BookingModel;



