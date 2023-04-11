import { CART } from "../constants/cart.constants";
import {
  ICart,
  ICartArray,
  IDeleteCart,
  ICartPopulated,
  IGetCart,
} from "../helpers/interface.helper";
import { Populate } from "../helpers/populate.helper";
import CartModel from "../models/cart.model";

const CartService = {
  createCart: async (query: ICart) => {
    const createCart = await CartModel.create(query);
    return createCart;
  },
  getManyPopulateCart: async (query: any) => {
    const getManyCart = await CartModel.find(query)
      .populate(Populate.cart)
      .lean();
    return getManyCart;
  },
  getManyCart: async (query: any) => {
    const getManyCart = await CartModel.find(query).lean();
    return getManyCart;
  },

  deleteCartById: async (query: IDeleteCart) => {
    const deleteCartById = await CartModel.findOneAndDelete(query).lean();
    return deleteCartById;
  },

  getCart: async (query: any) => {
    const getCart = await CartModel.findOne(query).lean();
    return getCart;
  },
  updateCart: async (query: any, update: any) => {
    const updateCart = await CartModel.updateOne(query, update).lean();
    return updateCart;
  },
  deleteAllCart: async (query: any) => {
    const deleteAllCart = await CartModel.deleteMany(query).lean();
    return deleteAllCart;
  },
  updateManyCart: async (query: any, cart_id: any) => {
    const updateCart = await CartModel.update(
      { query, _id: { $in: cart_id } },
      { $set: { status: CART.PLACED } },
      { multi: true }
    ).lean();
    return updateCart;
  },
};

export default CartService;
