const express = require("express");
const routes = express.Router();

// const home = require("./home");
const chefs = require("./chefs");
const recipes = require("./recipes");
const users = require("./users");
const profile = require("./profile.js");

const publicRoutes = require("./public");

const { onlyUsers } = require("../app/middlewares/session");

routes.use("/", publicRoutes);

// CHEFS
routes.use("/admin/chefs", onlyUsers, chefs);

// RECIPES
routes.use("/admin/recipes", onlyUsers, recipes);

// USERS
routes.use("/admin/users", users);
routes.use("/admin/profile", onlyUsers, profile);

routes.get("/admin", function (req, res) {
  return res.redirect("/admin/users/login");
});

routes.get("/admin/create", function (req, res) {
  return res.redirect("/admin/users/create");
});

module.exports = routes;
