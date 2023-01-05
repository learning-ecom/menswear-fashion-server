import { IUserCoupon} from "../helpers/interface.helper"
import UserCouponModel from "../models/usercoupon.model"



const UserCouponService={

    createUserCoupon:async(query:IUserCoupon)=>{
        const createUserCoupon= await UserCouponModel.create(query);
        return createUserCoupon
    },
    getManyUserCoupon:async(query:any)=>{
        const  getManyUserCoupon= await UserCouponModel.find(query).lean()
        return getManyUserCoupon
    },
    deleteUserCouponById:async(query: any)=>{
        const deleteUserCouponById=await UserCouponModel.findOneAndDelete(query).lean()
        return deleteUserCouponById
    },

    getUserCoupon:async(query:any)=>{
        const getUserCoupon= await UserCouponModel.findOne(query).lean()
        return getUserCoupon

    },
    updateUserCoupon:async(query:any,update:any)=>{
       
        const updateUserCoupon =await UserCouponModel.updateOne(query,update).lean()
        return updateUserCoupon
        
    }
}


export default UserCouponService