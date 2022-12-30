import {Router} from 'express'
import expressValidator from "express-joi-validation";
import CouponController from '../controllers/coupon.controller';
import UserController from '../controllers/user.controller';
import * as Validation from '../helpers/validation.helper'


const validator = expressValidator.createValidator({});
const router =Router()


router.post('/create_coupon',CouponController.createCoupon)
// router.post('/get_many_Coupon',UserController.verifyToken,CouponController.getManyCoupon)
// router.post('/get_Coupon',UserController.verifyToken,CouponController.getCoupon)
// router.delete('/delete_Coupon_by_id',validator.body(Validation.deleteCouponById),UserController.verifyToken,CouponController.deleteCouponById)



export default router