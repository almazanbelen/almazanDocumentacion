//imports
const Products = require("../../dao/class/products.dao");
const ProductRepository = require("../repositories/products.repository");

//instancia product
const product = new Products();
const productService = new ProductRepository(product);
//imports
const Tickets = require("../../dao/class/ticket.dao");
const TicketRepository = require("../repositories/tickets.repository");

//instancia ticket
const ticket = new Tickets();
const ticketService = new TicketRepository(ticket);

//exports
module.exports = {
  productService,
  ticketService,
};
