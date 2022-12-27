import { IProduct, IProductArray } from "../helpers/interface.helper";
import ProductModel from "../models/product.model";





const ProductService={
   createProduct:async (data:IProduct)=>{
    const createProduct= await ProductModel.create(data)
    return createProduct
   },
   getAllProduct:async(query?:any):Promise<IProductArray>=>{
      query.is_deleted=false;
    const getProduct:IProductArray = await  ProductModel.find(query).lean()

    return getProduct
   }
}


export default ProductService