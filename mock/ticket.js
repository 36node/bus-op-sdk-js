const _ = require("lodash");
const faker = require("faker");

const cookStages = () => [{ id: 1, name: "处理中" }, { id: 2, name: "维修中" }];

const cookTickets = ({ users, alerts, vehicles, stages, count = 10 }) =>
  _.range(count).map(val => {
    return {
      id: faker.random.uuid(),
      createdAt: faker.date.recent(),
      createdBy: faker.random.arrayElement(users.map(i => i.id)),
      updatedAt: faker.date.recent(),
      updatedBy: faker.random.arrayElement(users.map(i => i.id)),
      alerts: [faker.random.arrayElement(alerts.map(i => i.id))],
      reference: "xxxxx",
      stage: faker.random.arrayElement(stages),
      vehicle: faker.random.arrayElement(vehicles),
      state: faker.random.arrayElement(["OPEN", "CLOSED"]),
    };
  });

const cookComments = ({ users, tickets, count = 30 }) =>
  _.range(count).map(val => {
    return {
      id: faker.random.uuid(),
      ticketId: faker.random.arrayElement(tickets.map(i => i.id)),
      createdAt: faker.date.recent(),
      createdBy: faker.random.arrayElement(users.map(i => i.id)),
      content: "此处填写意见",
    };
  });

module.exports = { cookStages, cookTickets, cookComments };
