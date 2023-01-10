import { Populate } from "../helpers/populate.helper";
import SingleCartModel from "../models/singlecart.model";





const SingleCartService={

    createSingleCart:async(query:any)=>{
        const createSingleCart= await SingleCartModel.create(query);
        return createSingleCart
    },

    getSingleCart:async(query:any)=>{
        const getSingleCart= await SingleCartModel.findOne(query).populate(Populate.cart).lean()
        return getSingleCart

    }, 
    updateSingleCart:async(query:any,update:any)=>{
       
        const updateSingleCart =await SingleCartModel.updateOne(query,update).lean()
        return updateSingleCart
    },
    deleteSingleCart: async(query:any)=>{
        const deleteSingleCart =await SingleCartModel.deleteMany(query).lean()
        return deleteSingleCart
    },
}


export default SingleCartService