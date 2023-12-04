//imports
const { ticketModel } = require("../models/tickets.model");

module.exports = class Tickets {
  //obtener ticket
  getTicket = async () => {
    try {
      const result = await ticketModel.find();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  //obtener ticket by ID
  getTicketByID = async (tid) => {
    try {
      const result = await ticketModel.findById(tid);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  //crear ticket
  postTicket = async (code, date, purchase, amount) => {
    try {
      const result = await ticketModel.create({
        code,
        date,
        purchase: { cart: purchase },
        amount,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
};
