const db = require("../../config/db");

module.exports = {
  all() {
    return db.query(`
    SELECT recipes.*, chefs.name AS chef_name
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    ORDER BY updated_at DESC`);
  },

  allFiles() {
    return db.query(`
    SELECT DISTINCT ON (recipe_files.recipe_id) files.*, recipe_files.recipe_id as recipe_id
    FROM files
    LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
    ORDER BY recipe_id, id`);
  },

  create(data) {
    const query = `
      INSERT INTO recipes (
        title,
        ingredients,
        preparation,
        information,
        chef_id,
        user_id
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const values = [
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.chef_id,
      data.user_id,
    ];

    return db.query(query, values);
  },

  find(id) {
    return db.query(
      `SELECT recipes.*, chefs.name AS chef_name
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.id = $1`,
      [id]
    );
  },

  findBy(filter) {
    return db.query(`
    SELECT recipes.*, chefs.name AS chef_name
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.title ILIKE '%${filter}%'
    ORDER BY updated_at DESC`);
  },

  chefSelectOption() {
    return db.query(`SELECT name, id FROM chefs`);
  },

  update(data) {
    const query = `
    UPDATE recipes SET
      title=($1),
      ingredients=($2),
      preparation=($3),
      information=($4),
      chef_id=($5)
    WHERE id = $6
    `;

    const values = [
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.chef_id,
      data.id,
    ];

    return db.query(query, values);
  },

  delete(id) {
    return db.query(`DELETE FROM recipes WHERE id = $1`, [id]);
  },

  files(id) {
    return db.query(
      `
    SELECT files.*
    FROM files
    LEFT JOIN recipe_files ON ( files.id = recipe_files.file_id)
    WHERE recipe_files.recipe_id = $1`,
      [id]
    );
  },
};
