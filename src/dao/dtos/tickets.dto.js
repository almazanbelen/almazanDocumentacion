module.exports = class TicketsDTO {
  constructor(ticket) {
    (this.code = ticket.code),
      (this.date = ticket.date),
      (this.purchase = ticket.purchase),
      (this.amount = ticket.amount);
  }
};
