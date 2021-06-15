
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

      return res.render('public/home/findRecipe', {recipes, filter, files})

    } else {

      results = await Recipe.all()
      const totalRecipes = results.rows

      const recipes = totalRecipes.filter((totalRecipes, index) => index > 5 ? false : true)

      return res.render('public/home/index', { recipes, files })

    }
  },

  about(req, res) {
    return res.render('public/home/about')
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

      return res.render('public/home/findRecipe', {recipes, filter, files})

    } else {

      results = await Recipe.all()
      const recipes = results.rows

      return res.render('public/home/recipes', { recipes, files })

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

    return res.render("public/home/recipe", { recipe, files })

  },

  async listChefs(req, res) {

    let results = await Chef.chefhomeList()
    const chefs = results.rows

    results = await Chef.fileAvatar()
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))

    return res.render('public/home/chefs', { chefs, files })

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

    return res.render('public/home/findRecipe', {recipes, filter, files})

  }
}
