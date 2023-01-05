import { IMongooseUpdate, IUser } from "../helpers/interface.helper";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
// import Session from "../models/session.model";
// import { USER_RESPONSE } from "../constants/response.constant";

const UserService = {
  // create a new UserService
  createUser: async (data: IUser) => {
    const user = await User.create(data);
    return user;
  },
 

  // get the user
  userDetails: async (id?: string, email?: string): Promise<IUser> => {
    let query: any = {};
    if (id) {
      query._id = id;
      // how to works
      // query._id = id; = query={_id:id}
    }
    if (email) {
      query.email = email;
    }
    let user:IUser = await User.findOne(query).lean();
    return user;
  },

  // generateToken
  generateToken: async (id: string, email: string, role: string, session_token?: string) => {
    let totalMinutes = 1440;
    let currentHour = new Date().getHours();
    let totalHours = currentHour * 60;
    let currentMinutes = new Date().getMinutes();
    currentMinutes = totalHours + currentMinutes;
    // one day expries the token
    let expiry = totalMinutes - currentMinutes;
    let token = jwt.sign({ data: { id, email, role, session_token } }, process.env.SECRET, { expiresIn: `${expiry}m` });
    token = "Bearer " + token;
    return token;
  },

  // update the single user
  updateUser: async (query: IUser, update: any) => {
    let updateUser: IMongooseUpdate = await User.updateOne(query, update).lean();
    // Update is empty return false stopping the update
    if (updateUser.num === 0) {
      return false;
    }
    return true;
  },

  
  getManyUser:async(query:any)=>{
    const  getManyUser= await User.find(query).lean()
    return getManyUser
},
deleteUser:async(query: any)=>{
    const deleteUser=await User.findOneAndDelete(query).lean()
    return deleteUser
},



// session

// createSession: async(body):Promise<ISessiom>=>{
  
//   // logout session
//   const previousSession:ISessiom= await Session.findOne({user:body.user},{},{sort:{created_at:-1}})
//   console.log('body',previousSession);
//   if(previousSession && !previousSession.logout){
// await UserService.updateSession({_id: previousSession._id},{logout:new Date()})
//   }
//   let session = await Session.create(body)
//   return session
// },


// updateSession:async(query:ISessiom,update:ISessionUpdate)=>{
//   const updateSession= await Session.updateOne(query,update).lean()
//   if(updateSession.modifiedCount===0){
//     throw new Error(USER_RESPONSE.SESSION_UPDATE_ERROR);
//   }
// }



};
export default UserService;
           