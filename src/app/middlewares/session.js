
const User = require('../models/User')
<<<<<<< HEAD
const Recipe = require('../models/recipe')
=======
>>>>>>> bc4df659152e04cf933da177bff196946650bf31

function onlyUsers(req, res, next) {

  if (!req.session.userId) return res.redirect('/admin')

  next()
}

<<<<<<< HEAD
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
=======
function ifLoggedRedirectToUsersProfile(req, res, next) {

  if (req.session.userId) return res.redirect('/admin/profile/show')
>>>>>>> bc4df659152e04cf933da177bff196946650bf31

  next()
}

async function adminVerification(req, res, next) {

  if (req.session.userId) {

    const id = req.session.userId

    const user = await User.findOne({ where: {id} })

<<<<<<< HEAD
    if (!user.is_admin) {

      return res.render('admin/users/show', {
        user,
        error: 'Somente administradores do sistema podem acessar essa rota!'
      })

    }
=======
    if (!user.is_admin) return res.send('SOMENTE ADMIN!')
>>>>>>> bc4df659152e04cf933da177bff196946650bf31

  } else {

    return res.redirect('/admin')

  }

  next()
}

async function userRecipesVerification(req, res, next) {

  const id = req.session.userId

  //Verificar se a receita foi criada pelo usuário
<<<<<<< HEAD
  results = await User.userRecipes(id)
=======
  let results = await User.userRecipes(id)
>>>>>>> bc4df659152e04cf933da177bff196946650bf31
  const userRecipes = results.rows
  const allRecipesPromise = userRecipes.map(recipe => recipe.id)

  function forNext(allRecipesId, currentRecipe) {
    for (recipe of allRecipesId) {
      if (recipe == currentRecipe) return recipe
    }
  }

  //Verificar se o usuário é um administrador
  const user = await User.findOne({ where: {id} })

<<<<<<< HEAD
  if (!forNext(allRecipesPromise, req.params.id) && !user.is_admin) return res.send('Você não pode modificar essa receita!')
=======
  if (!forNext(allRecipesPromise, req.params.id) && !user.is_admin) return res.send('VOCÊ NÃO TEM PERMISSÃO PARA MODIFICAR ESSA RECEITA!')
>>>>>>> bc4df659152e04cf933da177bff196946650bf31

  next()

}


module.exports = {
  onlyUsers,
  ifLoggedRedirectToUsersProfile,
  adminVerification,
  userRecipesVerification
}
