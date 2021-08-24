
const User = require('../models/User')

function onlyUsers(req, res, next) {

  if (!req.session.userId) return res.redirect('/admin')

  next()
}

async function ifLoggedRedirectToUsersProfile(req, res, next) {

  if (req.session.userId) {

    const id = req.session.userId

    const user = await User.findOne({ where: {id} })

    if (user.is_admin) {

      return res.redirect(`/admin/users/${user.id}/edit`)

    } else {

      return res.redirect('/admin/profile/show')

    }
  }

  next()
}

async function adminVerification(req, res, next) {

  if (req.session.userId) {

    const id = req.session.userId

    const user = await User.findOne({ where: {id} })

    if (!user.is_admin) {

      return res.render('admin/users/show', {
        user,
        error: 'Somente administradores do sistema podem acessar essa rota!'
      })

    }

  } else {

    return res.redirect('/admin')

  }

  next()
}

async function userRecipesVerification(req, res, next) {

  const id = req.session.userId

  //Verificar se a receita foi criada pelo usuário
  results = await User.userRecipes(id)
  const userRecipes = results.rows
  const allRecipesPromise = userRecipes.map(recipe => recipe.id)

  function forNext(allRecipesId, currentRecipe) {
    for (recipe of allRecipesId) {
      if (recipe == currentRecipe) return recipe
    }
  }

  //Verificar se o usuário é um administrador
  const user = await User.findOne({ where: {id} })

  if (!forNext(allRecipesPromise, req.params.id) && !user.is_admin) return res.send('Você não pode modificar essa receita!')

  next()

}


module.exports = {
  onlyUsers,
  ifLoggedRedirectToUsersProfile,
  adminVerification,
  userRecipesVerification
}
