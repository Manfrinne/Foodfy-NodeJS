const db = require('../../config/db')
const fs = require("fs")

module.exports = {
  all() {

    return db.query(`
    SELECT * FROM chefs
    ORDER BY updated_at DESC`)

  },

  fileAvatar() {
    return db.query(`
      SELECT files.*
      FROM chefs
      LEFT JOIN files ON (files.id = chefs.file_id)
      ORDER BY chefs.id`)
  },

  create(data, file_id) {
    const query = `
      INSERT INTO Chefs (
        name,
        file_id
      ) VALUES ($1, $2)
      RETURNING id
    `

    const values = [
      data.name,
      file_id
    ]

    return db.query(query, values)
  },

  find(id) {

    return db.query(`
    SELECT chefs.* , count(recipes) as total_recipes, files.path
    FROM chefs
    LEFT JOIN recipes on (recipes.chef_id = chefs.id)
    LEFT JOIN files on (chefs.file_id = files.id)
    WHERE chefs.id = $1
    GROUP BY chefs.id, files.id`, [id])

  },

  chefUsersList() {

    return db.query(`
    SELECT chefs.*, count(recipes) AS total_recipes
    FROM chefs
    LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
    GROUP BY chefs.id
    ORDER BY updated_at DESC`)

  },

  findRecipes(id) {

    return db.query(`
    SELECT recipes.*, files.path
    FROM chefs
    LEFT JOIN files ON (files.id = chefs.file_id)
    LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
    WHERE recipes.chef_id = $1
    GROUP BY recipes.id, files.path
    ORDER BY updated_at DESC`, [id])

  },

  recipesFiles() {

    return db.query(`
    SELECT DISTINCT ON (recipe_files.recipe_id) files.*, recipe_files.recipe_id as recipe_id
    FROM files
    LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
    ORDER BY recipe_id`)

  },

  update(data, file_id) {
    const query = `
    UPDATE chefs SET
      name=($1),
      file_id=($2)
    WHERE id = $3
    `

    const values = [
      data.name,
      file_id,
      data.id
    ]

    return db.query(query, values)
  },

  async deleteLocalFile(id) {

    try {

      let  result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
      const file = result.rows[0]

      fs.unlinkSync(file.path)

    } catch (err) {

      console.error(err)

    }

  },

  deleteDatabaseFile(id) {

    return db.query(`DELETE FROM files WHERE id = $1`, [id])

  },

  delete(id) {

    return db.query(`DELETE FROM chefs WHERE id = $1`, [id])

  }
}
