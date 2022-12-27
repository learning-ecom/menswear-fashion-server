import { Router } from "express";
import ProductController from "../controllers/product .controller";
import expressValidator from "express-joi-validation";
import * as Validation from '../helpers/validation.helper'



const validator = expressValidator.createValidator({});
const router =Router()

router.post('/create_product',validator.body(Validation.product),ProductController.createProduct)
router.post('/get_all_product',ProductController.getAllProduct)

export default router