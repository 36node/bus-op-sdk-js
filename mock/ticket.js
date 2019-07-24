const _ = require("lodash");
const faker = require("faker");

const cookStages = () => [
  { id: faker.random.uuid(), name: "处理中" },
  { id: faker.random.uuid(), name: "维修中" },
  { id: faker.random.uuid(), name: "已关闭" },
];

const cookTickets = ({ users, alerts = [], vehicles = [], stages }) => {
  const closedAlerts = alerts.filter(a => a.state === "CLOSED");

  return closedAlerts
    .map(alert => {
      const isIgnore = faker.random.boolean();
      const createdBy = faker.random.arrayElement(users.map(i => i.id));
      const createdAt = faker.date.recent().toISOString();

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

        // const vehicle = faker.random.arrayElement(vehicles);

        return {
          id,
          createdAt,
          createdBy,
          updatedAt: faker.date.recent().toISOString(),
          alerts: [alert.id],
          reference: "xxxxx",
          stage: faker.random.arrayElement(stages.map(s => s.id)),
          vehicle: alert.vehicle,
          vehicleNo: alert.vehicleNo,
          state: "OPEN",
          ns: alert.ns,
          events: [
            {
              id: faker.random.uuid(),
              name: "CREATE",
              createdBy,
              createdAt,
              alerts: [alert.id],
            },
          ],
        };
      }
    })
    .filter(t => t);
};

module.exports = { cookStages, cookTickets };
