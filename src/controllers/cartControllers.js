//imports

const Cart = require("../dao/class/cart.dao");
const User = require("../dao/models/User");
const { productModel } = require("../dao/models/product.model");

//instancia de carrito
const cartService = new Cart();

//ver carritos
async function getCart(req, res) {
  let result = await cartService.getCart();
  res.send({ result: "success", payload: result });
}

//ver carrito by ID

async function getCartById(req, res) {
  let { cid } = req.params;
  if (!cid) {
    res.send({ status: "error", error: "Carrito no encontrado" });
  } else {
    let result = await cartService.getCartById(cid);
    res.send({ result: "success", payload: result });
  }
}

//crear carrito
async function postCart(req, res) {
  let { uid } = req.params;
  if (!uid) {
    res.send({ status: "error", error: "Faltan parámetros" });
  } else {
    let result = await cartService.postCart(uid);
    res.send({ result: "success", payload: result });
  }
}

//modificar carrito
async function putCart(req, res) {
  let { cid } = req.params;
  let cartToReplace = req.body;
  let result = await cartService.putCart(cid, cartToReplace);
  res.send({ result: "success", payload: result });
}

//agregar un producto
async function addProduct(req, res) {
  let { cid, pid, uid } = req.params;
  const { quantity } = req.body;

  //busca el usuario que creo el producto
  let product = await productModel.findOne({ _id: pid });
  let role;
  product.owner.map((o) => {
    role = o.user.role;
  });
  //busca el usuario que quiere agregar el producto
  let user = await User.findOne({ _id: uid });
  //validacion del rol
  if (role == "premium" && user.role == "premium") {
    res.send({ error: "No puedes agregar un producto creado por ti" });
  }
  //validacion del stock de productos
  if (product.stock < quantity) {
    res.send({
      error: `Stock insuficiente, stock disponible: ${product.stock}`,
    });
  } else {
    let result = await cartService.addProduct(cid, pid, quantity);
    res.send({ result: "success", payload: result });
  }
}

//eliminar un carrito
async function deleteCart(req, res) {
  let { cid } = req.params;
  let result = await cartService.deleteCart(cid);
  res.send({ result: "success", payload: result });
}

//eliminar un producto
async function deleteProduct(req, res) {
  let { cid, pid } = req.params;
  let product = await cartService.deleteProduct(cid, pid);
  let result = await cartService.calculateTotalPrice(cid);
  res.send({ result: "success", payload: result });
}

//generar ticket de compra

module.exports = {
  getCart,
  getCartById,
  postCart,
  putCart,
  addProduct,
  deleteCart,
  deleteProduct,
};
