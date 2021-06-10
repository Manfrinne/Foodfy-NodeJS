const crypto = require('crypto')
const User = require('../models/User')
const mailer = require('../../lib/mailer')

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

  async forgot(req, res) {
    const user = req.user

    try {

      // criar um token para o usuário
      const token = crypto.randomBytes(20).toString("hex")

      // criar uma expiração - tempo que o token vai valer
      let now = new Date()
      now = now.setHours(now.getHours() + 1)

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now
      })

      // enviar um email com um link de recuperação de senha
      await mailer.sendMail({
        to: user.email,
        from: 'no-reply@foodFyadmin.com.br',
        subject: 'Recuperação de Senha',
        html: `<h2>RECUPERAR SENHA FOODFY</h2>
          <p>Clique no link abaixo para recuperar sua senha:</p>
          <p>
            <a href="http://localhost:3000/admin/users/password-reset?token=${token}" target="_blank">
              RECUPERAR SENHA!
            </a>
          </p>
        `
      })

      // avisar o usuário que o enviamos o email
      return res.render("admin/session/forgot-password", {
        success: "Verifique seu email para resetar a senha!"
      })

    } catch(err) {

      console.error(err)
      return res.render("admin/session/forgot-password", {
        error: "Algo deu errado, tente novamente!"
      })
    }
  },

  resetForm(req, res) {

    return res.render('admin/session/password-reset')

  }
}
