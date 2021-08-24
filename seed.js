const faker = require("faker");
const { hash } = require("bcryptjs");

const User = require("./src/app/models/User");

let usersIds = [];
let totalUsers = 5;

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

createUsers();
