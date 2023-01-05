import { IBooking} from "../helpers/interface.helper"
import { Populate } from "../helpers/populate.helper";
import BookingModel from "../models/Booking.model"




const BookingService={

    createBooking:async(query:IBooking)=>{
        const createBooking= await BookingModel.create(query);
        return createBooking
    },
    getManyBooking:async(query:any)=>{
        const  getManyBooking= await BookingModel.find(query).populate(Populate.booking).lean()
        return getManyBooking
    },
    deleteBookingById:async(query: any)=>{
        const deleteBookingById=await BookingModel.findOneAndDelete(query).lean()
        return deleteBookingById
    },

    getBooking:async(query:any)=>{
        const getBooking= await BookingModel.findOne(query).lean()
        return getBooking

    },
    updateBooking:async(query:any,update:any)=>{
       
        const updateBooking =await BookingModel.updateOne(query,update).lean()
        return updateBooking
        
    }
}


export default BookingService