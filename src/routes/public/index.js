const express = require("express");
const routes = express.Router();

const homeRoutes = require("./home.routes");
const recipeRoutes = require("./recipes.routes");

routes.use(recipeRoutes, homeRoutes);

module.exports = routes;
