import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    quantity: Number,
    status: String,
    amount: String,
    payment_type: String,
    user_address: {
      street: String,
      town: String,
      country: String,
      pincode: String,
      delivery_number: String,
    },
    delivery_time: Date,
    reason_of_reject: String,
    carts: [
      {
        cart_id: String,
        product: {
          img: String,
          desc: String,
          amount: Number,
          categories: [String],
          discount: Number,
          brand: String,
          color: [String],
          size: [String],
          price: String,
          stock: {
            S: Number,
            M: Number,
            L: Number,
            XL: Number,
            XXL: Number,
            XXXL: Number,
          },
          ratings: Number,
          _id: String,
        },
        size: String,
        quantity: Number,
        identify: String,
      },
    ],
    stripe_id: String,
    coupon: {
      type: mongoose.Types.ObjectId,
      ref: "coupon",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "modified_at" } }
);
const BookingModel = mongoose.model("booking", bookingSchema);

export default BookingModel;
