import {Router} from 'express'
import expressValidator from "express-joi-validation";
import UserCouponController from '../controllers/usercoupon.controller';
import UserController from '../controllers/user.controller';
import * as Validation from '../helpers/validation.helper'


const validator = expressValidator.createValidator({});
const router =Router()


router.post('/create_usercoupon',UserCouponController.createUserCoupon)
router.post('/get_many_usercoupon',UserController.verifyToken,UserCouponController.getManyUserCoupon)
router.post('/get_usercoupon',UserController.verifyToken,UserCouponController.getUserCoupon)