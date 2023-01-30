import mongoose from "mongoose";

const Schema = mongoose.Schema

const productSchema= new Schema({
    img:String,
    desc:String,
    amount:Number,
    categories:[String],
    discount:Number,
    brand:String,
    color:[String],
    size:[String],
    price:String,
    stock:{S:Number,M:Number,L:Number,XL:Number,XXL:Number,XXXL:Number},
    ratings:Number,

},
{timestamps:{createdAt:'created_at',updatedAt:'modified_at'}}
)


const ProductModel = mongoose.model('product',productSchema)

export default ProductModel





