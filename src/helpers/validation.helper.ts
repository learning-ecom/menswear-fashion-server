import Joi from "joi";

export const userSignup: any = Joi.object({
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/[0-9]{10}/)
    .optional(),
  password: Joi.string().required(),
  role: Joi.string().optional(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
});

export const userLogin: any = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const image: any = Joi.object({
  banner: Joi.array().items(Joi.string().optional()),
  short_banner: Joi.array().items(Joi.string().optional()),
  autumn: Joi.array().items(Joi.string().optional()),
  short_autumn: Joi.array().items(Joi.string().optional()),
  shop_by: Joi.array().items(Joi.string().optional()),
  journal: Joi.array().items(
    Joi.object({
      img: Joi.string().optional(),
      date: Joi.string().optional(),
      desc: Joi.string().optional(),
    })
  ),
  footer_img: Joi.array().items(Joi.string().optional()),
});

export const product: any = Joi.object({
  img: Joi.string().required(),
  desc: Joi.string().required(),
  amount: Joi.number().required(),
  categories: Joi.array().items(Joi.string().optional()),
  brand: Joi.string().optional(),
  color: Joi.array().items(Joi.string().optional()),
  size: Joi.array().items(Joi.string().optional()),
  price: Joi.string().optional(),
  stock: Joi.array().items(
    Joi.object({
      S: Joi.number().optional(),
      M: Joi.number().optional(),
      L: Joi.number().optional(),
      XL: Joi.number().optional(),
      XXL: Joi.number().optional(),
      XXXL: Joi.number().optional(),
    })
  ),
  ratings:Joi.number().optional(),
});

export const getProduct: any = Joi.object({
  product_id:Joi.string().required(),
});


export const  createCart:any=Joi.object({
  product_id:Joi.string().optional(),
  size:Joi.string().optional(),
  quantity:Joi.number().optional()
});


// export const getManyCart:any=Joi.object({
//   user_id:Joi.string().required(),
// })

export const deleteCartById:any=Joi.object({
  cart_id:Joi.string().required(),
})
