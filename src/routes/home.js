const express = require('express')
const routes = express.Router()

const home = require('../app/controllers/home')

//HOME
routes.get('/', home.index)
routes.get('/about', home.about)
routes.get('/recipes', home.listRecipes)
routes.get('/recipes/:id', home.showRecipe)
routes.get('/chefs', home.listChefs)
routes.get('/findRecipe', home.findRecipe)


module.exports = routes
