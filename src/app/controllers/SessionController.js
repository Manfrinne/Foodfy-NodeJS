
const User = require('../models/User')

module.exports = {

  logout(req, res) {

    req.session.destroy()
    return res.redirect('/')

  },

  async login(req, res) {

    req.session.userId = req.user.id

    const { userId: id } = req.session

    const user = await User.findOne({ where: {id} })

    if (user.is_admin) {

      return res.redirect('/admin/users/usersList')

    }

    return res.redirect('/admin/profile/show')

  },

  loginForm(req, res) {

    return res.render('admin/session/login')

  },

  forgotForm(req, res) {

    return res.render('admin/session/forgot-password')

  },

  resetForm(req, res) {

    return res.render('admin/session/password-reset')

  }
}
