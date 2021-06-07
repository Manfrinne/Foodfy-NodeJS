const User = require('../models/User')

async function post(req, res, next) {

  //Check if has all fields
  const keys = Object.keys(req.body)
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send('PREENCHER TODOS OS CAMPOS!')
    }
  }

  //Check if user exists [email]
  let {email} = req.body

  const user = await User.findOne({
    where: {email}
  })

  if (user) return res.send('USUÁRIO JÁ CADASTRADO!')


  //if Validation OK
  next()
}

module.exports = {
  post
}
