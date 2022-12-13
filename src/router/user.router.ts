import {Router} from 'express';
import * as Validation from '../helpers/validation.helper'
import expressValidator from "express-joi-validation";
import UserController from '../controllers/user.controller';

const validator = expressValidator.createValidator({passError: true,statusCode:400});
const router=Router();

router.post("/user_signup",validator.body(Validation.createUser),UserController.userSignup)

export default router


