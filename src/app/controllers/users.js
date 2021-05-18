
const Recipe = require('../models/recipe')
const Chef = require('../models/chef')

module.exports = {
  async index(req, res) {

    let results = await Recipe.allFiles()
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))

    let {filter} = req.query

    if (filter) {

      results = await Recipe.findBy(filter)
      const recipes = results.rows

      return res.render('users/findRecipe', {recipes, filter, files})

    } else {

      results = await Recipe.all()
      const totalRecipes = results.rows

      let recipes = []
      // Para apresentar apanas 6 receitas na home page
      for (i = 0; i < 6; i++) {
        recipes.push(totalRecipes[i])
      }

      if (!recipes[0]) recipes = []

      return res.render('users/index', { recipes, files })

    }
  },

  about(req, res) {
    return res.render('users/about')
  },

  async listRecipes(req, res) {

    let results = await Recipe.allFiles()
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))

    let {filter} = req.query

    if (filter) {

      results = await Recipe.findBy(filter)
      filter = results.rows

      return res.render('users/findRecipe', {recipes, filter, files})

    } else {

      results = await Recipe.all()
      const recipes = results.rows

      return res.render('users/recipes', { recipes, files })

    }
  },

  async showRecipe(req, res) {

    const result = await Recipe.find(req.params.id)
    const recipe = result.rows[0]

    if(!recipe) return res.send("Recipee NOT found!")

    results = await Recipe.files(req.params.id)
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))

    return res.render("users/recipe", { recipe, files })

  },

  async listChefs(req, res) {

    let results = await Chef.chefUsersList()
    const chefs = results.rows

    results = await Chef.fileAvatar()
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))

    return res.render('users/chefs', { chefs, files })

  },

  async findRecipe(req, res) {

    let results = await Recipe.allFiles()
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))

    let {filter} = req.query

    results = await Recipe.findBy(filter)
    const recipes = results.rows

    return res.render('users/findRecipe', {recipes, filter, files})

  }
}
