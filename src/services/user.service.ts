import { IMongooseUpdate, IUser } from "../helpers/interface.helper";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import dotenv  from "dotenv";

dotenv.config()
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
    let user = await User.findOne(query).lean();
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
};
export default UserService;
           