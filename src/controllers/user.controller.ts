import { USER_RESPONSE } from "../constants/response.constant";
import { INextFunction, IRequest, IResponse, IUser } from "../helpers/interface.helper";
import UserService from "../services/user.service";
import bcrypt from "bcryptjs"
import { USER_ROLES } from "../constants/user.constant";
import { generateSessionToken } from "../helpers/function.helper";



const UserController = {
  userSignup: async (req: IRequest, res: IResponse, next: INextFunction) => {
    
    try {
      let email = req.body.email.trim().toLowerCase();
      let user: IUser = await UserService.userDetails(undefined, email);
      let session_token = generateSessionToken();

      if (!user) {
        let hash = await bcrypt.hash(req.body.password, 10);
        req.body.email = email;
        req.body.password = hash;
        req.body.role = USER_ROLES.USER;

        // create a new user
        await UserService.createUser(req.body);
        
        // once create a user and get the user
        let user: IUser = await UserService.userDetails(undefined, email);

        // token will be create
        const token = await UserService.generateToken(user._id, user.email, user.role, session_token);

        // get the user and update the token
        await UserService.updateUser({ _id: user._id }, { session_token });

        // status update
        res.send({ status: USER_RESPONSE.SUCCESS, message: USER_RESPONSE.USER_CREATED, data: user, token: token });
      }
    } catch (error) {
      error.desc = USER_RESPONSE.SIGNUP_FAILED;
      next(error);
    }
  },
};


export default UserController;
