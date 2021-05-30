
module.exports = {

  create(req, res) {

    return res.render('admin/users/create')

  },

  async post(req, res) {

    return res.redirect('/admin/users/usersList')

  },

  list(req, res) {

    return res.render('admin/users/usersList')

  }
}
