import { ADDRESS_RESPONSE, USER_RESPONSE } from "../constants/response.constant";
import { INextFunction, IRequest, IResponse, IUser } from "../helpers/interface.helper";
import UserService from "../services/user.service";
import HTTP from "http-status-codes";
import AddressService from "../services/address.service";

const AddressController = {

  

  createAddress:async(req:IRequest,res:IResponse,next:INextFunction)=>{
    try { 
      let getUser = await  UserService.userDetails(req.decoded.id,undefined)

        if(!getUser){
         return  res.send({ status:ADDRESS_RESPONSE.FAILED, message:USER_RESPONSE.GET_DOESNT_USER });
        }  
        if(getUser.address.length<3){

          let createAddress = await AddressService.createAddress({_id:req.decoded.id},req.body)
          if(!createAddress){
            return  res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:ADDRESS_RESPONSE.FAILED, message:ADDRESS_RESPONSE.UPDATED_DOESNT_ADDRESS});
          }       
         return res.send({ status:ADDRESS_RESPONSE.SUCCESS, message:ADDRESS_RESPONSE.UPDATED_ADDRESS ,data:createAddress});
        }
        res.status(500).send({ status:ADDRESS_RESPONSE.SUCCESS, message:ADDRESS_RESPONSE.ADDRESS_LIMIT });

        } catch (error) {
          error.desc = ADDRESS_RESPONSE.UPDATED_DOESNT_ADDRESS;
          next(error);
        }
  },
  editAddress:async(req:IRequest,res:IResponse,next:INextFunction)=>{
    try { 
        let updateUserAddress = await  AddressService.updateAddress(req.decoded.id,req.body)

        if(!updateUserAddress){
          return  res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:ADDRESS_RESPONSE.FAILED, message:ADDRESS_RESPONSE.UPDATED_DOESNT_ADDRESS});
        }       
        res.send({ status:ADDRESS_RESPONSE.SUCCESS, message:ADDRESS_RESPONSE.UPDATED_ADDRESS ,data:updateUserAddress});
        } catch (error) {
          error.desc = ADDRESS_RESPONSE.UPDATED_DOESNT_ADDRESS;
          next(error);
        }
  },

  getManyAddress:async(req:IRequest,res:IResponse,next:INextFunction)=>{
    try {
      let getUser = await  UserService.userDetails(req.decoded.id,undefined)

      if(!getUser){
       return  res.send({ status:ADDRESS_RESPONSE.FAILED, message:USER_RESPONSE.GET_DOESNT_USER });
      }       
        res.send({ status:ADDRESS_RESPONSE.SUCCESS, message:ADDRESS_RESPONSE.GET_ALL_ADDRESS ,data:getUser.address});
        } catch (error) {
          error.desc = ADDRESS_RESPONSE.GET_ALL_DOESNT_ADDRESS;
          next(error);
        }
  },
  defaultAddress:async(req:IRequest,res:IResponse,next:INextFunction)=>{
    try {
        let getUser = await  UserService.userDetails(req.decoded.id,undefined)

        if(!getUser){
         return  res.send({ status:ADDRESS_RESPONSE.FAILED, message:USER_RESPONSE.GET_DOESNT_USER });
        }  
        console.log('getUser',getUser);
        
        let defaultAddress = await  AddressService.defaultAddress({_id:req.decoded.id},getUser,req.body.address_id)

        if(!defaultAddress){
          return  res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:ADDRESS_RESPONSE.FAILED, message:ADDRESS_RESPONSE.DEFAULT_DOESNT_ADDRESS});
        }       
        res.send({ status:ADDRESS_RESPONSE.SUCCESS, message:ADDRESS_RESPONSE.DEFAULT_ADDRESS_CREATED ,data:defaultAddress});
        } catch (error) {
          error.desc = ADDRESS_RESPONSE.DEFAULT_DOESNT_ADDRESS;
          next(error);
        }
  },

  removeAddress:async(req:IRequest,res:IResponse,next:INextFunction)=>{
    try {
        let removeUserAddress = await  AddressService.removeAddress({_id:req.decoded.id},req.body.address_id)

        if(!removeUserAddress){
          return  res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:ADDRESS_RESPONSE.FAILED, message:ADDRESS_RESPONSE.REMOVE_DOESNT_ADDRESS});
        }       
        res.send({ status:ADDRESS_RESPONSE.SUCCESS, message:ADDRESS_RESPONSE.REMOVE_ADDRESS ,data:removeUserAddress});
        } catch (error) {
          error.desc = ADDRESS_RESPONSE.REMOVE_DOESNT_ADDRESS;
          next(error);
        }
  },









};

export default AddressController;
