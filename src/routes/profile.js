const express = require("express");
const routes = express.Router();

const UserController = require("../app/controllers/UserController");
const UserValidator = require("../app/validators/userValidator.js");

routes.put("/", UserValidator.update, UserController.update); // Editar um usuário
routes.get("/show", UserValidator.show, UserController.show); // Mostrar o formulário com dados do usuário logado

module.exports = routes;
