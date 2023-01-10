import {Router} from 'express'
import expressValidator from "express-joi-validation";
import cartController from '../controllers/cart.controller';
import UserController from '../controllers/user.controller';
import * as Validation from '../helpers/validation.helper'


const validator = expressValidator.createValidator({});
const router =Router()


router.post('/create_cart',validator.body(Validation.createCart),UserController.verifyToken,cartController.createCart)
router.post('/get_many_populate_cart',UserController.verifyToken,cartController.getManyPopulateCart)
router.post('/get_many_cart',UserController.verifyToken,cartController.getManyCart)
router.post('/get_cart',UserController.verifyToken,cartController.getCart)
router.delete('/delete_cart_by_id',validator.body(Validation.deleteCartById),UserController.verifyToken,cartController.deleteCartById)



export default router