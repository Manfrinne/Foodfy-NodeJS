const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");
const methodOverride = require("method-override");
const session = require("./config/session");

const app = express();

app.use(session);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(routes);

app.set("view engine", "njk");
nunjucks.configure("src/app/views", {
  express: app,
  autoescape: false,
  noCache: true,
});

routes.use(function (req, res) {
  return res.status(404).render("layouts/notFoundPage");
});

module.exports = app;
