import {Router} from 'express'
import expressValidator from "express-joi-validation";
import bookingController from '../controllers/booking.controller';
import UserController from '../controllers/user.controller';
import * as Validation from '../helpers/validation.helper'


const validator = expressValidator.createValidator({});
const router =Router()


router.post('/create_booking',UserController.verifyToken,bookingController.createBooking)
router.post('/get_many_booking',UserController.verifyToken,bookingController.getManyBooking)
router.post('/get_booking',UserController.verifyToken,bookingController.getBooking)
// router.delete('/delete_cart_by_id',validator.body(Validation.deleteCartById),UserController.verifyToken,cartController.deleteCartById)



export default router