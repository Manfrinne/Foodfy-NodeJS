const User = require('../models/User')

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

module.exports = {
  post
}
