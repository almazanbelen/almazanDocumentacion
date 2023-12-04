//imports
const { Router } = require("express");
const cartControllers = require("../controllers/cartControllers");

const router = Router();

//ver carritos
router.get("/", cartControllers.getCart);

//ver carrito by ID
router.get("/:cid", cartControllers.getCartById);

//crear un carrito
router.post("/user/:uid", cartControllers.postCart);

//modificar un carrito
router.put("/:cid", cartControllers.putCart);

// agregar un producto
router.put("/:cid/products/:pid/user/:uid", cartControllers.addProduct);

//eliminar un carrito
router.delete("/:cid", cartControllers.deleteCart);

//eliminar un producto
router.delete("/:cid/products/:pid", cartControllers.deleteProduct);



module.exports = router;
