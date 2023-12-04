//imports
const { mongoose } = require("mongoose");
const Users = require("../class/user.dao");
const UserMemory = require("../memory/users.memory");
const config = require("../../config/config");
const UserRepository = require("../../services/repositories/users.repository");

//switch entre memoria y mongo segun dotenv
let userService;
switch (config.persistence) {
  case "MONGO":
    const connection = mongoose.connect(config.mongoURL);
    const user = new Users
    userService = new UserRepository(user)
  
    break;

  case "MEMORY":
    userService  = new UserMemory;
    break;
    
}

//exports
module.exports = userService;
