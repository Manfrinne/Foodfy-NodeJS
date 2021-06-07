const User = require('../models/User')

module.exports = {

  create(req, res) {

    return res.render('admin/users/create')

  },

  async post(req, res) {

    //Storage user data in the database
    const userId = await User.create(req.body)

    req.session.userId = userId

    return res.redirect('/admin/users/usersList')

  },

  list(req, res) {

    return res.render('admin/users/usersList')

  },

  edit(req, res) {

    return res.render('admin/users/edit')

  }
}
