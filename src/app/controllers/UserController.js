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

  async list(req, res) {

    const results = await User.all()
    const users = results.rows

    return res.render('admin/users/usersList', { users })

  },

  edit(req, res) {

    return res.render('admin/users/edit')

  },

  async show(req, res) {

    return res.render('admin/users/show')

  }
}
