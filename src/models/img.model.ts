import mongoose from "mongoose";

const Schema = mongoose.Schema

const imgSchema = new Schema({
        banner:[String],
        short_banner:[String],
        autumn:[String],
        short_autumn:[String],
        shop_by:[String],
        journal:[{img:String,date:String,desc:String}],
        footer_img:[String], 
})
 const ImgModel = mongoose.model("Image",imgSchema)

export default ImgModel;