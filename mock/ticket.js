const _ = require("lodash");
const faker = require("faker");

const cookStages = () => [{ id: 1, name: "处理中" }, { id: 2, name: "维修中" }];

const cookTickets = ({ users, alerts = [], vehicles = [], stages }) => {
  const closedAlerts = alerts.filter(a => a.state === "CLOSED");

  return closedAlerts
    .map(alert => {
      const isIgnore = faker.random.boolean();
      const createdBy = faker.random.arrayElement(users.map(i => i.id));
      const createdAt = faker.date.recent();

      if (isIgnore) {
        alert.handleWay = "忽略报警";
        alert.handler = createdBy;
        alert.handleAt = createdAt;
      } else {
        const id = faker.random.uuid();
        alert.handleWay = "工单";
        alert.handler = createdBy;
        alert.handleAt = createdAt;
        alert.ticket = id;

        return {
          id,
          createdAt,
          createdBy,
          updatedAt: faker.date.recent(),
          alerts: [alert.id],
          reference: "xxxxx",
          stage: faker.random.arrayElement(stages.map(s => s.id)),
          vehicle: faker.random.arrayElement(vehicles.map(v => v.id)),
          state: faker.random.arrayElement(["OPEN", "CLOSED"]),
        };
      }
    })
    .filter(t => t);
};

module.exports = { cookStages, cookTickets };
