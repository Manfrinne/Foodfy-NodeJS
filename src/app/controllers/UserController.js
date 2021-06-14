const User = require('../models/User')

module.exports = {

  create(req, res) {

    return res.render('admin/users/create')

  },

  async post(req, res) {

    //Storage user data in the database
    await User.create(req.body)

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

  },

  async delete(req, res) {

    try {

      console.log(req.body.id)

      const results = await User.all()
      const users = results.rows

      await User.delete(req.body.id)

      return res.render('admin/users/usersList', {
        users,
        success: 'Conta deletada com sucesso!'
      })

    } catch(err) {

      console.error(err)
      return res.render('admin/users/usersList', {
        user: req.body,
        error: 'Erro ao tentar deletar a conta! Tente novamente'
      })

    }
  }
}
