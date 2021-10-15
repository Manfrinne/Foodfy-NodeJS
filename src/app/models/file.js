const db = require("../../config/db");
const fs = require("fs");

module.exports = {
  async create({ filename, path, recipe_id }) {
    let query = `
      INSERT INTO files (
        name,
        path
      ) VALUES ($1, $2)
      RETURNING id
    `;

    let values = [filename, path];

    let results = await db.query(query, values);
    const fileId = results.rows[0].id;

    query = `
      INSERT INTO recipe_files (
        recipe_id,
        file_id
      ) VALUES ($1, $2)
      RETURNING id
    `;

    values = [recipe_id, fileId];

    // results = await db.query(query, values)

    return db.query(query, values);
  },

  async createCheFile({ name, path }) {
    const query = `
      INSERT INTO files (
        name,
        path
      ) VALUES ($1, $2)
      RETURNING id
    `;

    const values = [name, path];

    return db.query(query, values);
  },

  async delete(id) {
    try {
      let result = await db.query(`SELECT * FROM files WHERE id = $1`, [id]);
      const file = result.rows[0];

      fs.unlinkSync(file.path);

      await db.query(`DELETE FROM recipe_files WHERE file_id = $1`, [id]);

      await db.query(`DELETE FROM files WHERE id = $1`, [id]);
    } catch (err) {
      console.error(err);
    }
  },
};
