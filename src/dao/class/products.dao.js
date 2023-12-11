//imports
const { productModel } = require("../models/product.model");

module.exports = class Products {
  //obtener productos
  getProducts = async (filter, options) => {
    try {
      let Product = await productModel.paginate(filter, options);
      return Product;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  //obtener productos by ID
  productById = async (pid) => {
    try {
      const result = await productModel.findOne({ _id: pid });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  //crear productos
  postProduct = async (
    title,
    description,
    code,
    price,
    stock,
    category,
    owner
  ) => {
    try {
      let product = productModel.create({
        title,
        description,
        code,
        price,
        stock,
        category,
        owner: { user: owner },
      });
      return product;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  //editar productos
  putProduct = async (pid, productToReplace) => {
    try {
      let result = await productModel.updateOne({ _id: pid }, productToReplace);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  //eliminar productos
  deleteProduct = async (pid) => {
    try {
      let result = await productModel.deleteOne({ _id: pid });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
};
