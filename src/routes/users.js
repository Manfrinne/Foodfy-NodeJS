const express = require('express')
const routes = express.Router()

const UserController = require('../app/controllers/UserController')
const SessionController = require('../app/controllers/SessionController')

const UserValidator = require('../app/validators/userValidator.js')
const SessionValidator = require('../app/validators/sessionValidator')

// USER CREATE - ADMIN
routes.get('/create', UserController.create) // Mostrar o formulário de criação de um usuário
routes.post('/create', UserValidator.post, UserController.post) // Cadastrar um usuário
routes.get('/usersList', UserController.list) // Mostrar a lista de usuários cadastrados


// USER EDIT - ADMIN
routes.get('/:id/edit', UserController.edit) // Mostrar o formulário de edição de um usuário
routes.put('/', UserController.update) // Editar um usuário


// LOGIN/LOGOUT
routes.get('/login', SessionController.loginForm)
routes.post('/logout', SessionController.logout)
routes.post('/login',  SessionValidator.login, SessionController.login)


// RESET PASSWORD/FORGOT
routes.get('/forgot-password', SessionController.forgotForm)
routes.get('/password-reset', SessionController.resetForm)


// Rotas de perfil de um usuário logado
routes.get('/', UserValidator.show, UserController.show) // Mostrar o formulário com dados do usuário logado



module.exports = routes
