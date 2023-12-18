const chai = require("chai");

const supertest = require("supertest");

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("Testing", () => {
  describe("Test de usuarios", () => {
    it("El endpoint POST /api/sessions/register debe crear un usuario", async () => {
      const mockUser = {
        first_name: "maria",
        last_name: "almazan",
        email: "almazan@mail.com",
        age: 31,
        password: "123",
        role: "user",
      };
      const { statusCode, ok, _body } = await requester
        .post("/api/sessions/register")
        .send(mockUser);
      console.log(statusCode, ok, _body);
      //---------ERROR, llega a la BD (se crea el usuario) pero el body viene undefined
      expect(_body.payload).to.have.property("_id")
    });
    it("El endpoint GET /api/sessions/login debe renderizar login", async () => {
      const { statusCode } = await requester.get("/api/sessions/login");
      expect(statusCode).to.equal(200);
    });
    it("El endpoint GET /api/sessions/register debe renderizar register", async () => {
      const { statusCode } = await requester.get("/api/sessions/register");
      expect(statusCode).to.equal(200);
    });
  });
  describe("Test de productos", () => {
    it("El endpoint GET /api/products debe obtener todos los productos", async () => {
      const { statusCode } = await requester.get("/api/products");
      expect(statusCode).to.equal(200);
    });
    it("El endpoint GET /api/products/:pid debe obtener un producto", async () => {
      const { statusCode } = await requester.get(
        "/api/products/655fc8203160a69175a18c4a"
      );
      expect(statusCode).to.equal(200);
    });
  });
});
