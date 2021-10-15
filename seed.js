const faker = require("faker");

const User = require("./src/app/models/User");

let totalUsers = 5;
let totalChefs = 5;

async function createUsers() {
  const users = [];

  while (users.length < totalUsers) {
    users.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      is_admin: Math.round(Math.random()),
    });
  }

  const usersPromises = users.map((user) => User.create(user));

  usersIds = await Promise.all(usersPromises);
}

async function createChefs() {
  const chefs = [];

  while (chefs.length < totalChefs) {
    chefs.push({
      name: faker.name.firstName(),
      email: faker.image.image(),
    });
  }

  const chefsPromises = chefs.map((user) => Chefs.create(chefs));

  chefsIds = await Promise.all(chefsPromises);
}

// ALTER SEQUENCE users_id_seq RESTART WITH 1; === Para iniciar do zero

createUsers();
