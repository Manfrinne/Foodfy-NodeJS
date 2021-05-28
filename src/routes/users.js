const express = require('express')
const routes = express.Router()

const UserController = require('../app/controllers/UserController')

const UserValidator = require('../app/validators/userValidator.js')

// USER CREATE
routes.get('/create', UserController.create) // Mostrar o formulário de criação de um usuário
routes.post('/', UserValidator.post, UserController.post) // Cadastrar um usuário

module.exports = routes
