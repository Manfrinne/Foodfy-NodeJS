const express = require("express");
const routes = express.Router();

const UserController = require("../../app/controllers/UserController");
const SessionController = require("../../app/controllers/SessionController");

const UserValidator = require("../../app/validators/userValidator.js");
const SessionValidator = require("../../app/validators/sessionValidator");

const {
  ifLoggedRedirectToUsersProfile,
  adminVerification,
} = require("../../app/middlewares/session");

// USER CREATE - ADMIN
routes.get("/create", adminVerification, UserController.create); // Mostrar o formulário de criação de um usuário

routes.post(
  "/create",
  adminVerification,
  UserValidator.post,
  UserController.post
); // Cadastrar um usuário

routes.get("/usersList", adminVerification, UserController.list); // Mostrar a lista de usuários cadastrados

routes.delete(
  "/:id",
  adminVerification,
  UserValidator.deleteUsers,
  UserController.delete
);

// USER EDIT - ADMIN
routes.get("/:id/edit", adminVerification, UserController.edit); // Mostrar o formulário de edição de um usuário

routes.put(
  "/",
  adminVerification,
  UserValidator.updateAdmin,
  UserController.updateAdmin
); // Editar um usuário

// LOGIN/LOGOUT
routes.get(
  "/login",
  ifLoggedRedirectToUsersProfile,
  SessionController.loginForm
);

routes.post("/logout", SessionController.logout);

routes.post("/login", SessionValidator.login, SessionController.login);

// RESET PASSWORD/FORGOT
routes.get("/forgot-password", SessionController.forgotForm);

routes.post(
  "/forgot-password",
  SessionValidator.forgot,
  SessionController.forgot
);

routes.get("/password-reset", SessionController.resetForm);

routes.post("/password-reset", SessionValidator.reset, SessionController.reset);

module.exports = routes;
