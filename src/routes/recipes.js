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

<<<<<<< HEAD
routes.put('/', multer.array("photos", 5), RecipeController.put)

routes.delete('/', RecipeController.delete)
=======
routes.put('/', userRecipesVerification, multer.array("photos", 5), RecipeController.put)

routes.delete('/', userRecipesVerification, RecipeController.delete)
>>>>>>> bc4df659152e04cf933da177bff196946650bf31


module.exports = routes
