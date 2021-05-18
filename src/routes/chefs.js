const express = require('express')
const routes = express.Router()

const multer = require("../app/middlewares/multer")

const chefs = require('../app/controllers/chefs')

// ADMIN CHEFS
routes.get('/', chefs.index)
routes.get('/create', chefs.create)
routes.post('/', multer.single("photos"), chefs.post)
routes.get('/:id', chefs.show)
routes.get('/:id/edit', chefs.edit)
routes.put('/', multer.single("photos"), chefs.put)
routes.delete('/chefs', chefs.delete)


module.exports = routes
