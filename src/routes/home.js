const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')

//HOME
routes.get('/', HomeController.index)
routes.get('/about', HomeController.about)
routes.get('/recipes', HomeController.listRecipes)
routes.get('/recipes/:id', HomeController.showRecipe)
routes.get('/chefs', HomeController.listChefs)
routes.get('/findRecipe', HomeController.findRecipe)


module.exports = routes
