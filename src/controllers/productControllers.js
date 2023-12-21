//imports
const { productService } = require("../services/repositories/index");
const User = require("../dao/models/User");
const { productModel } = require("../dao/models/product.model");
const { v4: uuidv4 } = require("uuid");
const config = require("../config/config");
const transporter = require("../utils/nodemailer")

//ver productos
async function getProducts(req, res) {
  //filtros
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const sort = parseInt(req.query.sort) || "asc";
  const filter =
    req.query.category === "all"
      ? {}
      : req.query.category
      ? { category: req.query.category }
      : {};

  const options = {
    limit: limit,
    page: page,
    sort: { price: sort },
    lean: true,
  };

  let product = await productService.getProduct(filter, options);
 const products = product.docs
  res.send({ result: "success", payload: products })//.render("allProducts" , {products})
}

//ver productos by ID
async function productById(req, res) {
  const { pid } = req.params;
  const result = await productService.getProductById(pid);
  res.send({ status: "success", payload: result });
}

//agregar producto
async function postProduct(req, res) {
  let { title, description, price, stock, category, owner } = req.body;

  let code = uuidv4();

  if (!title || !description || !price || !stock || !category) {
    if (code) res.send({ status: "error", error: "Faltan parámetros" });
  }
  //validacion del rol de usuario
  let user = await User.findOne({ _id: owner });
  if (user.role == "premium" || user.role == "admin") {
    let result = await productService.postProduct({
      title,
      description,
      code: code,
      price,
      stock,
      category,
      owner,
    });

    res.send({ result: "success", payload: result });
  } else {
    res.send({ error: "Acceso no autorizado" });
  }
}

//modificar producto
async function putProduct(req, res) {
  let { pid } = req.params;
  let productToReplace = req.body;
  if (
    !productToReplace.title ||
    !productToReplace.description ||
    !productToReplace.code ||
    !productToReplace.price ||
    !productToReplace.stock ||
    !productToReplace.category
  ) {
    res.send({ status: "error", error: "Faltan parámetros" });
  }
  let result = await productService.putProduct({ _id: pid }, productToReplace);
  res.send({ result: "success", payload: result });
}

//eliminar producto
async function deleteProduct(req, res) {
  let { pid, uid } = req.params;
  //busca el usuario que creo el producto
  let product = await productModel.findOne({ _id: pid });
  let role;
  let email
  product.owner.map((o) => {
    role = o.user.role;
    email = o.user.email;
  });
  //busca el usuario que quiere eliminar producto
  let user = await User.findOne({ _id: uid });
  //validacion de roles
  if(role == "premium"){
    const mailOptions = {
      from: config.adminEMAIL,
      to: email,
      subject: "Productos",
      html: `
      <div>
          <h2>Tu producto ha sido eliminado</h2>            
      </div>
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send("Error de envio");
      } else {
        console.log("Correo enviado", info.response);
        res.send(`Correo enviado con éxito a ${inactiveEmails}`);
      }
    });
  }
  if (role == "premium" && user.role ===  "premium" || user.role === "admin") {
    let result = await productService.deleteProducts(pid);
    res.send({ result: "success", payload: result });
  } else {
    res.send({
      error:
        "No puedes eliminar este producto ya que no cuentas con autorizacion",
    });
  }
}

module.exports = {
  getProducts,
  productById,
  postProduct,
  putProduct,
  deleteProduct,
};
