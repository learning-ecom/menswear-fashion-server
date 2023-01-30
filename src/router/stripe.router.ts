import {Router} from 'express';
import expressValidator from "express-joi-validation";
import StripeController from '../controllers/stripe.controller';
import UserController from '../controllers/user.controller';

const validator = expressValidator.createValidator({passError: true,statusCode:400});

const router=Router();


router.post('/create_stripe',UserController.verifyToken,StripeController.createStripe)
router.post('/get_stripe',UserController.verifyToken,StripeController.getStripe)

export default router