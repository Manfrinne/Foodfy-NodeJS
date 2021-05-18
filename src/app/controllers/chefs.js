
const Chef = require('../models/chef')
const File = require('../models/file')

module.exports = {
  async index(req, res) {

    let results = await Chef.all()
    const  chefs = results.rows

    results = await Chef.fileAvatar()
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))

    return res.render('chefs/index', {chefs, files})
  },

  create(req, res) {
    return res.render('chefs/create')
  },

  async post(req, res) {

    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == "" && key != "removeAtavarfile") {
        return res.send('Please, fill in all fields.')
      }
    }

    let results = await File.createCheFile({
      name: req.file.filename,
      path: req.file.path
    })
    const fileId = results.rows[0].id
    await Chef.create(req.body, fileId)

    return res.redirect(`chefs`)
  },

  async show(req, res) {

    let results = await Chef.find(req.params.id)
    const chef = results.rows[0]
    const photoAvatar = {
      src: `${req.protocol}://${req.headers.host}${results.rows[0].path.replace("public", "")}`
    }

    if(!chef) return res.send("Chefe NOT found!")

    results = await Chef.findRecipes(req.params.id)
    const recipes = results.rows

    results = await Chef.recipesFiles()
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))

    return res.render("chefs/show", { chef, recipes, photoAvatar, files })

  },

  async edit(req, res) {

    let results = await Chef.find(req.params.id)
    const chef = results.rows[0]

    return res.render("chefs/edit", { chef })
  },

  async put(req, res) {

    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "" && key != "removeAtavarfile") {
            return res.send('Please, fill in all fields.')
        }
    }

    if (req.file) {

      // if change avatar
      await Chef.deleteLocalFile(req.body.removeAtavarfile)
      results = await File.createCheFile({
        name: req.file.filename,
        path: req.file.path
      })
      const fileId = results.rows[0].id
      await Chef.update(req.body, fileId)
      await Chef.deleteDatabaseFile(req.body.removeAtavarfile)

    } else {

      // if not change avatar
      const avatarId = req.body.removeAtavarfile
      await Chef.update(req.body, avatarId)

    }

    return res.redirect(`chefs/${req.body.id}`)
  },

  async delete(req, res) {

    try {
      const fileId = req.body.removeAtavarfile
      await Chef.delete(req.body.id)
      await Chef.deleteLocalFile(fileId)
      await Chef.deleteDatabaseFile(fileId)
    } catch(err) {
      console.log(err)
    }
    return res.redirect('chefs')
  }
}
