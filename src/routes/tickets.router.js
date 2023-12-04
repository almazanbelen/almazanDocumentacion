//imports
const { Router } = require("express");

const ticketsControllers = require("../controllers/ticketsControllers")


const router = Router();

//obtener todos los tickets
router.get("/", ticketsControllers.getTicket);

//obtener un ticket
router.get("/:tid", ticketsControllers.getTicketById);

//crear un tiket
router.post("/:cid/purchase", ticketsControllers.postTicket)



module.exports = router;
