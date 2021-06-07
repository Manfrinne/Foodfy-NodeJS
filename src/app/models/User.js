const crypto = require('crypto')
const db = require('../../config/db')
const mailer = require('../../lib/mailer')

module.exports = {
  async findOne(filters) {
    let query = "SELECT * FROM users"

    Object.keys(filters).map(key => {

      query = `${query}
      ${key}
      `
      Object.keys(filters[key]).map(field => {
        query = `${query} ${field} = '${filters[key][field]}'`
      })

      // SELECT * FROM users
      // where email = usersemaildoreqbody
    })

    const results = await db.query(query)
    return results.rows[0]
  },

  async create(data) {
    try {
      const query = `
      INSERT INTO users (
        name,
        email,
        password,
        is_admin
      ) VALUES ($1, $2, $3, $4)
      RETURNING id
      `
      //Generate aleatore password
      const password = crypto.randomBytes(8).toString("hex")

      const values = [
        data.name,
        data.email,
        password,
        data.is_admin
      ]

      //Send password email to user
      await mailer.sendMail({
        to: data.email,
        from: 'no-reply@foodFyadmin.com.br',
        subject: 'Senha para primeiro acesso',
        html: `<h2>SENHA PARA PRIMEIRO ACESSO NO FOODFY</h2>
          <p>${data.name}, assim que fizer seu primeiro login, favor trocar sua <strong> SENHA ATUAL que foi gerada automaticamente </strong> pelo sistema!</p>
          <p>
            Sua <strong>SENHA ATUAL</strong> é: ${password}
          </p>
        `
      })

      return db.query(query, values)

    } catch(err) {
      console.error(err)
    }
  }
}
