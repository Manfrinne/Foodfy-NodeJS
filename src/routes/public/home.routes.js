const express = require("express");
const routes = express.Router();

const HomeController = require("../../app/controllers/HomeController");

routes.get("/", HomeController.index);
routes.get("/about", HomeController.about);
routes.get("/chefs", HomeController.listChefs);

module.exports = routes;
