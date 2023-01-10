import { Router } from "express";
import ProductController from "../controllers/product.controller";
import expressValidator from "express-joi-validation";
import * as Validation from '../helpers/validation.helper'



const validator = expressValidator.createValidator({});
const router =Router()

router.post('/create_product',validator.body(Validation.createProduct),ProductController.createProduct)
router.post('/get_product',validator.body(Validation.getProduct),ProductController.getProduct)
router.post('/get_all_product',ProductController.getAllProduct)

export default router