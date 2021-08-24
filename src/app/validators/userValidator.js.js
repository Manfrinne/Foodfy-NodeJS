const User = require('../models/User')
const { compare } = require('bcryptjs')

function checkAllFields(body) {
  const keys = Object.keys(body)
  for (key of keys) {
    if (body[key] == "") {
      return {
        user: body,
        error: 'Favor preencher todos os campos!'
      }
    }
  }
}

async function post(req, res, next) {

  //Check if has all fields
  const fillAllFields = checkAllFields(req.body)
  if (fillAllFields) {
    return res.render('admin/users/create', fillAllFields)
  }


  //Check if user exists [email]
  let {email} = req.body

  const user = await User.findOne({
    where: {email}
  })

  if (user) return res.render('admin/users/create', {
    user: req.body,
    error: 'Usuário já cadastrado!'
  })

  //if Validation OK
  next()
}

async function show(req, res, next) {

  const { userId: id } = req.session

  const user = await User.findOne({ where: {id} })

  if (!user) return res.render('admin/users/show', {
    error: "Usuário não encontrado!"
  })

  req.user = user

  next()
}

async function update(req, res, next) {

  const { id, password } = req.body
  const user = await User.findOne({ where: {id} })

  //Check if has all fields
  const fillAllFields = checkAllFields(req.body)
  if (fillAllFields) {
    return res.render('admin/users/show', fillAllFields)
  }

  //Check if password match
  const passed = await compare(password, user.password)

  if (!passed) return res.render('admin/users/show', {
    user: req.body,
    error: 'Senha incorreta!'
  })

  req.user = user

  next()
}

async function updateAdmin(req, res, next) {

  const { id } = req.body
  const user = await User.findOne({ where: {id} })

  //Check if has all fields
  const fillAllFields = checkAllFields(req.body)
  if (fillAllFields) {
    return res.render('admin/users/show', fillAllFields)
  }

  req.user = user

  next()
}

async function deleteUsers(req, res, next) {
  //comparar o id da sessão com o id do req.body
  const { userId: id } = req.session
  const user = await User.findOne({ where: {id} })

  //Se for o mesmo, não permitir a exclusão do user
  if (user.id == req.body.id) {

    return res.render('admin/users/edit', {
      user,
      error: 'Você não pode deletar sua própria conta!'
    })

  }

  next()
}

module.exports = {
  post,
  show,
  update,
  updateAdmin,
  deleteUsers
}
