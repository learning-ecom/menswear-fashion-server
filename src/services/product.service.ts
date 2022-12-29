import { IProduct, IProductArray } from "../helpers/interface.helper";
import ProductModel from "../models/product.model";






const ProductService = {

  createProduct: async (data: IProduct) => {
    const createProduct = await ProductModel.create(data);
    return createProduct;
  },

  getAllProduct: async (query?: any): Promise<IProductArray> => {
    query.is_deleted = false;
    const getAllProduct: IProductArray = await ProductModel.find(query).lean();
    return getAllProduct;
  },
  
  getProduct: async (query) => {
    query.is_deleted = false;
    const getProduct = await ProductModel.findOne(query);
    return getProduct;
  },
};

export default ProductService;
