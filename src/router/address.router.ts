



import {Router} from 'express';
import * as Validation from '../helpers/validation.helper'
import expressValidator from "express-joi-validation";
import UserController from '../controllers/user.controller';
import AddressController from '../controllers/address.controller';

const validator = expressValidator.createValidator({passError: true,statusCode:400});
const router=Router();




router.post("/create_address",UserController.verifyToken,AddressController.createAddress)
router.post("/get_many_address",UserController.verifyToken,AddressController.getManyAddress)
router.post("/default_address",UserController.verifyToken,AddressController.defaultAddress)
router.post("/edit_address",UserController.verifyToken,AddressController.editAddress)
router.post("/remove_address",UserController.verifyToken,AddressController.removeAddress)


export default router