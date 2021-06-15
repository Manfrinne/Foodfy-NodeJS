const express = require('express')
const routes = express.Router()

const multer = require("../app/middlewares/multer")

const ChefController = require('../app/controllers/ChefController')

const { adminVerification } = require('../app/middlewares/session')

// ADMIN CHEFS
routes.get('/', ChefController.index)

routes.get('/create', adminVerification, ChefController.create)

routes.post('/', adminVerification, multer.single("photos"), ChefController.post)

routes.get('/:id', ChefController.show)

routes.get('/:id/edit', adminVerification, ChefController.edit)

routes.put('/', adminVerification, multer.single("photos"), ChefController.put)

routes.delete('/', adminVerification, ChefController.delete)


module.exports = routes
