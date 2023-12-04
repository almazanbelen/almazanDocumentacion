//imports
const TicketsDTO = require("../../dao/dtos/tickets.dto");

module.exports = class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }
  //obtener ticket
  getTicket = async () => {
    let result = await this.dao.getTicket();
    return result;
  };
  //obtener ticket by ID
  getTicketByID = async (tid) => {
    let result = await this.dao.getTicketByID(tid);
    return result;
  };
  //crear ticket
  postTicket = async (ticket) => {
    let tickets = new TicketsDTO(ticket);
    let result = await this.dao.postTicket(
      tickets.code,
      tickets.date,
      tickets.purchase,
      tickets.amount
    );
    return result;
  };
};
