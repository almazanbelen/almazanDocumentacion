const mongoose = require("mongoose");
const Products = require("../src/dao/class/products.dao.js");
const config = require("../src/config/config.js");
const Assert = require("assert");

const assert = Assert.strict;

mongoose.connect(config.mongoURLtest, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

describe("Testing Products Dao methods", () => {
  before(function () {
    this.productsDao = new Products();
  });
  beforeEach(function () {
    this.timeout(5000);
  });
  it("El Dao debe agregar un producto correctamente a la base de datos", async function () {
    this.timeout(5000);
    const title = "pantalon";
    const description = "rojo";
    const code = "d46e37a0-2aeb-4b02-95ad-f5f06ec8c198";
    const price = 15000;
    const stock = 18;
    const category = "pantalon";
    const owner = "6570aaf9e1dde6dc98e95724";

    const result = await this.productsDao.postProduct(
      title,
      description,
      code,
      price,
      stock,
      category,
      owner
    );
    assert.ok(result);
  });
  it("Deberia encontrarse un producto", async function () {
    this.timeout(5000);
    const result = await this.productsDao.getProducts();
    assert.strictEqual(Array.isArray(result.docs), true);
  });

  it("Deberia encontrarse un producto por ID", async function () {
    this.timeout(5000);
    const result = await this.productsDao.productById(
      "6570ab8282915291c987ab62"
    );
    assert.strictEqual(typeof result, "object");
  });
  it("Deberia editar un producto por ID", async function () {
    this.timeout(5000);
    const productToReplace = {
      description: "verde",
    };
    const result = await this.productsDao.putProduct(
      "6570ab8282915291c987ab62",
      productToReplace
    );
    assert.ok(result);
  });
  it("Deberia borrarse un producto por ID", async function () {
    this.timeout(5000);
    const result = await this.productsDao.deleteProduct(
      "656f51ef261db09d155a2dc8"
    );
    assert.ok(result);
  });

  beforeEach(function () {
    mongoose.connect.collections.products.drop();
    this.timeout(5000);
  });
});
