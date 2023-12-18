//imports
const UsersDTO = require("../../dao/dtos/users.dto");

module.exports = class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  //login
  postLogin = async (email) => {
    let result = await this.dao.postLogin(email);
    return result;
  };
  //register
  postRegister = async (user) => {
    let users = new UsersDTO(user);
    let result = await this.dao.postRegister(
      users.first_name,
      users.last_name,
      users.email,
      users.age,
      users.password,
      users.role
    );
    return result;
  };
  //encontrar usuario
  findUser = async (email) => {
    let result = await this.dao.findUser(email);
    return result;
  };
  //encontrar usuario by ID
  findUserById = async (uid) => {
    let result = await this.dao.findUserById(uid)
    return result
  }
  //restore
  postRestore = async (email, password) => {
    let result = await this.dao.postRestore(email, password);
    return result;
  };

  //subir documentos
  postFiles = async (uid, name ,file) => {
    let result = await this.dao.postFiles(uid, name, file)
  }

  //cambiar rol de usuario
  putRole = async(uid) => {
    let result = await this.dao.putRole(uid)
  }
};
