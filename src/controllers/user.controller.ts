import { USER_RESPONSE } from "../constants/response.constant";
import { INextFunction, IRequest, IResponse, IUser } from "../helpers/interface.helper";
import UserService from "../services/user.service";
import bcrypt from "bcryptjs";
import { USER_ROLES } from "../constants/user.constant";
import { generateSessionToken } from "../helpers/function.helper";
import HTTP from "http-status-codes";
import jwt from "jsonwebtoken";

const UserController = {

  // verifyToken
  verifyToken:async(req: IRequest, res: IResponse, next: INextFunction) => {
    try{
      var token:string=req.headers['authorization']
      if(!token) return res.status(HTTP.UNAUTHORIZED).send({auth:false,message:USER_RESPONSE.NO_TOKEN_PROVIDED})

      if(!token.includes("Bearer ")) return res.status(403).send({auth:false,message:USER_RESPONSE.INVALID_TOKEN})

      token=token.replace('Bearer ',"")
      let decoded=await jwt.verify(token,process.env.SECRET)
      if(decoded){
        decoded=decoded.data
        let user:IUser= await UserService.userDetails(decoded.id,undefined)
        if(user){
          req.decoded=decoded
          next()
        }
        else {
          return res.status(HTTP.UNAUTHORIZED).send({ auth: false, message: USER_RESPONSE.TOKEN_ERROR });
        }
      } else {
        return res.status(HTTP.UNAUTHORIZED).send({ auth: false, message: USER_RESPONSE.TOKEN_USER_DOESNT_EXIST });
      }
  } catch (err) {
    err.desc = USER_RESPONSE.INVALID_TOKEN;
    next(err);
  }
  },




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
        
      } else if (user && user.is_deleted) {
        let hash = await bcrypt.hash(req.body.password, 10);
        req.body.email = email;
        req.body.password = hash;
        req.body.role = USER_ROLES.USER;
        req.body.is_deleted = false;

        const query = { _id: user._id };
        const update = await UserService.updateUser(query, req.body);
        if (update) {
          const token = await UserService.generateToken(user._id, user.email, user.role, session_token);
          res.send({ status: USER_RESPONSE.SUCCESS, message: USER_RESPONSE.USER_CREATED, data: user, token: token });
        } else {
          res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status: USER_RESPONSE.FAILED, message: USER_RESPONSE.SIGNUP_FAILED });
        }
      } else {
        res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status: USER_RESPONSE.FAILED, message: USER_RESPONSE.EMAIL_EXISTS });
      }
    } catch (error) {
      error.desc = USER_RESPONSE.SIGNUP_FAILED;
      next(error);
    }
  },
  userLogin: async (req: IRequest, res: IResponse, next: INextFunction) => {
    try {
      let email = req.body.email.trim().toLowerCase();
      const user: IUser = await UserService.userDetails(undefined, email);
      let session_token = generateSessionToken();
      if (user) {
        let isTrue = await bcrypt.compare(req.body.password, user.password);
        if (isTrue) {
          let query = { _id: user._id };
          await UserService.updateUser(query, { session_token });
          const token = await UserService.generateToken(user._id, user.email, user.role, session_token);
          res.send({ status: USER_RESPONSE.SUCCESS, message: USER_RESPONSE.USER_EXIST, data: user, token, role: user.role });
          // await UserService.createSession({user:user._id})
          
        } else {
          res.status(HTTP.UNAUTHORIZED).send({ status: USER_RESPONSE.FAILED, message: USER_RESPONSE.INCORRECT_PASSWORD });
        }
      } else {
        res.status(HTTP.UNAUTHORIZED).send({ status: USER_RESPONSE.FAILED, message: USER_RESPONSE.USER_DOESNT_EXIST });
      }
    } catch (error) {
      error.desc = USER_RESPONSE.LOGIN_FAILED;
      next(error);
    }
  },
  
};

export default UserController;
