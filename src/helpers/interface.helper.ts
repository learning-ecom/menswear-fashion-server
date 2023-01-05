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
    discount:number,
    reset_password_hash?:string,
    reset_password_expiry?: Date,
    address?:[{street?:string,
    city?:string,
    state?:string,
    pincode?:string,
    delivery_number:String
}]
    session_token?:string,
    is_deleted?:boolean,
    created_at?: Date,
  modified_at?: Date
}

export interface IMongooseUpdate{
    num?:number;
}
export interface IImg{
        banner?:[string],
        short_banner?:[string],
        autumn?:[string],
        short_autumn?:[string],
        shop_by?:[string],
        journal?:[{img?:string,date?:string,desc?:string}],
        footer_img?:[string],
}

export interface IProduct{
    _id?:string,
    img?:string
    ,desc?:string
    ,amount?:number,
    categories?:[string],
    brand?:string,
    color?:[string],
    size?:[string],
    price?:string,
    ratings:number,
    is_deleted?:boolean
    stock?:[{S?:number,M?:number,L?:number,XL?:number,XXL?:number,XXXL:number},]
}


export type IProductArray=IProduct[]



export interface ICart{
    _id?:string,
    size?:string,
    quantity?:number,
    product?:any,
    user?:any,
}


export interface ICartPopulated{
    _id?:string,
    size?:string,
    quantity?:number,
    product?:IProduct,
    user?:IUser,

}
export interface IDeleteCart{
    _id?:string
}
export interface IGetCart{
    product_id?:string
}

export type ICartArray=ICartPopulated[]


export interface ICoupon{
    text?:string,
    code?:string,
    offer_value?:number,
    valid_from?:Date,
    valid_to?:Date,
    order_limit?:number,
    users?:any[]
    repeat?:boolean
    isdeleted?:boolean
}

export interface IBooking{
    quantity?:number,
    status?:any,
    amount?:number,
    payment_type?:string,
    user_address?:[{
    address?:string,
    town?:string,
    country?:string,
    postalcode?:string,
    phone_number?: string
    }],
    delivery_time?:Date,
    reason_of_reject?:string,
    coupon?:string,
    product?:any[]
    user?:string
}


export interface IUserCoupon{
    user:IUser,
    product:IProduct,
    coupon:ICoupon
} 




// export interface ISessiom{
//     _id?:any,
//     user?:any,
//     created_at?:Date,
//     modified_at?:Date
// }

// export interface ISessionUpdate{
//     user?:any,
//     logout?:Date
// }