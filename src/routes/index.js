const express = require('express')
const routes = express.Router()

const home = require('./home')
const chefs = require('./chefs')
const recipes = require('./recipes')

//HOME
routes.use('/home', home)

// CHEFS
routes.use('/chefs', chefs)

// RECIPES
routes.use('/recipes', recipes)


module.exports = routes
