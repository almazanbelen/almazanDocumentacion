//imports
const { cartModel } = require("../models/cart.model");

module.exports = class Cart {
  //obtener carrito
  getCart = async () => {
    try {
      let cart = await cartModel.find();
      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  //obtener carrito by ID
  getCartById = async (cid) => {
    try {
      const result = await cartModel.findOne({ _id: cid });
      return result;
    } catch (error) {
      console.log("error: " + error);
      return null;
    }
  };
  //crear carrito
  postCart = async (uid) => {
    try {
      let carts = await cartModel.create({
        user: { user: uid },
      });
      return carts;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  //editar carrito
  putCart = async (cid, cartToReplace) => {
    try {
      let cart = await cartModel.updateOne({ _id: cid }, cartToReplace);
      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  //agregar un producto al carrito
  addProduct = async (cid, pid, quantity) => {
    try {
      const cart = await cartModel.findOne({ _id: cid });
      cart.products.push({ product: pid, quantity: quantity });
      await cart.save();
      let newCart = await cartModel.findOne({ _id: cid });
      let totalPrice = 0;
      newCart.products.map((p) => {
        totalPrice += p.product.price * p.quantity;
      });
      const result = await cartModel.updateOne({
        totalPrice: totalPrice,
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  //eliminar carrito
  deleteCart = async (cid) => {
    try {
      let cart = await cartModel.deleteOne({ _id: cid });
      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  //eliminar producto
  deleteProduct = async (cid, pid) => {
    try {
      let cart = await cartModel.findOne({ _id: cid });
      cart.products.splice({ _id: pid });
      let result = await cartModel.updateOne({ _id: cid }, cart);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
};
