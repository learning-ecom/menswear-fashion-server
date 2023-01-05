import mongoose from "mongoose";


const Schema= mongoose.Schema

const userCouponSchema= new Schema({
    product:{
        type:mongoose.Types.ObjectId,
        ref:'product'
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    booking:{
        type:mongoose.Types.ObjectId,
        ref:'booking'
    }
},
{timestamps:{createdAt:'created_at',updatedAt:'modified_at'}}
)

const UserCouponModel = mongoose.model('usercoupon',userCouponSchema)

export default  UserCouponModel