import {Router} from 'express';
import ImageController from '../controllers/img.controller';
import expressValidator from "express-joi-validation";
import * as Validation from '../helpers/validation.helper'

const validator = expressValidator.createValidator({passError: true,statusCode:400});

const router=Router();

router.post("/create_img",validator.body(Validation.createImage),ImageController.createImage)
router.post("/get_img",ImageController.getImage)

export default router