//imports
const ProductsDTO = require("../../dao/dtos/products.dto");

module.exports = class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }
  //obtener producto
  getProduct = async (filter, options) => {
    let result = await this.dao.getProducts(filter, options);
    return result;
  };
  //obtener producto by ID
  getProductById = async (pid) => {
    let result = await this.dao.productById(pid);
    return result;
  };
  //crear producto
  postProduct = async (product) => {
    let products = new ProductsDTO(product);
    let result = await this.dao.postProduct(
      products.title,
      products.description,
      products.code,
      products.price,
      products.stock,
      products.category,
      products.owner
    );
    return result;
  };
  //editar producto
  putProduct = async (pid, productToReplace) => {
    let result = await this.dao.putProduct(pid, productToReplace);
    return result;
  };
  //eliminar producto
  deleteProducts = async (pid) => {
    let result = await this.dao.deleteProduct(pid);
    return result;
  };
};
