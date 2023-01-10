import { IMongooseUpdate, IUser } from "../helpers/interface.helper";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
// import Session from "../models/session.model";
// import { USER_RESPONSE } from "../constants/response.constant";

const AddressService = {

    createAddress: async (query:IUser, data:any) => {

      let createAddress: IMongooseUpdate = await User.updateOne(query, {$push:{address:{$each:[data],postion:0}}}).lean();
      // Update is empty return false stopping the update
      if (createAddress.num === 0) {
        return false;
      }
      return true;
    },

    defaultAddress: async (user_id:any, data:any,address_id:any) => {
        const findIndex = data.address?.map((item:any)=>item._id.toHexString()).indexOf(address_id)
        await User.updateOne(user_id, {$pull:{address:{_id:address_id}}}).lean();
        // console.log('DeleteData ',DeleteData );
        const unshiftAddress = data.address.splice(findIndex,1)
        let defaultAddress: IMongooseUpdate = await User.updateOne(user_id, {$push:{address:{$each:unshiftAddress,$position:0}}}).lean();
        // Update is empty return false stopping the update
        if (defaultAddress.num === 0) {
          return false;
        }
        return true;
      },
 
  // update the single user
  updateAddress: async (user_id:any, update: any):Promise<boolean> => {
    console.log('update.address_id',update.address_id);
    let updateAddress: IMongooseUpdate = await User.updateOne({'address._id':update.address_id,'_id':user_id},{$set:{'address.$':update}}).lean();
    // Update is empty return false stopping the update
    if (updateAddress.num === 0) {
      return false;
    }
    return true;
  },

  
  removeAddress: async (query: IUser, address_id: any) => {
    let removeAddress: IMongooseUpdate = await User.updateOne(query, {$pull:{address:{_id:address_id}}}).lean();
    // Update is empty return false stopping the update
    if (removeAddress.num === 0) {
      return false;
    }
    return true;
  },





};
export default AddressService;
           