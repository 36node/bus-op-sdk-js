const faker = require("faker");

module.exports = [
  {
    count: faker.random.number({ min: 1, max: 1000 }),
    times: faker.random.number({ min: 1, max: 1000 }),
  },
];
