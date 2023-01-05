import mongoose from "mongoose";

const Schema = mongoose.Schema


const bookingSchema = new Schema({
    quantity:Number,
    status:String,
    amount:String,
    payment_type:String,
    user_address:[{
    address:String,
    town:String,
    country:String,
    postalcode:String,
    phone_number: String
    }],
    delivery_time:Date,
    reason_of_reject:String,
    coupon:String,
    product: [{
        type: mongoose.Types.ObjectId,
        ref: "product"
      }],

    user:{
        type: mongoose.Types.ObjectId,
        ref: "user"
      },

})
const BookingModel = mongoose.model("Booking",bookingSchema)

export default BookingModel;



