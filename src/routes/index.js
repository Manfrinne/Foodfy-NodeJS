const express = require('express')
const routes = express.Router()

const home = require('./home')
const chefs = require('./chefs')
const recipes = require('./recipes')
const users = require('./users')

//HOME
routes.use('/public', home)

// CHEFS
routes.use('/admin/chefs', chefs)

// RECIPES
routes.use('/admin/recipes', recipes)

// USERS
routes.use('/admin/users', users)

// ALIAS
routes.get('/', function(req, res) {
  return res.redirect('/public')
})

routes.get('/accounts', function(req, res) {
  return res.redirect('/admin/users/login')
})


module.exports = routes
