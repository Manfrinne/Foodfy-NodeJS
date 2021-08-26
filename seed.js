const faker = require("faker");
const { hash } = require("bcryptjs");

const User = require("./src/app/models/User");
const Recipe = require("./src/app/models/recipe");

let usersIds = [];
let recipesIds = [];
let totalUsers = 5;
let totalChefs = 8;
let totalRecipes = 40;

async function createUsers() {
  const users = [];

  const password = await hash("1234", 8);

  while (users.length < totalUsers) {
    users.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password,
      is_admin: Math.round(Math.random()),
    });
  }

  const usersPromises = users.map((user) => User.create(user));

  usersIds = await Promise.all(usersPromises);
}

// Preciso corrigir erros na criação das Recipes
async function createRecipes() {
  const recipes = [];

  while (recipes.length < totalRecipes) {
    recipes.push({
      title: faker.name.title(),
      ingredients: [faker.lorem.sentence(Math.ceil(Math.random() * 3))],
      preparation: [faker.lorem.sentence(Math.ceil(Math.random() * 3))],
      information: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
      chef_id: usersIds[Math.floor((Math.random() * totalChefs))],
      user_id: usersIds[Math.floor((Math.random() * totalUsers))],
    })
  }

  const recipesPromises = recipes.map((recipe) => Recipe.create(recipe))

  recipesIds = await Promise.all(recipesPromises)
}
