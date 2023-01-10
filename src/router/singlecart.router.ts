import {Router} from 'express';
import expressValidator from "express-joi-validation";
import * as Validation from '../helpers/validation.helper'
import SingleCartController from '../controllers/singlecart.controller';
import UserController from '../controllers/user.controller';

const validator = expressValidator.createValidator({passError: true,statusCode:400});

const router=Router();


router.post('/create_singlecart',validator.body(Validation.createCart),UserController.verifyToken,SingleCartController.createSingleCart)
router.post('/get_singlecart',UserController.verifyToken,SingleCartController.getSingleCart)

export default router