import mongoose from "mongoose";

const Schema = mongoose.Schema

const productSchema= new Schema({
    img:String,
    desc:String,
    amount:Number,
    categories:[String],
    brand:String,
    color:[String],
    size:[String],
    price:String,
    stock:[{S:Number,M:Number,L:Number,XL:Number,XXL:Number,XXXL:Number}],
    is_deleted:{type:Boolean, default:false},
    ratings:Number

})


const ProductModel = mongoose.model('product',productSchema)

export default ProductModel





