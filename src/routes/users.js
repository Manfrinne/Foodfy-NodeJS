const express = require('express')
const routes = express.Router()

const UserController = require('../app/controllers/UserController')
const SessionController = require('../app/controllers/SessionController')

const UserValidator = require('../app/validators/userValidator.js')

// USER CREATE
routes.get('/create', UserController.create) // Mostrar o formulário de criação de um usuário
routes.post('/', UserValidator.post, UserController.post) // Cadastrar um usuário
routes.get('/usersList', UserController.list) // Mostrar a lista de usuários cadastrados

// LOGIN/LOGOUT
routes.get('/login', SessionController.loginForm)

// RESET PASSWORD/FORGOT
routes.get('/forgot-password', SessionController.forgotForm)


module.exports = routes
