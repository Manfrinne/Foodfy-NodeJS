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

  async edit(req, res) {

    const {id} = req.params

    const user = await User.findOne({ where: {id} })

    return res.render('admin/users/edit', { user })

  },

  async update(req, res) {

    try {

      const { user } = req

      let {name, email} = req.body

      await User.update(user.id, { name, email })

      return res.render('admin/users/show', {
        user: req.body,
        success: 'Usuário modificado com sucesso!'
      })

    } catch(err) {

      console.error(err)

      return res.render('admin/users/show', {
        user: req.body,
        error: 'Sorry! Algo deu errado...!'
      })

    }

  },

  async updateAdmin(req, res) {

    try {

      const { user } = req

      let {name, email} = req.body

      await User.update(user.id, { name, email })

      return res.render('admin/users/edit', {
        user: req.body,
        success: 'Usuário modificado com sucesso!'
      })

    } catch(err) {

      console.error(err)

      return res.render('admin/users/show', {
        user: req.body,
        error: 'Sorry! Algo deu errado...!'
      })

    }

  },

  async show(req, res) {

    const { user } = req

    return res.render('admin/users/show', { user })

  }
}
