const faker = require("faker");

const User = require("./src/app/models/User");

let totalUsers = 5;

async function createUsers() {
  const users = [];

  while (users.length < totalUsers) {
    users.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      is_admin: false,
    });
  }

  users.push({
    name: "admin",
    email: "admin@foodfy.com",
    is_admin: true,
  });

  const usersPromises = users.map((user) => User.create(user));

  usersIds = await Promise.all(usersPromises);
}

// ALTER SEQUENCE users_id_seq RESTART WITH 1;
createUsers();
