
module.exports = {

  logout(req, res) {

    req.session.destroy()
    return res.redirect('/')

  },

  login(req, res) {

    req.session.userId = req.user.id

    return res.redirect('/profile')

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
