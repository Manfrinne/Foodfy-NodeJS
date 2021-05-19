const express = require('express')
const routes = express.Router()

const home = require('./home')
const chefs = require('./chefs')
const recipes = require('./recipes')
const users = require('./users')

//HOME
routes.use('/home', home)

// CHEFS
routes.use('/chefs', chefs)

// RECIPES
routes.use('/recipes', recipes)

// USERS
routes.use('/users', users)


module.exports = routes
