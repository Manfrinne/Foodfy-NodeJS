const User = require('../models/User')

function checkAllFields(body) {
  const keys = Object.keys(body)
  for (key of keys) {
    if (body[key] == "") {
      return res.send('FILL ALL FIELDS!')
    }
  }
}

async function post(req, res, next) {

  //Check if has all fields
  const fillAllFields = checkAllFields(req.body)
  if (fillAllFields) {
    return fillAllFields
  }

  //Check if user exists [email]
  let {email} = req.body

  const user = await User.findOne({
    where: {email}
  })

  if (user) return res.send('USUÁRIO JÁ CADASTRADO!')

  //Send password email to user


  //if Validation OK
  next()
}

module.exports = {
  post
}
