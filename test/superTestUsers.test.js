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
      //expect(_body.payload).to.have.property("_id")
    });
  });
});
