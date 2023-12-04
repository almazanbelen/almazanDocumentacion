//imports

const { cartModel } = require("../dao/models/cart.model");
const { productModel } = require("../dao/models/product.model");
const { ticketService } = require("../services/repositories/index")
const { v4: uuidv4 }= require("uuid")

async function getTicket(req, res) {
  const result = await ticketService.getTicket()
  res.send(result)
}

async function getTicketById(req, res) {
  const { tid } = req.params;
  const result = await ticketService.getTicketByID(tid)
  res.send({ result: "success", payload: result });
}

async function postTicket(req, res) {
  const {cid}= req.params
  const code = uuidv4();
  const date = new Date();
  
  //busca el carrito y actualiza el stock de los productos
  const purchase = await cartModel.findOne({ _id: cid });
  let stock;
  purchase.products.forEach((p) => {
    stock = p.product.stock - p.quantity;
  });
  const amount = purchase.totalPrice
  const newStock = await productModel.updateMany({ stock: stock })

  const result = ticketService.postTicket(code, date, purchase, amount)
   res.send({ result: "success" , payload: result});
}

module.exports = {
  getTicket,
  getTicketById,
  postTicket,
  
};
