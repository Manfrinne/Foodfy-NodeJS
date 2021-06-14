const crypto = require('crypto')
const db = require('../../config/db')
const mailer = require('../../lib/mailer')
const { hash } = require('bcryptjs')
const Recipe = require('../models/Recipe')
const File = require('../models/file')

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

      //Hash of password
      const passwordHash = await hash(password, 8)


      const values = [
        data.name,
        data.email,
        passwordHash,
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
  },

  all() {
    return db.query(`
      SELECT * FROM users
      ORDER BY updated_at DESC
    `)
  },

  async update(id, fields) {
    let query = "UPDATE users SET"

    Object.keys(fields).map((key, index, array) => {
      if((index + 1) < array.length) {
        query = `${query}
          ${key} = '${fields[key]}',
        `
      } else {  // Last iteration (without ',')

        query = `${query}
          ${key} = '${fields[key]}'
          WHERE id = ${id}
        `
      }
    })

    await db.query(query)

    return
  },

  async delete(id) {

    //Segregar todos as receitas do usuária
    let results = await db.query(`SELECT * FROM recipes WHERE user_id = $1`, [id])
    const recipes = results.rows

    //Segregar todas imagens das receitas do usuário
    const allFilesPromiseDB = recipes.map(recipe => Recipe.files(recipe.id))
    let promiseResultsDB = await Promise.all(allFilesPromiseDB)

    promiseResultsDB.map(results => {
      results.rows.map(file => {
        try {
          File.delete(file.id)
        } catch(err) {
          console.error(err)
        }
      })
    })

    //Executar a remoção do usuário, produtos e imagens no db
    await db.query('DELETE FROM users WHERE id = $1', [id])
  },

  async userRecipes(userId) {

    //Segregar todos as receitas do usuária
    return await db.query(`SELECT * FROM recipes WHERE user_id = $1`, [userId])

  }
}
