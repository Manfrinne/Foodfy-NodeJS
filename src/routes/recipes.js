const express = require('express')
const routes = express.Router()

const multer = require("../app/middlewares/multer")

const RecipeController = require('../app/controllers/RecipeController')

const { userRecipesVerification } = require('../app/middlewares/session')


// RECIPES/
routes.get('/', RecipeController.index)

routes.get('/create', RecipeController.create)

routes.post('/', multer.array("photos", 5), RecipeController.post)

routes.get('/:id', RecipeController.show)

routes.get('/:id/edit', userRecipesVerification, RecipeController.edit)

routes.put('/', multer.array("photos", 5), RecipeController.put)

routes.delete('/', RecipeController.delete)


module.exports = routes
