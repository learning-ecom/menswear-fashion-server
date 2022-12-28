import HTTP from "http-status-codes";
import { PRODUCT_RESPONSE } from "../constants/response.constant";
import {
  INextFunction,
  IRequest,
  IResponse,
} from "../helpers/interface.helper";
import ProductService from "../services/product.service";

const ProductController = {
  // createProduct
  createProduct: async (req: IRequest, res: IResponse, next: INextFunction) => {
    try {
      const createProduct: any = await ProductService.createProduct(req.body);
      if (!createProduct) {
        res.status(HTTP.UNPROCESSABLE_ENTITY).send({
          status: PRODUCT_RESPONSE.FAILED,
          message: PRODUCT_RESPONSE.PRODUCT_DOESNT_CREATED,
        });
      }

      res.send({
        status: PRODUCT_RESPONSE.SUCCESS,
        message: PRODUCT_RESPONSE.PRODUCT_CREATED,
        data: createProduct,
      });
    } catch (error) {
      error.desc = PRODUCT_RESPONSE.PRODUCT_DOESNT_CREATED;
      next(error);
    }
  },

  // getAllProduct
  getAllProduct: async (req: IRequest, res: IResponse, next: INextFunction) => {
    try {
      const {
        categories_search,
        brand_search,
        color_search,
        size_search,
        price_search,
      } = req.body;
      let query: any = {};
      if (categories_search && categories_search.length > 0) {
        query.categories = { $regex: categories_search, $options: "i" };
        // query ={
        //   ...query,
        //   categories:{$regex:categories_search,$options:"i"}
        // }
      }
      if (brand_search && brand_search.length > 0) {
        query.brand = { $regex: brand_search, $options: "i" };
      }
      if (color_search && color_search.length > 0) {
        query.color = { $regex: color_search, $options: "i" };
      }
      if (size_search && size_search.length > 0) {
        query.size = { $regex: size_search, $options: "i" };
      }
      if (price_search && price_search.length > 0) {
        query.price = { $regex: price_search, $options: "i" };
      }

      const getAllProduct: any = await ProductService.getAllProduct(query);
      if (!getAllProduct) {
        res.status(HTTP.UNPROCESSABLE_ENTITY).send({
          status: PRODUCT_RESPONSE.FAILED,
          message: PRODUCT_RESPONSE.GET_ALL_DOESNT_PRODUCT,
        });
      }

      res.send({
        status: PRODUCT_RESPONSE.SUCCESS,
        message: PRODUCT_RESPONSE.GET_ALL_PRODUCT,
        data: getAllProduct,
      });
    } catch (error) {
      error.desc = PRODUCT_RESPONSE.GET_ALL_DOESNT_PRODUCT;
      next(error);
    }
  },

  // getProduct
  getProduct: async (req: IRequest, res: IResponse, next: INextFunction) => {
    try {
      const query: any = {
        _id: req.body.product_id,
      };
      const getProduct: any = await ProductService.getProduct(query);
      if (!getProduct) {
         return res.status(HTTP.UNPROCESSABLE_ENTITY).send({
          status: PRODUCT_RESPONSE.FAILED,
          message: PRODUCT_RESPONSE.GET_DOESNT_PRODUCT,
        });
      }
       return res.send({
        status: PRODUCT_RESPONSE.SUCCESS,
        message: PRODUCT_RESPONSE.GET_PRODUCT,
        data: getProduct,
      });
    } catch (error) {
      error.desc = PRODUCT_RESPONSE.GET_DOESNT_PRODUCT;
      next(error);
    }
  },
};

export default ProductController;
