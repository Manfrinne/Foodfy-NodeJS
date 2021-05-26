const express = require('express')
const routes = express.Router()

const multer = require("../app/middlewares/multer")

const ChefController = require('../app/controllers/ChefController')

// ADMIN CHEFS
routes.get('/', ChefController.index)
routes.get('/create', ChefController.create)
routes.post('/', multer.single("photos"), ChefController.post)
routes.get('/:id', ChefController.show)
routes.get('/:id/edit', ChefController.edit)
routes.put('/', multer.single("photos"), ChefController.put)
routes.delete('/', ChefController.delete)


module.exports = routes
