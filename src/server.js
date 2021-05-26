
const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const server = express()
const methodOverride = require('method-override')

server.use(express.urlencoded({extended:true}))
server.use(methodOverride('_method'))
server.use(express.static('public'))
server.use(routes)

server.set('view engine', 'njk')
nunjucks.configure('src/app/views', {
  express: server,
  autoescape: false,
  noCache: true
})

routes.use(function (req, res) {
  return res.status(404).render("global/not-found")
})

server.listen(8800, function() {
  console.log("Server run!")
})
