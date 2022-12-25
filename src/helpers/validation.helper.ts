import Joi from "joi";


export const createUser =Joi.object({
    email:Joi.string().email().required(),
    phone:Joi.string().regex(/[0-9]{10}/).optional(),
    password:Joi.string().required(),
    role: Joi.string().optional(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
})

export const userLogin=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),
})