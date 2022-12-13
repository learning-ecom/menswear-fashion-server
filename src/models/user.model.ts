import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";


const Schema= mongoose.Schema;

const schema = new Schema({
    role:String,
    first_name:String,
    last_name:String,
    email:String,
    password:String,
    phone:String,
    otp:String,
    reset_password_hash: String,
    reset_password_expiry: Date,
    address:String,
    city:String,
    state:String,
    postcode:String,
    session_token:String,
    created_by:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    is_deleted:{type:Boolean, default:false}
},
{timestamps:{createdAt:"created_at",updatedAt:"modified_at"}}
)


autoIncrement.initialize(mongoose.connection)
// identitycounters table add
schema.plugin(autoIncrement.plugin,{model:'user',field:"id"})

// model
const model =mongoose.model('user',schema)

export default model;
