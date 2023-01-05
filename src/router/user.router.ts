import {Router} from 'express';
import * as Validation from '../helpers/validation.helper'
import expressValidator from "express-joi-validation";
import UserController from '../controllers/user.controller';

const validator = expressValidator.createValidator({passError: true,statusCode:400});
const router=Router();

router.post("/user_signup",validator.body(Validation.userSignup),UserController.userSignup)
router.post("/user_login",validator.body(Validation.userLogin),UserController.userLogin)
router.post("/get_many_user",UserController.verifyToken,UserController.getManyUser)
router.post("/get_user",UserController.verifyToken,UserController.getUser)

export default router


