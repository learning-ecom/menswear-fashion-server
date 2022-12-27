import { IImg, INextFunction, IRequest, IResponse, IUser } from "../helpers/interface.helper";
import HTTP from "http-status-codes";
import ImgService from "../services/img.service";
import { IMAGE_RESPONSE } from "../constants/response.constant";


const ImageController ={
    createImage:  async (req: IRequest, res: IResponse, next: INextFunction) => { 
        try {
            
            let createImage:any = await ImgService.createImage(req.body)

            if(!createImage){
                res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:IMAGE_RESPONSE.FAILED, message:IMAGE_RESPONSE.IMAGE_DOESNT_CREATED});
        
                }       
            res.send({ status:IMAGE_RESPONSE.SUCCESS, message:IMAGE_RESPONSE.IMAGE_CREATED ,data:createImage});
    } catch (error) {
      error.desc = IMAGE_RESPONSE.IMAGE_DOESNT_CREATED;
      next(error);
    }
  },

getImage:  async (req: IRequest, res: IResponse, next: INextFunction) => { 
    try {
        let getImage:any=await ImgService.getImage()
        if(!getImage){
        res.status(HTTP.UNPROCESSABLE_ENTITY).send({ status:IMAGE_RESPONSE.FAILED, message:IMAGE_RESPONSE.GET_DOESNT_IMAGE});

        }
        res.send({ status:IMAGE_RESPONSE.SUCCESS, message:IMAGE_RESPONSE.GET_IMAGE ,data:getImage});
        
    } catch (error) {
          error.desc = IMAGE_RESPONSE.GET_DOESNT_IMAGE;
      next(error);
    }
}

}

  export default ImageController