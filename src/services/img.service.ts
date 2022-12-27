import { IImg } from "../helpers/interface.helper";
import ImgModel from "../models/img.model";


const ImgService={
 
    createImage:async(data:IImg)=>{
 const createimg= await ImgModel.create(data)
   return createimg
    }
  ,
getImage: async()=>{
  const getimg= await ImgModel.find()
  return getimg
}

}

export default ImgService