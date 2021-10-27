const express = require("express");
const routes = express.Router();

const publicRoutes = require("./public");
const adminRoutes = require("./admin");

routes.use("/", publicRoutes);
routes.use("/admin", adminRoutes);

module.exports = routes;
