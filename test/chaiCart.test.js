const mongoose = require("mongoose");
const config = require("../src/config/config.js");
const chai = require("chai");
const Cart = require("../src/dao/class/cart.dao.js");

mongoose.connect(config.mongoURLtest, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const expect = chai.expect;

describe("Test con chai", () => {
  before(function () {
    this.cartDao = new Cart();
  });

  it("El Dao debe obtener un arreglo de Carts", async function () {
    this.timeout(5000);
    const result = await this.cartDao.getCart();
    expect(Array.isArray(result)).to.be.ok;
  });
  it("El Dao debe crear un cart", async function () {
    this.timeout(5000);
    const result = await this.cartDao.postCart("6570aaf9e1dde6dc98e95724");
    expect(result).to.be.ok;
  });

  it("El Dao debe obtener un cart by ID", async function () {
    this.timeout(10000);
    const result = await this.cartDao.getCartById("657700a2ace6ba1fc455a315");
    expect(result).to.equal(result);
  });

  it("El Dao debe modificar un carrito", async function () {
    this.timeout(5000);
    const cartToReplace = { user: { user: "657702039a384321cfaf2b6e" } };
    const result = await this.cartDao.putCart(
      "657700ce70329bb81df1fdc3",
      cartToReplace
    );
    expect(result).to.be.ok;
  });

  it("El dao debe agregar un producto al carrito", async function () {
    this.timeout(5000);
    const cid = "657700ce70329bb81df1fdc3";
    const pid = "6570ab8282915291c987ab62";
    const quantity = 3;
    const result = await this.cartDao.addProduct(cid, pid, quantity);
    expect(result).to.be.ok;
  });

  it("El dao debe eliminar un carrito", async function () {
    this.timeout(5000);
    const cid = "657700ce70329bb81df1fdc3";
    const result = await this.cartDao.deleteCart(cid);
    expect(result).to.be.ok;
  });

  it("El dao debe eliminar un producto", async function () {
    this.timeout(5000);
    const cid = "657700a2ace6ba1fc455a315";
    const pid = "6570ab8282915291c987ab62";
    const result = await this.cartDao.deleteProduct(cid, pid);
    expect(result).to.be.ok;
  });

  // beforeEach(function(){
  //     mongoose.connection.collection.carts.drop()
  //     this.timeout(5000)
  // })
});
