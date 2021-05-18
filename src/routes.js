const express = require('express')
const routes = express.Router()
const multer = require("./app/middlewares/multer")

const chefs = require('./app/controllers/chefs')
const recipes = require('./app/controllers/recipes')
const users = require('./app/controllers/users')


routes.get('/', function(req, res) {
  return res.redirect('users')
})

//USERS
routes.get('/users', users.index)
routes.get('/users/about', users.about)
routes.get('/users/recipes', users.listRecipes)
routes.get('/users/recipes/:id', users.showRecipe)
routes.get('/users/chefs', users.listChefs)
routes.get('/users/findRecipe', users.findRecipe)

// ADMIN CHEFS
routes.get('/chefs', chefs.index)
routes.get('/chefs/create', chefs.create)
routes.post('/chefs', multer.single("photos"), chefs.post)
routes.get('/chefs/:id', chefs.show)
routes.get('/chefs/:id/edit', chefs.edit)
routes.put('/chefs', multer.single("photos"), chefs.put)
routes.delete('/chefs', chefs.delete)

// ADMIN RECIPES
routes.get('/recipes', recipes.index)
routes.get('/recipes/create', recipes.create)
routes.post('/recipes', multer.array("photos", 5), recipes.post)
routes.get('/recipes/:id', recipes.show)
routes.get('/recipes/:id/edit', recipes.edit)
routes.put('/recipes', multer.array("photos", 5), recipes.put)
routes.delete('/recipes', recipes.delete)


module.exports = routes
