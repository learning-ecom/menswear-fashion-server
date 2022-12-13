import {Request,Response,NextFunction} from 'express'


export interface IRequest extends Request{
    decoded:IDecoded
}
export interface IResponse extends  Response{

}
export interface INextFunction extends NextFunction{

}
export interface IDecoded{
   id:string,
   role:string,
   session_token:string
}

export interface  IUser{
    _id?:any,
    role?:string,
    firstname?:string,
    lastname?:string,
    email?:string,
    password?:string,
    phone?:string,
    otp?:string,
    reset_password_hash?:string,
    reset_password_expiry?: Date,
    address?:string,
    city?:string,
    state?:string,
    postcode?:string,
    session_token?:string,
    is_deleted?:boolean,
    created_at?: Date;
  modified_at?: Date;
}

export interface IMongooseUpdate{
    num?:number;
}