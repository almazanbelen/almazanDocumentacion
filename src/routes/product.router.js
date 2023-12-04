//imports
const { Router } = require("express");
const productControllers = require("../controllers/productControllers");


const router = Router();

//ver productos
router.get("/", productControllers.getProducts);

//ver productos by ID
router.get("/:pid", productControllers.productById);

//agregar producto
router.post("/", productControllers.postProduct);

//modificar producto
router.put("/:pid", productControllers.putProduct);

//eliminar producto
router.delete("/:pid/:uid", productControllers.deleteProduct);

module.exports = router;
