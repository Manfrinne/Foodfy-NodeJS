const express = require("express");
const routes = express.Router();

const HomeController = require("../../app/controllers/HomeController");

routes.get("/recipes", HomeController.listRecipes);
routes.get("/recipes/:id", HomeController.showRecipe);
routes.get("/search", HomeController.search);

module.exports = routes;
