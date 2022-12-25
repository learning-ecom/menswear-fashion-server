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
    created_at?: Date,
  modified_at?: Date
}

export interface IMongooseUpdate{
    num?:number;
}
// export interface IImg{
//     img_type?:{

//         banner?:string,
//         short_banner?:string,
//         autumn?:string,
//         short_autumn?:string,
//         shop_by?:string,
//         journal?:string,
//         footer_img?:string,
//     },
    
//         card:[{
//             imge?:string,
//             desc?:string,
//             amount:number
//         }]

// }
// export interface ISessiom{
//     _id?:any,
//     user?:any,
//     logout?:Date,
//     created_at?:Date,
//     modified_at?:Date
// }

// export interface ISessionUpdate{
//     user?:any,
//     logout?:Date
// }