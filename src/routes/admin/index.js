const express = require("express");
const routes = express.Router();

// const home = require("./home");
const chefs = require("./chefs.routes");
const recipes = require("./recipes.routes");
const users = require("./users.routes");
const profile = require("./profile.routes");

const { onlyUsers } = require("../../app/middlewares/session");

routes.use("/chefs", onlyUsers, chefs);
routes.use("/recipes", onlyUsers, recipes);
routes.use("/users", users);
routes.use("/profile", onlyUsers, profile);

routes.get("/", function (req, res) {
  return res.redirect("/admin/users/login");
});

module.exports = routes;
