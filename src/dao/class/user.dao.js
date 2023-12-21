//imports

const { createHash } = require("../../utils/utils");
const User = require("../models/User");

module.exports = class Users {
  //obtener todos los usuarios
  getUsers = async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  //login
  postLogin = async (email) => {
    try {
      const user = await User.findOne(
        { email },
        {
          first_name: 1,
          last_name: 1,
          age: 1,
          password: 1,
          email: 1,
          role: 1,
        }
      );
      const last_connection = await User.updateOne(
        { email: user.email },
        { last_connection: Date() }
      );

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  //register
  postRegister = async (first_name, last_name, email, age, password, role) => {
    try {
      const hashedPassword = createHash(password);
      const user = await User.create({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
        role,
      });
      return user;
    } catch (error) {}
  };

  //obtener un usuario
  findUser = async (email) => {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  //obtener usuario by ID
  findUserById = async (uid) => {
    try {
      const user = await User.findById({ _id: uid });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  //restore
  postRestore = async (email, password) => {
    try {
      const userFound = await User.findOne({ email: email });
      const hashedPassword = createHash(password);
      const newPassword = await User.updateOne(
        { email: userFound.email },
        { password: hashedPassword }
      );
      return newPassword;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  //subir documentos
  postFiles = async (uid, name, file) => {
    try {
      const userFound = await User.findById({ _id: uid });
      userFound.documents.push({ name, reference: file.filename });
      const result = await User.updateOne({ _id: uid }, userFound);
      return result;
    } catch (error) {
      return null;
    }
  };

  //cambiar rol de usuario
  putRole = async (uid) => {
    try {
      //cambiar de role de premium a user y visceversa
      const user = await User.findById(uid);
      if (user.role == "user") {
        const role = await User.updateOne({ role: "premium" });
        return role;
      } else {
        const role = await User.updateOne({
          role: "user",
        });
        return role;
      }
    } catch (error) {
      console.log(error);
      null;
    }
  };

  //eliminar usuarios
  deleteUsers = async (email) => {
    try {
      const result = await User.deleteMany({ email: email });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
};
