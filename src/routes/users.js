const express = require('express')
const routes = express.Router()

const UserController = require('../app/controllers/UserController')

// USERS

routes.post('/', UserController.post) // Cadastrar um usuário
routes.get('/create', UserController.create) // Mostrar o formulário de criação de um usuário

module.exports = routes
